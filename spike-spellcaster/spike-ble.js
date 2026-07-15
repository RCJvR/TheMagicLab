// ═══════════════════════════════════════════════════════════════════════════
// Spike Spellcaster — Web Bluetooth bridge for a real LEGO® SPIKE™ Prime hub
//
// Implements LEGO's official SPIKE Prime BLE protocol (firmware v3+):
//   docs: https://lego.github.io/spike-prime-docs
// Connect over Web Bluetooth, upload a Python program to a slot, run/stop it,
// and stream the hub's console output + live device (port) telemetry back.
//
// The protocol: messages are serialised, COBS-framed (LEGO variant), split into
// packets of the negotiated max size, and written (without response) to the RX
// characteristic. The hub replies via notifications on the TX characteristic.
//
// Public API (window.SpikeBLE):
//   isSupported() -> bool
//   connect({onConsole, onDevices, onStatus, onDisconnect}) -> InfoResponse
//   disconnect()
//   isConnected() -> bool
//   getInfo() -> InfoResponse | null
//   runProgram(pySource, {slot=0, filename='program.py', onProgress}) -> void
//   stopProgram({slot=0}) -> void
//   enableTelemetry(intervalMs) -> void
// ═══════════════════════════════════════════════════════════════════════════
(function (global) {
'use strict';

// ── BLE UUIDs (official) ──
const SERVICE_UUID = '0000fd02-0000-1000-8000-00805f9b34fb';
const RX_CHAR_UUID = '0000fd02-0001-1000-8000-00805f9b34fb'; // hub receives (we write)
const TX_CHAR_UUID = '0000fd02-0002-1000-8000-00805f9b34fb'; // hub transmits (notify)

// ── Message IDs ──
const ID = {
  InfoRequest: 0x00, InfoResponse: 0x01,
  StartFileUploadRequest: 0x0C, StartFileUploadResponse: 0x0D,
  TransferChunkRequest: 0x10, TransferChunkResponse: 0x11,
  ProgramFlowRequest: 0x1E, ProgramFlowResponse: 0x1F,
  ProgramFlowNotification: 0x20, ConsoleNotification: 0x21,
  DeviceNotificationRequest: 0x28, DeviceNotificationResponse: 0x29,
  DeviceNotification: 0x3C,
  ClearSlotRequest: 0x46, ClearSlotResponse: 0x47,
};

// ═══════════════════════════════════════════════════════════════════
// COBS  (LEGO SPIKE variant — block size 84, XOR 3, delimiter 0x02)
// Ported verbatim from the official reference (examples/python/cobs.py).
// ═══════════════════════════════════════════════════════════════════
const DELIMITER = 0x02;
const NO_DELIMITER = 0xFF;
const COBS_CODE_OFFSET = DELIMITER;
const MAX_BLOCK_SIZE = 84;
const XOR = 3;

function cobsEncode(data) {
  const buffer = [];
  let codeIndex = 0, block = 0;
  const begin = () => { codeIndex = buffer.length; buffer.push(NO_DELIMITER); block = 1; };
  begin();
  for (const byte of data) {
    if (byte > DELIMITER) { buffer.push(byte); block++; }
    if (byte <= DELIMITER || block > MAX_BLOCK_SIZE) {
      if (byte <= DELIMITER) {
        const delimiterBase = byte * MAX_BLOCK_SIZE;
        const blockOffset = block + COBS_CODE_OFFSET;
        buffer[codeIndex] = delimiterBase + blockOffset;
      }
      begin();
    }
  }
  buffer[codeIndex] = block + COBS_CODE_OFFSET;
  return Uint8Array.from(buffer);
}

function cobsDecode(data) {
  const buffer = [];
  const unescape = (code) => {
    if (code === 0xFF) return [null, MAX_BLOCK_SIZE + 1];
    let value = Math.floor((code - COBS_CODE_OFFSET) / MAX_BLOCK_SIZE);
    let block = (code - COBS_CODE_OFFSET) % MAX_BLOCK_SIZE;
    if (block === 0) { block = MAX_BLOCK_SIZE; value -= 1; }
    return [value, block];
  };
  let [value, block] = unescape(data[0]);
  for (let i = 1; i < data.length; i++) {
    const byte = data[i];
    block -= 1;
    if (block > 0) { buffer.push(byte); continue; }
    if (value !== null) buffer.push(value);
    [value, block] = unescape(byte);
  }
  return Uint8Array.from(buffer);
}

function cobsPack(data) {
  const buffer = cobsEncode(data);
  for (let i = 0; i < buffer.length; i++) buffer[i] ^= XOR;
  const out = new Uint8Array(buffer.length + 1);
  out.set(buffer); out[buffer.length] = DELIMITER;
  return out;
}

function cobsUnpack(frame) {
  let start = 0;
  if (frame[0] === 0x01) start += 1;               // unused priority byte
  const unframed = frame.slice(start, frame.length - 1).map((x) => x ^ XOR);
  return cobsDecode(unframed);
}

// ═══════════════════════════════════════════════════════════════════
// CRC-32  (zlib/binascii, with 4-byte null padding and running seed)
// ═══════════════════════════════════════════════════════════════════
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(bytes, seed) {
  let c = ((seed || 0) ^ 0xFFFFFFFF) >>> 0;
  for (let i = 0; i < bytes.length; i++) c = (CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8)) >>> 0;
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function crc(data, seed) {
  const rem = data.length % 4;
  let buf = data;
  if (rem) { buf = new Uint8Array(data.length + (4 - rem)); buf.set(data); }
  return crc32(buf, seed || 0);
}

// ═══════════════════════════════════════════════════════════════════
// Message (de)serialisation
// ═══════════════════════════════════════════════════════════════════
const utf8 = (s) => new TextEncoder().encode(s);
const fromUtf8 = (b) => new TextDecoder().decode(b);

const msg = {
  infoRequest: () => Uint8Array.of(ID.InfoRequest),
  clearSlot: (slot) => Uint8Array.of(ID.ClearSlotRequest, slot & 0xFF),
  programFlow: (stop, slot) => Uint8Array.of(ID.ProgramFlowRequest, stop ? 1 : 0, slot & 0xFF),
  deviceNotificationRequest: (intervalMs) => {
    const b = new Uint8Array(3); const dv = new DataView(b.buffer);
    b[0] = ID.DeviceNotificationRequest; dv.setUint16(1, intervalMs & 0xFFFF, true); return b;
  },
  startFileUpload: (name, slot, fileCrc) => {
    const nameBytes = utf8(name).slice(0, 31);
    const b = new Uint8Array(1 + nameBytes.length + 1 + 1 + 4);
    const dv = new DataView(b.buffer);
    let o = 0;
    b[o++] = ID.StartFileUploadRequest;
    b.set(nameBytes, o); o += nameBytes.length;
    b[o++] = 0x00;              // null terminator
    b[o++] = slot & 0xFF;
    dv.setUint32(o, fileCrc >>> 0, true);
    return b;
  },
  transferChunk: (runningCrc, chunk) => {
    const b = new Uint8Array(1 + 4 + 2 + chunk.length);
    const dv = new DataView(b.buffer);
    b[0] = ID.TransferChunkRequest;
    dv.setUint32(1, runningCrc >>> 0, true);
    dv.setUint16(5, chunk.length, true);
    b.set(chunk, 7);
    return b;
  },
};

function parseInfoResponse(d) {
  const dv = new DataView(d.buffer, d.byteOffset, d.byteLength);
  return {
    rpc: [d[1], d[2], dv.getUint16(3, true)],
    firmware: [d[5], d[6], dv.getUint16(7, true)],
    maxPacketSize: dv.getUint16(9, true),
    maxMessageSize: dv.getUint16(11, true),
    maxChunkSize: dv.getUint16(13, true),
    productGroupDevice: dv.getUint16(15, true),
  };
}

// Device telemetry (DeviceNotification 0x3C payload → list of devices)
const PORT_NAMES = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLOR_NAMES = { '-1': 'none', 0: 'black', 1: 'magenta', 2: 'purple', 3: 'blue',
  4: 'azure', 5: 'turquoise', 6: 'green', 7: 'yellow', 8: 'orange', 9: 'red', 10: 'white' };
const portName = (p) => PORT_NAMES[p] !== undefined ? PORT_NAMES[p] : String(p);

// [size, parser] per device message id
const DEVICE_SPEC = {
  0x00: [2, (p, o) => ({ type: 'battery', pct: p[o + 1] })],
  0x01: [21, (p, o) => { const dv = view(p); return {
    type: 'imu', faceUp: p[o + 1], yawFace: p[o + 2],
    yaw: dv.getInt16(o + 3, true), pitch: dv.getInt16(o + 5, true), roll: dv.getInt16(o + 7, true),
    ax: dv.getInt16(o + 9, true), ay: dv.getInt16(o + 11, true), az: dv.getInt16(o + 13, true),
    gx: dv.getInt16(o + 15, true), gy: dv.getInt16(o + 17, true), gz: dv.getInt16(o + 19, true) }; }],
  0x02: [26, (p, o) => ({ type: 'matrix5', pixels: Array.from(p.slice(o + 1, o + 26)) })],
  0x0A: [12, (p, o) => { const dv = view(p); return {
    type: 'motor', port: portName(p[o + 1]), deviceType: p[o + 2],
    absolute: dv.getInt16(o + 3, true), power: dv.getInt16(o + 5, true),
    speed: dv.getInt8(o + 7), position: dv.getInt32(o + 8, true) }; }],
  0x0B: [4, (p, o) => ({ type: 'force', port: portName(p[o + 1]), value: p[o + 2], pressed: !!p[o + 3] })],
  0x0C: [9, (p, o) => { const dv = view(p); return {
    type: 'color', port: portName(p[o + 1]), color: dv.getInt8(o + 2),
    r: dv.getUint16(o + 3, true), g: dv.getUint16(o + 5, true), b: dv.getUint16(o + 7, true) }; }],
  0x0D: [4, (p, o) => { const dv = view(p); return {
    type: 'distance', port: portName(p[o + 1]), distanceMm: dv.getInt16(o + 2, true) }; }],
  0x0E: [11, (p, o) => ({ type: 'matrix3', port: portName(p[o + 1]), pixels: Array.from(p.slice(o + 2, o + 11)) })],
};
function view(u8) { return new DataView(u8.buffer, u8.byteOffset, u8.byteLength); }

function parseDeviceNotification(d) {
  const dv = view(d);
  const size = dv.getUint16(1, true);
  const payload = d.slice(3, 3 + size);
  const devices = [];
  let o = 0;
  while (o < payload.length) {
    const devId = payload[o];
    const spec = DEVICE_SPEC[devId];
    if (!spec) break;                         // unknown device id — stop parsing
    const [len, parse] = spec;
    if (o + len > payload.length) break;
    devices.push(parse(payload, o));
    o += len;
  }
  return devices;
}

function colorName(idx) { return COLOR_NAMES[idx] !== undefined ? COLOR_NAMES[idx] : ('#' + idx); }

// ═══════════════════════════════════════════════════════════════════
// Connection manager
// ═══════════════════════════════════════════════════════════════════
class SpikeConnection {
  constructor() {
    this.device = null; this.server = null; this.rx = null; this.tx = null;
    this.info = null;
    this.packetSize = 20;           // until InfoResponse is known
    this._rxBuf = [];               // incoming byte accumulator (framed by 0x02)
    this._waiters = [];             // pending request/response resolvers
    this._cb = {};                  // {onConsole,onDevices,onStatus,onDisconnect}
    this._writeChain = Promise.resolve();
  }

  isConnected() { return !!(this.server && this.server.connected); }

  async connect(cb) {
    this._cb = cb || {};
    if (!isSupported()) throw new Error('Web Bluetooth is not available in this browser.');
    this._status('Requesting device…');
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }],
      optionalServices: [SERVICE_UUID],
    });
    this.device.addEventListener('gattserverdisconnected', () => this._onDisconnected());
    this._status('Connecting…');
    this.server = await this.device.gatt.connect();
    const service = await this.server.getPrimaryService(SERVICE_UUID);
    this.rx = await service.getCharacteristic(RX_CHAR_UUID);
    this.tx = await service.getCharacteristic(TX_CHAR_UUID);
    await this.tx.startNotifications();
    this.tx.addEventListener('characteristicvaluechanged', (e) => this._onNotify(e.target.value));

    this._status('Handshaking…');
    const info = await this._request(msg.infoRequest(), ID.InfoResponse, 5000);
    this.info = parseInfoResponse(info);
    this.packetSize = this.info.maxPacketSize || 20;
    this._status('Connected');
    return { info: this.info, name: this.device.name || 'SPIKE Hub' };
  }

  async disconnect() {
    try { if (this.tx) await this.tx.stopNotifications().catch(() => {}); } catch (e) {}
    if (this.server && this.server.connected) this.server.disconnect();
    this._reset();
  }

  _onDisconnected() {
    this._reset();
    if (this._cb.onDisconnect) this._cb.onDisconnect();
  }
  _reset() {
    this.server = null; this.rx = null; this.tx = null; this._rxBuf = [];
    for (const w of this._waiters) w.reject(new Error('disconnected'));
    this._waiters = [];
  }
  _status(s) { if (this._cb.onStatus) this._cb.onStatus(s); }

  // ── low level TX ──
  async _sendMessage(bytes) {
    const frame = cobsPack(bytes);
    // enforce ordering of writes
    this._writeChain = this._writeChain.then(async () => {
      for (let i = 0; i < frame.length; i += this.packetSize) {
        const packet = frame.slice(i, i + this.packetSize);
        await this._writePacket(packet);
      }
    });
    return this._writeChain;
  }
  async _writePacket(packet) {
    if (!this.rx) throw new Error('not connected');
    if (this.rx.writeValueWithoutResponse) return this.rx.writeValueWithoutResponse(packet);
    return this.rx.writeValue(packet);
  }

  // send a request and wait for a response with a given message id
  async _request(bytes, expectId, timeoutMs) {
    const p = new Promise((resolve, reject) => {
      const waiter = { expectId, resolve, reject, timer: null };
      waiter.timer = setTimeout(() => {
        this._waiters = this._waiters.filter((w) => w !== waiter);
        reject(new Error('Timed out waiting for hub response (0x' + expectId.toString(16) + ').'));
      }, timeoutMs || 4000);
      this._waiters.push(waiter);
    });
    await this._sendMessage(bytes);
    return p;
  }

  // ── low level RX ──
  _onNotify(dataView) {
    for (let i = 0; i < dataView.byteLength; i++) {
      const b = dataView.getUint8(i);
      this._rxBuf.push(b);
      if (b === DELIMITER) {
        const frame = Uint8Array.from(this._rxBuf);
        this._rxBuf = [];
        if (frame.length > 1) this._handleFrame(frame);
      }
    }
  }
  _handleFrame(frame) {
    let decoded;
    try { decoded = cobsUnpack(frame); } catch (e) { return; }
    if (!decoded.length) return;
    const id = decoded[0];

    // resolve any pending request waiting on this id
    const idx = this._waiters.findIndex((w) => w.expectId === id);
    if (idx >= 0) {
      const w = this._waiters[idx];
      this._waiters.splice(idx, 1);
      clearTimeout(w.timer);
      w.resolve(decoded);
    }

    // dispatch notifications
    if (id === ID.ConsoleNotification) {
      const text = fromUtf8(decoded.slice(1)).replace(/\0+$/g, '');
      if (this._cb.onConsole) this._cb.onConsole(text);
    } else if (id === ID.DeviceNotification) {
      if (this._cb.onDevices) this._cb.onDevices(parseDeviceNotification(decoded));
    } else if (id === ID.ProgramFlowNotification) {
      const stopped = decoded[1] === 1;
      if (this._cb.onStatus) this._cb.onStatus(stopped ? 'Program stopped' : 'Program running');
    }
  }

  // ── high level ──
  async enableTelemetry(intervalMs) {
    await this._request(msg.deviceNotificationRequest(intervalMs || 250), ID.DeviceNotificationResponse, 3000).catch(() => {});
  }

  // Upload a program to a slot WITHOUT starting it.
  async uploadProgram(pySource, opts) {
    opts = opts || {};
    const slot = opts.slot || 0;
    const filename = opts.filename || 'program.py';
    const program = utf8(pySource);
    const progress = opts.onProgress || (() => {});

    this._status('Clearing slot…');
    await this._request(msg.clearSlot(slot), ID.ClearSlotResponse, 4000);

    this._status('Starting upload…');
    const fileCrc = crc(program);
    await this._request(msg.startFileUpload(filename, slot, fileCrc), ID.StartFileUploadResponse, 5000);

    const chunkSize = (this.info && this.info.maxChunkSize) ? this.info.maxChunkSize : 512;
    let running = 0;
    const total = program.length || 1;
    for (let i = 0; i < program.length; i += chunkSize) {
      const chunk = program.slice(i, i + chunkSize);
      running = crc(chunk, running);
      await this._request(msg.transferChunk(running, chunk), ID.TransferChunkResponse, 5000);
      progress(Math.min(1, (i + chunk.length) / total));
    }
    progress(1);
    this._status('Upload complete');
  }

  // Upload a program, then start it.
  async runProgram(pySource, opts) {
    await this.uploadProgram(pySource, opts);
    const slot = (opts && opts.slot) || 0;
    this._status('Starting program…');
    await this._request(msg.programFlow(false, slot), ID.ProgramFlowResponse, 4000);
    this._status('Program running');
  }

  async stopProgram(opts) {
    const slot = (opts && opts.slot) || 0;
    await this._request(msg.programFlow(true, slot), ID.ProgramFlowResponse, 4000);
    this._status('Program stopped');
  }
}

