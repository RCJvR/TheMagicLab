// WRO 2026 Game Mat Planner — route/program planner + PyBricks export
// Builds an ordered sequence of abstract robot actions (drive, turn,
// attachment-motor lift/drop, line follow, wait, comment) and exports it
// as starter PyBricks code (SPIKE Prime / Robot Inventor style — DriveBase
// + Motor). Independent of the mat/zone data, so it works on both pages.

window.WRO_PROGRAM = (function() {
  'use strict';

  const STORAGE_KEY = 'wro2026-program';
  const PORTS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function h(tag, attrs = {}, parent = null) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'text') e.textContent = v;
      else e.setAttribute(k, v);
    }
    if (parent) parent.appendChild(e);
    return e;
  }
  function svg(tag, attrs = {}, parent = null) {
    const e = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (parent) parent.appendChild(e);
    return e;
  }

  function defaultConfig() {
    return {
      wheelDiameter: 56, axleTrack: 114, portLeft: 'A', portRight: 'B', portFront: 'C', portBack: 'D',
      straightSpeed: 200, straightAcceleration: 400, turnRate: 100, turnAcceleration: 300,
    };
  }
  function defaultWalker() {
    return { ref: 'center', start: null, stepIndex: 0 };
  }
  // 12 frame slots, each 'empty' (not configured) or a tile colour -- the
  // real layout is set by a paper pattern placed under the frame each
  // round, so this has to be entered per practice run, not hardcoded.
  function defaultMosaicPattern() {
    return new Array(12).fill('empty');
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          steps: parsed.steps || [],
          config: Object.assign(defaultConfig(), parsed.config || {}),
          walker: Object.assign(defaultWalker(), parsed.walker || {}),
          mosaicPattern: Array.isArray(parsed.mosaicPattern) && parsed.mosaicPattern.length === 12
            ? parsed.mosaicPattern : defaultMosaicPattern(),
        };
      }
    } catch { /* fall through to default */ }
    return { steps: [], config: defaultConfig(), walker: defaultWalker(), mosaicPattern: defaultMosaicPattern() };
  }
  function persist(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // ---- kinematics: 0deg = up/north, positive = clockwise (matches the
  // rest of the tool and PyBricks' own turn() convention) ----
  function applyStep(pose, step) {
    if (step.type === 'drive' || step.type === 'lineFollow') {
      const rad = pose.heading * Math.PI / 180;
      const dist = step.distanceMm;
      return { x: pose.x + dist * Math.sin(rad), y: pose.y - dist * Math.cos(rad), heading: pose.heading };
    }
    if (step.type === 'turn') {
      const signed = step.direction === 'left' ? -step.degrees : step.degrees;
      return { x: pose.x, y: pose.y, heading: ((pose.heading + signed) % 360 + 360) % 360 };
    }
    return pose;
  }
  function poseAtIndex(steps, start, idx) {
    let pose = { x: start.x, y: start.y, heading: start.heading };
    for (let i = 0; i < idx; i++) pose = applyStep(pose, steps[i]);
    return pose;
  }
  // Same as applyStep, but partway through (frac 0..1) -- used to animate
  // the robot smoothly moving/turning during Play instead of jumping
  // straight to each step's endpoint.
  function applyStepPartial(pose, step, frac) {
    if (step.type === 'drive' || step.type === 'lineFollow') {
      const rad = pose.heading * Math.PI / 180;
      const dist = step.distanceMm * frac;
      return { x: pose.x + dist * Math.sin(rad), y: pose.y - dist * Math.cos(rad), heading: pose.heading };
    }
    if (step.type === 'turn') {
      const signed = step.direction === 'left' ? -step.degrees : step.degrees;
      return { x: pose.x, y: pose.y, heading: ((pose.heading + signed * frac) % 360 + 360) % 360 };
    }
    return pose; // instantaneous actions (pickup/place/deliver/settle/motor/wait/etc): no motion, just a dwell
  }
  // How long a step takes to "play" in seconds, from the actual configured
  // kinematics -- a drive/turn step's duration is its real distance/angle
  // divided by its own speed/turn-rate (falling back to the config
  // defaults), so 1x playback matches how long the step would really take
  // on the robot. Steps with no inherent duration (pickups, motor moves,
  // comments, ...) get a short fixed dwell so they're visible in the
  // animation instead of vanishing instantly.
  const DEFAULT_ACTION_DWELL_S = 0.6;
  function stepDuration(step, config) {
    switch (step.type) {
      case 'drive':
      case 'lineFollow': {
        const speed = (step.speedMmS && step.speedMmS > 0) ? step.speedMmS : (config.straightSpeed || 200);
        return Math.abs(step.distanceMm) / Math.max(1, speed);
      }
      case 'turn': {
        const rate = (step.turnRateDegS && step.turnRateDegS > 0) ? step.turnRateDegS : (config.turnRate || 100);
        return Math.abs(step.degrees) / Math.max(1, rate);
      }
      case 'wait':
        return Math.max(0, step.seconds || 0);
      default:
        return DEFAULT_ACTION_DWELL_S;
    }
  }
  // A robot that unfolds starts "closed" (must fit the start area) and
  // switches to "open" the moment an Unfold step has been passed.
  function sizeStateAtIndex(steps, idx) {
    for (let i = 0; i < idx; i++) {
      if (steps[i].type === 'unfold') return 'open';
    }
    return 'closed';
  }
  function trailPoints(steps, start, uptoIdx) {
    const pts = [{ x: start.x, y: start.y }];
    let pose = { x: start.x, y: start.y, heading: start.heading };
    for (let i = 0; i < uptoIdx; i++) {
      pose = applyStep(pose, steps[i]);
      if (steps[i].type === 'drive' || steps[i].type === 'lineFollow') pts.push({ x: pose.x, y: pose.y });
    }
    return pts;
  }
  // footprint: { w, l } -- front/back offset by half the length (the
  // direction the robot points), left/right offset by half the width.
  function refPoint(pose, ref, footprint) {
    const rad = pose.heading * Math.PI / 180;
    const fwd = { x: Math.sin(rad), y: -Math.cos(rad) };
    const right = { x: Math.cos(rad), y: Math.sin(rad) };
    const halfL = footprint.l / 2, halfW = footprint.w / 2;
    if (ref === 'front') return { x: pose.x + fwd.x * halfL, y: pose.y + fwd.y * halfL };
    if (ref === 'back')  return { x: pose.x - fwd.x * halfL, y: pose.y - fwd.y * halfL };
    if (ref === 'right') return { x: pose.x + right.x * halfW, y: pose.y + right.y * halfW };
    if (ref === 'left')  return { x: pose.x - right.x * halfW, y: pose.y - right.y * halfW };
    return { x: pose.x, y: pose.y };
  }
  const REF_LABELS = { center: 'Centre', front: 'Front', back: 'Back', left: 'Left side', right: 'Right side' };

  function toolName(toolId) {
    const t = window.WRO_ELEMENTS && window.WRO_ELEMENTS.tools.find(t => t.id === toolId);
    return t ? t.name : toolId;
  }

  function describeStep(step) {
    switch (step.type) {
      case 'drive':
        return `Drive ${step.distanceMm >= 0 ? 'forward' : 'backward'} ${Math.abs(step.distanceMm)} mm`
          + (step.speedMmS ? ` @ ${step.speedMmS} mm/s` : '');
      case 'turn':
        return `Turn ${step.direction === 'left' ? 'left (CCW)' : 'right (CW)'} ${step.degrees}°`
          + (step.turnRateDegS ? ` @ ${step.turnRateDegS}°/s` : '');
      case 'unfold':
        return 'Unfold to open size';
      case 'frontMotor':
        return `Front motor: ${step.action} ${step.degrees}°`;
      case 'backMotor':
        return `Back motor: ${step.action} ${step.degrees}°`;
      case 'lineFollow':
        return `Line follow ${step.distanceMm} mm`;
      case 'pickupTool':
        return `Pick up ${toolName(step.toolId)}`;
      case 'deliverTool':
        return `Deliver ${toolName(step.toolId)}`;
      case 'pickupTile':
        return `Pick up ${step.colour} tile`;
      case 'placeTile':
        return `Place tile in frame slot ${step.slot + 1}`;
      case 'settleCement':
        return `Settle ${step.count}× ${step.colour} cement`;
      case 'wait':
        return `Wait ${step.seconds} s`;
      case 'comment':
        return `# ${step.text}`;
      default:
        return step.type;
    }
  }

  // ---- game-element inventory: which tiles/cement/tools have been picked
  // up, are being carried, or delivered/settled -- a pure function of step
  // history up to `idx`, mirroring poseAtIndex/sizeStateAtIndex so it can be
  // recomputed for any point the walker is scrubbed to. Senior-only
  // (window.WRO_ELEMENTS is undefined on the Elementary page).
  function defaultInventory() {
    if (!window.WRO_ELEMENTS) return null;
    const tilePool = {}, cementLoose = {}, cementSettled = {}, toolsAtPad = {};
    window.WRO_ELEMENTS.TILE_COLOURS.forEach(c => { tilePool[c] = 6; });
    window.WRO_ELEMENTS.CEMENT_COLOURS.forEach(c => { cementLoose[c] = 10; cementSettled[c] = 0; });
    window.WRO_ELEMENTS.tools.forEach(t => { toolsAtPad[t.id] = true; });
    return {
      tilePool, cementLoose, cementSettled, toolsAtPad,
      toolsDelivered: {},
      frameSlots: new Array(12).fill(null), // null | { colour, correct: true|false|null }
      carrying: [], // { type:'tile', colour } | { type:'tool', id }
    };
  }
  function applyElementStep(inv, step, mosaicPattern) {
    if (step.type === 'pickupTile') {
      if (inv.tilePool[step.colour] > 0) {
        inv.tilePool[step.colour]--;
        inv.carrying.push({ type: 'tile', colour: step.colour });
      }
    } else if (step.type === 'placeTile') {
      const ci = inv.carrying.findIndex(c => c.type === 'tile');
      if (ci !== -1 && inv.frameSlots[step.slot] == null) {
        const item = inv.carrying.splice(ci, 1)[0];
        const want = mosaicPattern[step.slot];
        const correct = want === 'empty' ? null : (want === item.colour);
        inv.frameSlots[step.slot] = { colour: item.colour, correct };
      }
    } else if (step.type === 'pickupTool') {
      if (inv.toolsAtPad[step.toolId]) {
        inv.toolsAtPad[step.toolId] = false;
        inv.carrying.push({ type: 'tool', id: step.toolId });
      }
    } else if (step.type === 'deliverTool') {
      const ci = inv.carrying.findIndex(c => c.type === 'tool' && c.id === step.toolId);
      if (ci !== -1) {
        inv.carrying.splice(ci, 1);
        inv.toolsDelivered[step.toolId] = true;
      }
    } else if (step.type === 'settleCement') {
      const n = Math.min(step.count, inv.cementLoose[step.colour]);
      inv.cementLoose[step.colour] -= n;
      inv.cementSettled[step.colour] += n;
    }
  }
  function inventoryAtIndex(steps, idx, mosaicPattern) {
    const inv = defaultInventory();
    if (!inv) return null;
    for (let i = 0; i < idx; i++) applyElementStep(inv, steps[i], mosaicPattern);
    return inv;
  }

  function generatePyBricks(steps, config) {
    const L = [];
    L.push('#!/usr/bin/env pybricks-micropython');
    L.push('"""');
    L.push('Generated by the WRO Game Mat Planner route builder.');
    L.push('Written for SPIKE Prime / Robot Inventor (PrimeHub). For EV3, swap');
    L.push('PrimeHub for EV3Brick and adjust ports to your EV3 wiring.');
    L.push('Check motor ports, turn direction and lift/drop sign against your');
    L.push('own build before running this on a robot.');
    L.push('"""');
    L.push('from pybricks.hubs import PrimeHub');
    L.push('from pybricks.pupdevices import Motor');
    L.push('from pybricks.parameters import Port, Stop');
    L.push('from pybricks.robotics import DriveBase');
    L.push('from pybricks.tools import wait');
    L.push('');
    L.push('hub = PrimeHub()');
    L.push('');
    L.push(`left_motor = Motor(Port.${config.portLeft})`);
    L.push(`right_motor = Motor(Port.${config.portRight})`);
    L.push(`front_motor = Motor(Port.${config.portFront})`);
    L.push(`back_motor = Motor(Port.${config.portBack})`);
    L.push('');
    L.push(`drive_base = DriveBase(left_motor, right_motor, wheel_diameter=${config.wheelDiameter}, axle_track=${config.axleTrack})`);
    L.push(`drive_base.settings(straight_speed=${config.straightSpeed}, straight_acceleration=${config.straightAcceleration}, turn_rate=${config.turnRate}, turn_acceleration=${config.turnAcceleration})`);
    L.push('');
    L.push('# --- Generated route ---');
    L.push('# turn(): positive = right/clockwise, negative = left/counter-clockwise');
    L.push('# motors: positive = lift, negative = drop -- flip the sign if reversed on your build');
    L.push('');

    if (!steps.length) {
      L.push('# (no steps added yet -- build a route in the planner, then re-export)');
    }

    // Track the currently-active straight_speed/turn_rate so we only emit a
    // settings() override when a step's value actually differs from what's
    // already active -- avoids a redundant settings() call before every
    // single drive/turn when most of the route uses the defaults.
    let activeSpeed = config.straightSpeed;
    let activeTurnRate = config.turnRate;

    steps.forEach(step => {
      const note = describeStep(step);
      switch (step.type) {
        case 'drive': {
          if (step.speedMmS && step.speedMmS !== activeSpeed) {
            L.push(`drive_base.settings(straight_speed=${step.speedMmS})`);
            activeSpeed = step.speedMmS;
          }
          L.push(`drive_base.straight(${step.distanceMm})  # ${note}`);
          break;
        }
        case 'turn': {
          if (step.turnRateDegS && step.turnRateDegS !== activeTurnRate) {
            L.push(`drive_base.settings(turn_rate=${step.turnRateDegS})`);
            activeTurnRate = step.turnRateDegS;
          }
          const signed = step.direction === 'left' ? -Math.abs(step.degrees) : Math.abs(step.degrees);
          L.push(`drive_base.turn(${signed})  # ${note}`);
          break;
        }
        case 'unfold':
          L.push(`# --- ${note}: add your unfolding mechanism call here ---`);
          break;
        case 'frontMotor': {
          const signed = step.action === 'drop' ? -Math.abs(step.degrees) : Math.abs(step.degrees);
          L.push(`front_motor.run_angle(200, ${signed}, then=Stop.HOLD)  # ${note}`);
          break;
        }
        case 'backMotor': {
          const signed = step.action === 'drop' ? -Math.abs(step.degrees) : Math.abs(step.degrees);
          L.push(`back_motor.run_angle(200, ${signed}, then=Stop.HOLD)  # ${note}`);
          break;
        }
        case 'lineFollow':
          L.push(`# TODO line_follow(${step.distanceMm})  -- PyBricks has no built-in line follower;`);
          L.push(`#      implement using your colour/reflect sensor readings`);
          break;
        case 'pickupTool':
        case 'deliverTool':
        case 'pickupTile':
        case 'placeTile':
        case 'settleCement':
          L.push(`# --- ${note}: add your gripper/mechanism call here ---`);
          break;
        case 'wait':
          L.push(`wait(${Math.round(step.seconds * 1000)})  # ${note}`);
          break;
        case 'comment':
          L.push(`# ${step.text}`);
          break;
      }
    });

    return L.join('\n') + '\n';
  }

  function init(tools) {
    const section = document.getElementById('programSection');
    if (!section) return;

    const state = loadState();
    let renderWalker = function() {}; // replaced once the walker section below initialises

    // Snapshot steps + robot placement before a mutation, so Ctrl+Z / Ctrl+Y
    // (window.WRO_HISTORY, shared with the measurement tools) can step back
    // and forth through route edits. Navigation (prev/next/reset step index)
    // deliberately isn't tracked here -- only actual edits are.
    function cloneProgramState() {
      return {
        steps: JSON.parse(JSON.stringify(state.steps)),
        walkerStart: state.walker.start ? Object.assign({}, state.walker.start) : null,
        walkerStepIndex: state.walker.stepIndex,
      };
    }
    function pushHistory() {
      if (!window.WRO_HISTORY) return;
      window.WRO_HISTORY.snapshot({
        label: 'program',
        data: cloneProgramState(),
        restore(target) {
          const prev = cloneProgramState();
          state.steps = JSON.parse(JSON.stringify(target.steps));
          state.walker.start = target.walkerStart ? Object.assign({}, target.walkerStart) : null;
          state.walker.stepIndex = target.walkerStepIndex;
          persist(state);
          render();
          placeBtn.textContent = state.walker.start ? '📍 Re-place robot' : '📍 Place robot on mat';
          return prev;
        },
      });
    }

    // ---- robot config ----
    const configToggle = document.getElementById('programConfigToggle');
    const configBox = document.getElementById('programConfig');
    const wheelInput = document.getElementById('cfgWheelDiameter');
    const axleInput = document.getElementById('cfgAxleTrack');
    const portLeft = document.getElementById('cfgPortLeft');
    const portRight = document.getElementById('cfgPortRight');
    const portFront = document.getElementById('cfgPortFront');
    const portBack = document.getElementById('cfgPortBack');
    const straightSpeedInput = document.getElementById('cfgStraightSpeed');
    const straightAccelInput = document.getElementById('cfgStraightAccel');
    const turnRateInput = document.getElementById('cfgTurnRate');
    const turnAccelInput = document.getElementById('cfgTurnAccel');

    [portLeft, portRight, portFront, portBack].forEach(sel => {
      PORTS.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p; opt.textContent = `Port ${p}`;
        sel.appendChild(opt);
      });
    });
    wheelInput.value = state.config.wheelDiameter;
    axleInput.value = state.config.axleTrack;
    portLeft.value = state.config.portLeft;
    portRight.value = state.config.portRight;
    portFront.value = state.config.portFront;
    portBack.value = state.config.portBack;
    straightSpeedInput.value = state.config.straightSpeed;
    straightAccelInput.value = state.config.straightAcceleration;
    turnRateInput.value = state.config.turnRate;
    turnAccelInput.value = state.config.turnAcceleration;

    function syncConfig() {
      state.config = {
        wheelDiameter: parseFloat(wheelInput.value) || 56,
        axleTrack: parseFloat(axleInput.value) || 114,
        portLeft: portLeft.value, portRight: portRight.value,
        portFront: portFront.value, portBack: portBack.value,
        straightSpeed: parseFloat(straightSpeedInput.value) || 200,
        straightAcceleration: parseFloat(straightAccelInput.value) || 400,
        turnRate: parseFloat(turnRateInput.value) || 100,
        turnAcceleration: parseFloat(turnAccelInput.value) || 300,
      };
      persist(state);
    }
    [wheelInput, axleInput, portLeft, portRight, portFront, portBack,
     straightSpeedInput, straightAccelInput, turnRateInput, turnAccelInput].forEach(el => {
      el.addEventListener('change', syncConfig);
    });

    configToggle.addEventListener('click', () => {
      configBox.style.display = configBox.style.display === 'none' ? '' : 'none';
    });

    // ---- mosaic frame pattern configurator (Senior-only: WRO_ELEMENTS is
    // undefined on the Elementary page) ----
    if (window.WRO_ELEMENTS) {
      const patternToggle = document.getElementById('mosaicPatternToggle');
      const patternBox = document.getElementById('mosaicPatternBox');
      const patternGrid = document.getElementById('mosaicPatternGrid');
      const CYCLE = ['empty', 'white', 'green', 'blue', 'yellow'];

      patternToggle.style.display = '';
      function renderPatternGrid() {
        patternGrid.innerHTML = '';
        state.mosaicPattern.forEach((colour, i) => {
          const btn = h('button', {
            type: 'button', class: 'mosaic-slot', 'data-colour': colour,
            title: `Slot ${i + 1}: ${colour === 'empty' ? 'not set' : colour} — click to cycle`,
          }, patternGrid);
          btn.textContent = colour === 'empty' ? String(i + 1) : '';
          btn.addEventListener('click', () => {
            const next = CYCLE[(CYCLE.indexOf(state.mosaicPattern[i]) + 1) % CYCLE.length];
            state.mosaicPattern[i] = next;
            persist(state);
            renderPatternGrid();
            renderWalker(); // re-checks already-placed tiles' correctness against the new pattern
          });
        });
      }
      renderPatternGrid();
      patternToggle.addEventListener('click', () => {
        patternBox.style.display = patternBox.style.display === 'none' ? '' : 'none';
      });

      // Rolls a fresh layout the same way the real event does -- a paper
      // pattern swapped in before the run -- rather than making you click
      // through 12 slots by hand every practice attempt.
      const randomBtn = document.getElementById('mosaicPatternRandomBtn');
      if (randomBtn) {
        randomBtn.addEventListener('click', () => {
          const colours = window.WRO_ELEMENTS.TILE_COLOURS;
          state.mosaicPattern = state.mosaicPattern.map(() => colours[Math.floor(Math.random() * colours.length)]);
          persist(state);
          renderPatternGrid();
          renderWalker();
        });
      }

      const frameSlotSel = document.getElementById('stepFrameSlot');
      window.WRO_ELEMENTS.frameSlots.forEach((slot, i) => {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = `Slot ${i + 1}`;
        frameSlotSel.appendChild(opt);
      });
    }

    // ---- add-step row ----
    const typeSel = document.getElementById('stepType');
    const fields = Array.from(document.querySelectorAll('.program-field'));
    function syncFields() {
      const t = typeSel.value;
      fields.forEach(f => {
        f.style.display = f.dataset.for.split(',').includes(t) ? '' : 'none';
      });
    }
    typeSel.addEventListener('change', syncFields);
    syncFields();

    const distanceInput = document.getElementById('stepDistance');
    const speedInput = document.getElementById('stepSpeed');
    const degreesInput = document.getElementById('stepDegrees');
    const directionSel = document.getElementById('stepDirection');
    const stepTurnRateInput = document.getElementById('stepTurnRate');
    const motorActionSel = document.getElementById('stepMotorAction');
    const secondsInput = document.getElementById('stepSeconds');
    const commentInput = document.getElementById('stepComment');
    // These only exist on the Senior page (index.html) -- null here on
    // Elementary, which is fine, since the dropdown there has no options
    // that reach the branches below that read them.
    const stepToolSel = document.getElementById('stepTool');
    const stepTileColourSel = document.getElementById('stepTileColour');
    const stepFrameSlotSel = document.getElementById('stepFrameSlot');
    const stepCementColourSel = document.getElementById('stepCementColour');
    const stepCementCountInput = document.getElementById('stepCementCount');

    const stepsList = document.getElementById('programSteps');
    const actionsBox = document.getElementById('programActions');

    function render() {
      stepsList.innerHTML = '';
      actionsBox.style.display = state.steps.length ? '' : 'none';
      state.steps.forEach((step, idx) => {
        const li = h('li', { class: 'program-step' }, stepsList);
        h('span', { class: 'program-step-num', text: String(idx + 1) }, li);
        h('span', { class: 'program-step-desc', text: describeStep(step) }, li);
        const actions = h('span', { class: 'program-step-actions' }, li);

        const up = h('button', { type: 'button', title: 'Move up' }, actions);
        up.textContent = '↑';
        up.disabled = idx === 0;
        up.addEventListener('click', () => {
          pushHistory();
          [state.steps[idx - 1], state.steps[idx]] = [state.steps[idx], state.steps[idx - 1]];
          persist(state); render();
        });

        const down = h('button', { type: 'button', title: 'Move down' }, actions);
        down.textContent = '↓';
        down.disabled = idx === state.steps.length - 1;
        down.addEventListener('click', () => {
          pushHistory();
          [state.steps[idx + 1], state.steps[idx]] = [state.steps[idx], state.steps[idx + 1]];
          persist(state); render();
        });

        const del = h('button', { type: 'button', title: 'Delete step', class: 'danger' }, actions);
        del.textContent = '×';
        del.addEventListener('click', () => {
          pushHistory();
          state.steps.splice(idx, 1);
          persist(state); render();
        });
      });
      renderWalker();
    }
    render();

    document.getElementById('stepAddBtn').addEventListener('click', () => {
      const t = typeSel.value;
      const step = { type: t };
      if (t === 'drive' || t === 'lineFollow') {
        step.distanceMm = parseFloat(distanceInput.value) || 0;
        if (t === 'drive') {
          const spd = parseFloat(speedInput.value);
          if (!isNaN(spd) && spd > 0) step.speedMmS = spd;
        }
      } else if (t === 'turn') {
        step.degrees = Math.abs(parseFloat(degreesInput.value) || 0);
        step.direction = directionSel.value;
        const rate = parseFloat(stepTurnRateInput.value);
        if (!isNaN(rate) && rate > 0) step.turnRateDegS = rate;
      } else if (t === 'unfold') {
        // no parameters
      } else if (t === 'frontMotor' || t === 'backMotor') {
        step.degrees = Math.abs(parseFloat(degreesInput.value) || 0);
        step.action = motorActionSel.value;
      } else if (t === 'pickupTool' || t === 'deliverTool') {
        step.toolId = stepToolSel.value;
      } else if (t === 'pickupTile') {
        step.colour = stepTileColourSel.value;
      } else if (t === 'placeTile') {
        step.slot = parseInt(stepFrameSlotSel.value, 10) || 0;
      } else if (t === 'settleCement') {
        step.colour = stepCementColourSel.value;
        step.count = Math.max(1, Math.min(10, parseInt(stepCementCountInput.value, 10) || 1));
      } else if (t === 'wait') {
        step.seconds = parseFloat(secondsInput.value) || 0;
      } else if (t === 'comment') {
        step.text = commentInput.value.trim();
        if (!step.text) return;
        commentInput.value = '';
      }
      pushHistory();
      state.steps.push(step);
      persist(state);
      render();
    });

    document.getElementById('programClearBtn').addEventListener('click', () => {
      if (!state.steps.length) return;
      pushHistory();
      state.steps = [];
      persist(state);
      render();
    });

    // ---- export modal ----
    const modal = document.getElementById('programModal');
    const exportBtn = document.getElementById('programExportBtn');
    const closeBtn = modal.querySelector('button.close');
    const codeArea = document.getElementById('programCode');

    exportBtn.addEventListener('click', () => {
      codeArea.value = generatePyBricks(state.steps, state.config);
      modal.classList.add('open');
    });
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

    document.getElementById('programCopyCode').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(codeArea.value); }
      catch { codeArea.select(); document.execCommand('copy'); }
    });
    document.getElementById('programDownloadCode').addEventListener('click', () => {
      const blob = new Blob([codeArea.value], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wro2026-route.py';
      a.click();
      URL.revokeObjectURL(url);
    });

    // ---- walker: place a robot on the mat and step through the route ----
    const stage = document.getElementById('stage');
    const measSvg = document.getElementById('measureSvg');
    const walkerLayer = document.getElementById('walkerLayer');
    const elementsLayer = document.getElementById('elementsLayer');
    const refSelect = document.getElementById('walkerRef');
    const placeBtn = document.getElementById('walkerPlaceBtn');
    const resetBtn = document.getElementById('walkerResetBtn');
    const prevBtn = document.getElementById('walkerPrevBtn');
    const nextBtn = document.getElementById('walkerNextBtn');
    const playBtn = document.getElementById('walkerPlayBtn');
    const playSpeedSel = document.getElementById('walkerPlaySpeed');
    const readout = document.getElementById('walkerReadout');

    // ---- game-element rendering (tiles/cement/tools/frame) + scoring
    // tie-in. Senior-only: WRO_ELEMENTS is undefined on Elementary, so all
    // of this is a no-op there. Real-world sizes (1 LEGO stud = 8mm):
    // mosaic tile = 4x4 plate (32x32mm), cement = 1x6 plate (48x8mm),
    // tools = exactly their pickup pad's footprint (elements-senior.js).
    const COLOUR_HEX = { white: '#e9edf5', green: '#22c55e', blue: '#3b82f6', yellow: '#facc15' };
    const TILE_MM = 32;
    const CEMENT_MM = { w: 48, h: 8 };
    function clearElementsLayer() { if (elementsLayer) elementsLayer.innerHTML = ''; }
    function carriedItemSize(item) {
      if (item.type === 'tile') return { w: TILE_MM, h: TILE_MM };
      const tool = window.WRO_ELEMENTS.tools.find(t => t.id === item.id);
      return tool ? { w: tool.w, h: tool.h } : { w: 24, h: 24 };
    }
    function renderElements(pose, sizeState, inv) {
      if (!window.WRO_ELEMENTS || !elementsLayer) return;
      clearElementsLayer();
      const E = window.WRO_ELEMENTS;
      const half = TILE_MM / 2;

      E.TILE_COLOURS.forEach(colour => {
        const positions = E.tiles.filter(t => t.colour === colour);
        positions.slice(0, inv.tilePool[colour]).forEach(p => {
          svg('rect', {
            x: p.x - half, y: p.y - half, width: TILE_MM, height: TILE_MM, rx: 2,
            class: 'elem-tile', fill: COLOUR_HEX[colour],
          }, elementsLayer);
        });
      });

      E.CEMENT_COLOURS.forEach(colour => {
        const positions = E.cement.filter(c => c.colour === colour);
        positions.forEach((p, i) => {
          const settled = i < inv.cementSettled[colour];
          svg('rect', {
            x: p.x - CEMENT_MM.w / 2, y: p.y - CEMENT_MM.h / 2, width: CEMENT_MM.w, height: CEMENT_MM.h, rx: 1.5,
            class: `elem-cement ${settled ? 'elem-cement-settled' : 'elem-cement-loose'}`,
            fill: COLOUR_HEX[colour],
          }, elementsLayer);
        });
      });

      E.tools.forEach(tool => {
        const carried = inv.carrying.some(c => c.type === 'tool' && c.id === tool.id);
        if (carried) return;
        const delivered = inv.toolsDelivered[tool.id];
        let x = tool.x, y = tool.y;
        if (delivered) {
          const zone = window.WRO_ZONES.find(z => z.id === tool.target);
          if (zone) { x = zone.centre.x; y = zone.centre.y; }
        }
        const cls = `elem-tool${delivered ? ' elem-tool-delivered' : ''}`;
        if (tool.shape === 'polygon') {
          svg('polygon', {
            points: tool.points.map(p => `${x + p.x},${y + p.y}`).join(' '),
            class: cls,
          }, elementsLayer);
        } else {
          svg('rect', {
            x: x - tool.w / 2, y: y - tool.h / 2, width: tool.w, height: tool.h, rx: 4,
            class: cls,
          }, elementsLayer);
        }
      });

      inv.frameSlots.forEach((filled, i) => {
        if (!filled) return;
        const slot = E.frameSlots[i];
        const correctness = filled.correct === true ? 'correct' : filled.correct === false ? 'incorrect' : 'unknown';
        svg('rect', {
          x: slot.x - half, y: slot.y - half, width: TILE_MM, height: TILE_MM, rx: 3,
          class: `elem-frame-tile elem-frame-tile-${correctness}`, fill: COLOUR_HEX[filled.colour],
        }, elementsLayer);
      });

      if (pose && inv.carrying.length) {
        const rad = pose.heading * Math.PI / 180;
        const fwd = { x: Math.sin(rad), y: -Math.cos(rad) };
        const right = { x: Math.cos(rad), y: Math.sin(rad) };
        const sizes = inv.carrying.map(carriedItemSize);
        const maxW = Math.max(...sizes.map(s => s.w));
        const out = tools.getRobotFootprint(sizeState).w / 2 + maxW / 2 + 14;
        const totalAlong = sizes.reduce((s, sz) => s + sz.h, 0) + (sizes.length - 1) * 6;
        let cursor = -totalAlong / 2;
        inv.carrying.forEach((item, i) => {
          const sz = sizes[i];
          const along = cursor + sz.h / 2;
          cursor += sz.h + 6;
          const px = pose.x - right.x * out + fwd.x * along;
          const py = pose.y - right.y * out + fwd.y * along;
          const colour = item.type === 'tile' ? COLOUR_HEX[item.colour] : '#cbd5e1';
          svg('rect', { x: px - sz.w / 2, y: py - sz.h / 2, width: sz.w, height: sz.h, rx: 2, class: 'elem-carried', fill: colour }, elementsLayer);
        });
      }
    }

    // Writes the tool/mosaic/cement scoring fields the simulation
    // understands into the same localStorage key the scoring panel reads,
    // then asks it to redraw. Only touches those specific fields -- the
    // barrier bonus checkboxes (which the simulation doesn't model) stay
    // fully under manual control.
    function syncScoringFromInventory(inv) {
      if (!window.WRO_ELEMENTS) return;
      try {
        const raw = localStorage.getItem('wro2026-scoring-state');
        const score = raw ? JSON.parse(raw) : {};
        window.WRO_ELEMENTS.tools.forEach(t => {
          score[t.scoringId] = inv.toolsDelivered[t.id] ? 'full' : 'none';
        });
        let correct = 0, incorrect = 0;
        inv.frameSlots.forEach(slot => {
          if (!slot || slot.correct == null) return;
          if (slot.correct) correct++; else incorrect++;
        });
        score.mosaic_correct = correct;
        score.mosaic_incorrect = incorrect;
        window.WRO_ELEMENTS.CEMENT_COLOURS.forEach(c => { score['cement_' + c] = inv.cementSettled[c]; });
        localStorage.setItem('wro2026-scoring-state', JSON.stringify(score));
        if (window.WRO_SCORING_REFRESH) window.WRO_SCORING_REFRESH();
      } catch { /* scoring sync is best-effort */ }
    }

    if (walkerLayer && refSelect) {
      refSelect.value = state.walker.ref;

      let placing = null; // null | 'position' | 'heading'
      let pendingStart = null;

      // ---- Play: animate the robot through the route in real time,
      // instead of only jumping between step endpoints via Prev/Next.
      // playFrac is 0..1 progress through state.walker.stepIndex's own
      // step -- deliberately not persisted (a reload should land back on
      // the clean step boundary, not mid-animation).
      let playing = false;
      let playFrac = 0;
      let playRAF = null;
      let playLastT = null;

      function clientToMM(e) {
        const r = stage.getBoundingClientRect();
        return {
          x: ((e.clientX - r.left) / r.width) * window.WRO_MAT.width,
          y: ((e.clientY - r.top) / r.height) * window.WRO_MAT.height,
        };
      }
      // A TouchEvent has no clientX/clientY of its own -- pull it from
      // touches (start/move) or changedTouches (end), shared by the
      // placement flow and the robot-drag handlers below.
      function extractPoint(e) {
        if (e.touches && e.touches.length) return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
        if (e.changedTouches && e.changedTouches.length) return { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY };
        return { clientX: e.clientX, clientY: e.clientY };
      }

      function clearWalkerLayer() { walkerLayer.innerHTML = ''; }

      // Drag the placed robot's silhouette to reposition it, instead of
      // having to re-run the two-click place flow. Dragging shifts
      // state.walker.start by the same delta at whatever step is currently
      // shown, which slides the whole route uniformly (heading unchanged).
      let robotDrag = null; // { origin: {x,y}, startMouse: {x,y} }
      function onRobotMouseDown(e) {
        if (!state.walker.start || placing) return;
        e.preventDefault();
        e.stopPropagation();
        pausePlayback();
        pushHistory();
        robotDrag = { origin: { x: state.walker.start.x, y: state.walker.start.y }, startMouse: clientToMM(extractPoint(e)) };
        document.addEventListener('mousemove', onRobotDragMove);
        document.addEventListener('mouseup', onRobotDragEnd);
        document.addEventListener('touchmove', onRobotDragMoveTouch, { passive: false });
        document.addEventListener('touchend', onRobotDragEndTouch, { passive: false });
      }
      function moveRobotDragTo(pt) {
        if (!robotDrag) return;
        const mm = clientToMM(pt);
        state.walker.start.x = robotDrag.origin.x + (mm.x - robotDrag.startMouse.x);
        state.walker.start.y = robotDrag.origin.y + (mm.y - robotDrag.startMouse.y);
        renderWalker();
      }
      function onRobotDragMove(e) { moveRobotDragTo(extractPoint(e)); }
      function onRobotDragMoveTouch(e) { e.preventDefault(); moveRobotDragTo(extractPoint(e)); }
      function onRobotDragEndTouch(e) { e.preventDefault(); onRobotDragEnd(); }
      function onRobotDragEnd() {
        if (!robotDrag) return;
        robotDrag = null;
        persist(state);
        document.removeEventListener('mousemove', onRobotDragMove);
        document.removeEventListener('mouseup', onRobotDragEnd);
        document.removeEventListener('touchmove', onRobotDragMoveTouch);
        document.removeEventListener('touchend', onRobotDragEndTouch);
      }

      function drawRobotAt(pose, sizeState) {
        clearWalkerLayer();
        const fp = tools.getRobotFootprint(sizeState || 'closed');
        const halfW = fp.w / 2, halfL = fp.l / 2;
        const arrowLen = Math.min(42, halfL + 10);
        const g = svg('g', { transform: `translate(${pose.x} ${pose.y}) rotate(${pose.heading})`, class: 'walker-robot-live' }, walkerLayer);
        g.addEventListener('mousedown', onRobotMouseDown);
        g.addEventListener('touchstart', onRobotMouseDown, { passive: false });
        svg('rect', { x: -halfW, y: -halfL, width: fp.w, height: fp.l, class: `walker-footprint walker-footprint-${sizeState || 'closed'}` }, g);
        svg('polygon', { points: `0,${-halfL + 10} ${-18},${-halfL + arrowLen} ${18},${-halfL + arrowLen}`, class: 'walker-arrow' }, g);

        // trail so far — skipped during placement (drawRobotAt(pendingStart)
        // is called before state.walker.start exists, on the "click again to
        // set heading" step)
        if (state.walker.start) {
          const idx = Math.min(state.walker.stepIndex, state.steps.length);
          const pts = trailPoints(state.steps, state.walker.start, idx);
          // Mid-drive during Play: extend the trail's leading edge to the
          // live interpolated position instead of only jumping once the
          // whole step finishes, so the path visibly draws itself.
          const curStep = state.steps[idx];
          if (playFrac > 0 && curStep && (curStep.type === 'drive' || curStep.type === 'lineFollow')) {
            pts.push({ x: pose.x, y: pose.y });
          }
          if (pts.length > 1) {
            svg('polyline', {
              points: pts.map(p => `${p.x},${p.y}`).join(' '),
              class: 'walker-trail',
            }, walkerLayer);
          }
        }

        // reference-point marker
        const rp = refPoint(pose, refSelect.value, fp);
        svg('circle', { cx: rp.x, cy: rp.y, r: 9, class: 'walker-refdot' }, walkerLayer);
      }

      // "In hand" preview while placing: a translucent footprint that
      // follows the cursor before the position click, then rotates live
      // toward the cursor before the heading click, so you can see how the
      // robot will land before committing to either click.
      function drawGhost(pose) {
        clearWalkerLayer();
        const sizeState = tools.getRobotState();
        const fp = tools.getRobotFootprint(sizeState);
        const halfW = fp.w / 2, halfL = fp.l / 2;
        const arrowLen = Math.min(42, halfL + 10);
        const g = svg('g', {
          transform: `translate(${pose.x} ${pose.y}) rotate(${pose.heading})`,
          class: 'walker-ghost',
        }, walkerLayer);
        svg('rect', { x: -halfW, y: -halfL, width: fp.w, height: fp.l, class: `walker-footprint walker-footprint-${sizeState}` }, g);
        svg('polygon', { points: `0,${-halfL + 10} ${-18},${-halfL + arrowLen} ${18},${-halfL + arrowLen}`, class: 'walker-arrow' }, g);
      }

      // The live pose: fully-applied steps up to stepIndex, plus however far
      // into the *current* step Play has gotten (playFrac 0..1). At rest
      // (playFrac 0) this is identical to poseAtIndex(..., stepIndex).
      function currentPose() {
        const idx = Math.min(state.walker.stepIndex, state.steps.length);
        let pose = poseAtIndex(state.steps, state.walker.start, idx);
        if (playFrac > 0 && idx < state.steps.length) {
          pose = applyStepPartial(pose, state.steps[idx], playFrac);
        }
        return pose;
      }
      // Unlike drive/turn (which visibly interpolate via currentPose), an
      // instantaneous step -- pickup/place/deliver/settle/unfold -- has no
      // partial state to show mid-dwell. So it should read as "done" the
      // moment its dwell *starts* (playFrac > 0), not only once the dwell
      // finishes -- otherwise a picked-up tile wouldn't appear lifted onto
      // the robot until 0.6s after you'd expect it to.
      function appliedStepIndex() {
        const idx = Math.min(state.walker.stepIndex, state.steps.length);
        return playFrac > 0 ? Math.min(idx + 1, state.steps.length) : idx;
      }

      function updateReadout() {
        const total = state.steps.length;
        const idx = Math.min(state.walker.stepIndex, total);
        if (!state.walker.start) {
          readout.textContent = 'Click "Place robot on mat", then click the mat twice — once for position, once to set heading.';
          return;
        }
        const pose = currentPose();
        const sizeState = sizeStateAtIndex(state.steps, appliedStepIndex());
        const fp = tools.getRobotFootprint(sizeState);
        const rp = refPoint(pose, refSelect.value, fp);
        let stepNote;
        if (playing && idx < total) {
          stepNote = ` · running: ${describeStep(state.steps[idx])} (${Math.round(playFrac * 100)}%)`;
        } else {
          stepNote = idx > 0 && state.steps[idx - 1] ? ` · last: ${describeStep(state.steps[idx - 1])}` : ' · at start pose';
        }
        readout.textContent = `Step ${idx}/${total} — ${REF_LABELS[refSelect.value]} @ (${rp.x.toFixed(0)}, ${rp.y.toFixed(0)}) mm · heading ${pose.heading.toFixed(0)}° · ${sizeState}${stepNote}`;
      }

      renderWalker = function() {
        state.walker.stepIndex = Math.min(state.walker.stepIndex, state.steps.length);
        const hasRobot = !!state.walker.start;
        resetBtn.disabled = !hasRobot;
        prevBtn.disabled = !hasRobot || playing || state.walker.stepIndex === 0;
        nextBtn.disabled = !hasRobot || playing || state.walker.stepIndex >= state.steps.length;
        playBtn.disabled = !hasRobot || !state.steps.length;
        playBtn.textContent = playing ? '⏸ Pause' : '▶ Play';
        let pose = null, sizeState = 'closed';
        if (hasRobot) {
          pose = currentPose();
          sizeState = sizeStateAtIndex(state.steps, appliedStepIndex());
          drawRobotAt(pose, sizeState);
        } else {
          clearWalkerLayer();
        }
        if (window.WRO_ELEMENTS) {
          const inv = inventoryAtIndex(state.steps, appliedStepIndex(), state.mosaicPattern);
          renderElements(pose, sizeState, inv);
          syncScoringFromInventory(inv);
        }
        updateReadout();
      };

      // ---- Play: animate stepIndex/playFrac forward in real time using
      // each step's actual duration (stepDuration), via requestAnimationFrame
      // so it stays smooth regardless of frame rate. ----
      function pausePlayback() {
        if (!playing) return;
        playing = false;
        if (playRAF != null) { cancelAnimationFrame(playRAF); playRAF = null; }
        playLastT = null;
        persist(state); // stepIndex only -- playFrac is deliberately not persisted
        renderWalker();
      }
      function playTick(t) {
        if (!playing) return;
        if (playLastT == null) playLastT = t;
        // Clamp so a backgrounded/throttled tab doesn't "catch up" in one huge jump.
        const dtSeconds = Math.min(0.25, (t - playLastT) / 1000);
        playLastT = t;
        const speed = parseFloat(playSpeedSel.value) || 1;

        let idx = state.walker.stepIndex;
        let remaining = dtSeconds * speed;
        while (remaining > 0 && idx < state.steps.length) {
          const dur = Math.max(0.001, stepDuration(state.steps[idx], state.config));
          const newElapsed = playFrac * dur + remaining;
          if (newElapsed >= dur) {
            remaining = newElapsed - dur;
            idx++;
            playFrac = 0;
          } else {
            playFrac = newElapsed / dur;
            remaining = 0;
          }
        }
        state.walker.stepIndex = idx;
        if (idx >= state.steps.length) {
          playFrac = 0;
          pausePlayback();
          return;
        }
        renderWalker();
        playRAF = requestAnimationFrame(playTick);
      }
      function startPlayback() {
        if (!state.walker.start || !state.steps.length) return;
        cancelPlacingAndReleaseTool();
        if (state.walker.stepIndex >= state.steps.length) { state.walker.stepIndex = 0; playFrac = 0; }
        playing = true;
        playLastT = null;
        renderWalker();
        playRAF = requestAnimationFrame(playTick);
      }
      playBtn.addEventListener('click', () => { playing ? pausePlayback() : startPlayback(); });

      refSelect.addEventListener('change', () => {
        cancelPlacingAndReleaseTool();
        state.walker.ref = refSelect.value;
        persist(state);
        renderWalker();
      });

      function cancelPlacing() {
        if (!placing) return;
        placing = null;
        // Don't touch stage.dataset.tool here — the toolbar button that
        // triggered this cancellation already set it via its own (earlier)
        // click listener in app.js. Overwriting it here would stomp
        // whichever real tool the user just picked.
        placeBtn.textContent = state.walker.start ? '📍 Re-place robot' : '📍 Place robot on mat';
        renderWalker();
      }

      // Reset/Prev/Next/ref-select don't select a different tool, so unlike
      // cancelPlacing() above they DO need to put the mat's click surface
      // back to normal themselves. Without this, clicking e.g. Reset
      // mid-placement only redraws over the ghost -- it doesn't leave
      // placement mode, so the next mat click is silently eaten as the
      // position/heading click instead of doing what it looks like it does.
      function cancelPlacingAndReleaseTool() {
        if (!placing) return;
        pendingStart = null;
        stage.dataset.tool = 'none';
        cancelPlacing();
      }

      placeBtn.addEventListener('click', () => {
        // Tapping the button again mid-placement backs out -- the touch
        // equivalent of pressing Esc, since a touchscreen has no Esc key.
        if (placing) { cancelPlacingAndReleaseTool(); return; }
        pausePlayback();
        tools.setTool('none');
        // tools.js's own click handler is now a no-op (its closure `tool` is
        // 'none'), but the CSS rule `[data-tool="none"] svg.measure {
        // pointer-events: none}` also makes the mat un-clickable — so the
        // stage needs a tool value that isn't "none" for OUR click handler
        // below to ever receive an event at all.
        stage.dataset.tool = 'placing';
        placing = 'position';
        pendingStart = null;
        placeBtn.textContent = '📍 Click the mat: set position…';
        readout.textContent = 'Move over the mat to see the robot, then click to set its position.';
      });

      // Placing a robot borrows the mat's click surface — if the user picks
      // a different tool mid-placement, back out cleanly instead of leaving
      // two click handlers racing each other.
      document.querySelectorAll('button[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => cancelPlacing());
      });

      // "In hand" ghost: follow the cursor before the position click, then
      // rotate toward the cursor before the heading click. Shared by mouse
      // hover and touch drag -- a touchscreen has no hover, so on touch this
      // only appears once a finger is actually down and moving.
      function updatePlacementGhost(e) {
        if (!placing) return;
        const pt = clientToMM(e);
        if (placing === 'position') {
          drawGhost({ x: pt.x, y: pt.y, heading: 0 });
        } else if (placing === 'heading') {
          const dx = pt.x - pendingStart.x, dy = pt.y - pendingStart.y;
          let heading = Math.atan2(dx, -dy) * 180 / Math.PI;
          heading = ((heading % 360) + 360) % 360;
          drawGhost({ x: pendingStart.x, y: pendingStart.y, heading });
          readout.textContent = `Heading ${heading.toFixed(0)}° — click to confirm, or Esc to cancel.`;
        }
      }
      measSvg.addEventListener('mousemove', updatePlacementGhost);

      function commitPlacementTap(e) {
        if (!placing) return;
        const pt = clientToMM(e);
        if (placing === 'position') {
          pendingStart = { x: pt.x, y: pt.y, heading: 0 };
          placing = 'heading';
          placeBtn.textContent = '📍 Click again: set heading…';
          readout.textContent = 'Move to aim the robot, then click to set its heading.';
          drawGhost(pendingStart);
        } else if (placing === 'heading') {
          const dx = pt.x - pendingStart.x, dy = pt.y - pendingStart.y;
          let heading = Math.atan2(dx, -dy) * 180 / Math.PI;
          heading = ((heading % 360) + 360) % 360;
          pendingStart.heading = heading;
          pushHistory();
          state.walker.start = pendingStart;
          state.walker.stepIndex = 0;
          placing = null;
          stage.dataset.tool = 'none';
          placeBtn.textContent = '📍 Re-place robot';
          persist(state);
          renderWalker();
        }
      }
      measSvg.addEventListener('click', commitPlacementTap);

      // Touch: press-and-drag to aim (mirrors mousemove), lift to commit
      // that phase (mirrors click) -- two taps in the right spots works too,
      // but drag-to-aim reads better on a touchscreen than a bare double-tap.
      measSvg.addEventListener('touchstart', (e) => {
        if (!placing) return;
        e.preventDefault();
        updatePlacementGhost(extractPoint(e));
      }, { passive: false });
      measSvg.addEventListener('touchmove', (e) => {
        if (!placing) return;
        e.preventDefault();
        updatePlacementGhost(extractPoint(e));
      }, { passive: false });
      measSvg.addEventListener('touchend', (e) => {
        if (!placing) return;
        e.preventDefault();
        commitPlacementTap(extractPoint(e));
      }, { passive: false });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          pausePlayback();
          if (placing) cancelPlacingAndReleaseTool();
        }
        // Undo/redo (window.WRO_HISTORY) can rewrite state.walker.stepIndex
        // out from under an in-progress animation -- stop it first.
        if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'y' || e.key === 'Z' || e.key === 'Y')) {
          pausePlayback();
        }
      });

      resetBtn.addEventListener('click', () => {
        pausePlayback();
        cancelPlacingAndReleaseTool();
        state.walker.stepIndex = 0;
        persist(state);
        renderWalker();
      });
      prevBtn.addEventListener('click', () => {
        pausePlayback();
        cancelPlacingAndReleaseTool();
        state.walker.stepIndex = Math.max(0, state.walker.stepIndex - 1);
        persist(state);
        renderWalker();
      });
      nextBtn.addEventListener('click', () => {
        pausePlayback();
        cancelPlacingAndReleaseTool();
        state.walker.stepIndex = Math.min(state.steps.length, state.walker.stepIndex + 1);
        persist(state);
        renderWalker();
      });

      if (state.walker.start) placeBtn.textContent = '📍 Re-place robot';
      renderWalker();
    }
  }

  return { init, generatePyBricks };
})();
