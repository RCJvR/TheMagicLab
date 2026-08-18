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

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          steps: parsed.steps || [],
          config: Object.assign(defaultConfig(), parsed.config || {}),
          walker: Object.assign(defaultWalker(), parsed.walker || {}),
        };
      }
    } catch { /* fall through to default */ }
    return { steps: [], config: defaultConfig(), walker: defaultWalker() };
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
  function refPoint(pose, ref, size) {
    const rad = pose.heading * Math.PI / 180;
    const fwd = { x: Math.sin(rad), y: -Math.cos(rad) };
    const right = { x: Math.cos(rad), y: Math.sin(rad) };
    const half = size / 2;
    if (ref === 'front') return { x: pose.x + fwd.x * half, y: pose.y + fwd.y * half };
    if (ref === 'back')  return { x: pose.x - fwd.x * half, y: pose.y - fwd.y * half };
    if (ref === 'right') return { x: pose.x + right.x * half, y: pose.y + right.y * half };
    if (ref === 'left')  return { x: pose.x - right.x * half, y: pose.y - right.y * half };
    return { x: pose.x, y: pose.y };
  }
  const REF_LABELS = { center: 'Centre', front: 'Front', back: 'Back', left: 'Left side', right: 'Right side' };

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
      case 'wait':
        return `Wait ${step.seconds} s`;
      case 'comment':
        return `# ${step.text}`;
      default:
        return step.type;
    }
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
          [state.steps[idx - 1], state.steps[idx]] = [state.steps[idx], state.steps[idx - 1]];
          persist(state); render();
        });

        const down = h('button', { type: 'button', title: 'Move down' }, actions);
        down.textContent = '↓';
        down.disabled = idx === state.steps.length - 1;
        down.addEventListener('click', () => {
          [state.steps[idx + 1], state.steps[idx]] = [state.steps[idx], state.steps[idx + 1]];
          persist(state); render();
        });

        const del = h('button', { type: 'button', title: 'Delete step', class: 'danger' }, actions);
        del.textContent = '×';
        del.addEventListener('click', () => {
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
      } else if (t === 'wait') {
        step.seconds = parseFloat(secondsInput.value) || 0;
      } else if (t === 'comment') {
        step.text = commentInput.value.trim();
        if (!step.text) return;
        commentInput.value = '';
      }
      state.steps.push(step);
      persist(state);
      render();
    });

    document.getElementById('programClearBtn').addEventListener('click', () => {
      if (!state.steps.length) return;
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
    const refSelect = document.getElementById('walkerRef');
    const placeBtn = document.getElementById('walkerPlaceBtn');
    const resetBtn = document.getElementById('walkerResetBtn');
    const prevBtn = document.getElementById('walkerPrevBtn');
    const nextBtn = document.getElementById('walkerNextBtn');
    const readout = document.getElementById('walkerReadout');

    if (walkerLayer && refSelect) {
      refSelect.value = state.walker.ref;

      let placing = null; // null | 'position' | 'heading'
      let pendingStart = null;

      function clientToMM(e) {
        const r = stage.getBoundingClientRect();
        return {
          x: ((e.clientX - r.left) / r.width) * window.WRO_MAT.width,
          y: ((e.clientY - r.top) / r.height) * window.WRO_MAT.height,
        };
      }

      function clearWalkerLayer() { walkerLayer.innerHTML = ''; }

      function drawRobotAt(pose, sizeState) {
        clearWalkerLayer();
        const size = tools.getRobotSize(sizeState || 'closed');
        const half = size / 2;
        const g = svg('g', { transform: `translate(${pose.x} ${pose.y}) rotate(${pose.heading})` }, walkerLayer);
        svg('rect', { x: -half, y: -half, width: size, height: size, class: `walker-footprint walker-footprint-${sizeState || 'closed'}` }, g);
        svg('polygon', { points: `0,${-half + 10} ${-18},${-half + 42} ${18},${-half + 42}`, class: 'walker-arrow' }, g);

        // trail so far — skipped during placement (drawRobotAt(pendingStart)
        // is called before state.walker.start exists, on the "click again to
        // set heading" step)
        if (state.walker.start) {
          const idx = Math.min(state.walker.stepIndex, state.steps.length);
          const pts = trailPoints(state.steps, state.walker.start, idx);
          if (pts.length > 1) {
            svg('polyline', {
              points: pts.map(p => `${p.x},${p.y}`).join(' '),
              class: 'walker-trail',
            }, walkerLayer);
          }
        }

        // reference-point marker
        const rp = refPoint(pose, refSelect.value, size);
        svg('circle', { cx: rp.x, cy: rp.y, r: 9, class: 'walker-refdot' }, walkerLayer);
      }

      function updateReadout() {
        const total = state.steps.length;
        const idx = Math.min(state.walker.stepIndex, total);
        if (!state.walker.start) {
          readout.textContent = 'Click "Place robot on mat", then click the mat twice — once for position, once to set heading.';
          return;
        }
        const pose = poseAtIndex(state.steps, state.walker.start, idx);
        const sizeState = sizeStateAtIndex(state.steps, idx);
        const size = tools.getRobotSize(sizeState);
        const rp = refPoint(pose, refSelect.value, size);
        const stepNote = idx > 0 && state.steps[idx - 1] ? ` · last: ${describeStep(state.steps[idx - 1])}` : ' · at start pose';
        readout.textContent = `Step ${idx}/${total} — ${REF_LABELS[refSelect.value]} @ (${rp.x.toFixed(0)}, ${rp.y.toFixed(0)}) mm · heading ${pose.heading.toFixed(0)}° · ${sizeState}${stepNote}`;
      }

      renderWalker = function() {
        state.walker.stepIndex = Math.min(state.walker.stepIndex, state.steps.length);
        const hasRobot = !!state.walker.start;
        resetBtn.disabled = !hasRobot;
        prevBtn.disabled = !hasRobot || state.walker.stepIndex === 0;
        nextBtn.disabled = !hasRobot || state.walker.stepIndex >= state.steps.length;
        if (hasRobot) {
          const pose = poseAtIndex(state.steps, state.walker.start, state.walker.stepIndex);
          const sizeState = sizeStateAtIndex(state.steps, state.walker.stepIndex);
          drawRobotAt(pose, sizeState);
        } else {
          clearWalkerLayer();
        }
        updateReadout();
      };

      refSelect.addEventListener('change', () => {
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

      placeBtn.addEventListener('click', () => {
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
        readout.textContent = 'Click anywhere on the mat to set the robot\'s starting position.';
      });

      // Placing a robot borrows the mat's click surface — if the user picks
      // a different tool mid-placement, back out cleanly instead of leaving
      // two click handlers racing each other.
      document.querySelectorAll('button[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => cancelPlacing());
      });

      measSvg.addEventListener('click', (e) => {
        if (!placing) return;
        const pt = clientToMM(e);
        if (placing === 'position') {
          pendingStart = { x: pt.x, y: pt.y, heading: 0 };
          placing = 'heading';
          placeBtn.textContent = '📍 Click again: set heading…';
          readout.textContent = 'Now click in the direction the robot should face.';
          drawRobotAt(pendingStart);
        } else if (placing === 'heading') {
          const dx = pt.x - pendingStart.x, dy = pt.y - pendingStart.y;
          let heading = Math.atan2(dx, -dy) * 180 / Math.PI;
          heading = ((heading % 360) + 360) % 360;
          pendingStart.heading = heading;
          state.walker.start = pendingStart;
          state.walker.stepIndex = 0;
          placing = null;
          stage.dataset.tool = 'none';
          placeBtn.textContent = '📍 Re-place robot';
          persist(state);
          renderWalker();
        }
      });

      resetBtn.addEventListener('click', () => {
        state.walker.stepIndex = 0;
        persist(state);
        renderWalker();
      });
      prevBtn.addEventListener('click', () => {
        state.walker.stepIndex = Math.max(0, state.walker.stepIndex - 1);
        persist(state);
        renderWalker();
      });
      nextBtn.addEventListener('click', () => {
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