// ── Module singleton + public API ──
function isSupported() {
  return typeof navigator !== 'undefined' && !!navigator.bluetooth;
}

let _conn = null;
const SpikeBLE = {
  isSupported,
  isConnected: () => !!(_conn && _conn.isConnected()),
  getInfo: () => (_conn ? _conn.info : null),
  async connect(cb) { _conn = new SpikeConnection(); return _conn.connect(cb); },
  async disconnect() { if (_conn) await _conn.disconnect(); },
  async uploadProgram(src, opts) { if (!_conn) throw new Error('not connected'); return _conn.uploadProgram(src, opts); },
  async runProgram(src, opts) { if (!_conn) throw new Error('not connected'); return _conn.runProgram(src, opts); },
  async stopProgram(opts) { if (!_conn) throw new Error('not connected'); return _conn.stopProgram(opts); },
  async enableTelemetry(ms) { if (_conn) return _conn.enableTelemetry(ms); },
  // helpers for the UI
  portName, colorName,
  // exposed for testing
  _internal: { cobsEncode, cobsDecode, cobsPack, cobsUnpack, crc, crc32,
    msg, parseInfoResponse, parseDeviceNotification, DEVICE_SPEC, ID,
    SERVICE_UUID, RX_CHAR_UUID, TX_CHAR_UUID },
};

if (typeof module !== 'undefined' && module.exports) module.exports = SpikeBLE;
global.SpikeBLE = SpikeBLE;

})(typeof globalThis !== 'undefined' ? globalThis : this);
