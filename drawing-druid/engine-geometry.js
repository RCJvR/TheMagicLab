// ConstructionGeometry — pure 2D math for EGD constructions. No DOM, mm units, [x,y] point pairs.
(function (global) {
  'use strict';

  // Ported from model-mage.html (arcGeom, ptSegDist, catmullRomExpand) — unchanged logic.
  function arcGeom(p1, pmid, p2) {
    const [ax, ay] = p1, [bx, by] = pmid, [cx, cy] = p2;
    const D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(D) < 1e-10) return null;
    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / D;
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / D;
    const r = Math.hypot(ax - ux, ay - uy);
    const a1 = Math.atan2(ay - uy, ax - ux);
    const am = Math.atan2(by - uy, bx - ux);
    const a2 = Math.atan2(cy - uy, cx - ux);
    function norm(a) { return ((a % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2); }
    const n1 = norm(a1), nm = norm(am), n2 = norm(a2);
    let ccw;
    if (n1 < n2) ccw = nm > n1 && nm < n2;
    else ccw = nm > n1 || nm < n2;
    return { cx: ux, cy: uy, r, startAngle: a1, endAngle: a2, ccw };
  }

  function ptSegDist(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1, dy = y2 - y1, lenSq = dx * dx + dy * dy;
    if (lenSq < 1e-10) return Math.hypot(px - x1, py - y1);
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  }

  function catmullRomExpand(pts, steps = 20) {
    const result = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let j = 0; j < steps; j++) {
        const t = j / steps, t2 = t * t, t3 = t2 * t;
        result.push([
          0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
        ]);
      }
    }
    result.push(pts[pts.length - 1]);
    return result;
  }

  // ── New EGD-construction-specific helpers ──

  function midpoint(p1, p2) {
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  }

  function distance(p1, p2) {
    return Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
  }

  function rotatePoint(pt, center, angleDeg) {
    const rad = angleDeg * Math.PI / 180;
    const dx = pt[0] - center[0], dy = pt[1] - center[1];
    return [
      center[0] + dx * Math.cos(rad) - dy * Math.sin(rad),
      center[1] + dx * Math.sin(rad) + dy * Math.cos(rad),
    ];
  }

  function lineAtAngleLength(start, angleDeg, length) {
    const rad = angleDeg * Math.PI / 180;
    return [start[0] + length * Math.cos(rad), start[1] + length * Math.sin(rad)];
  }

  function angleBetween(vertex, p1, p2) {
    const a1 = Math.atan2(p1[1] - vertex[1], p1[0] - vertex[0]);
    const a2 = Math.atan2(p2[1] - vertex[1], p2[0] - vertex[0]);
    let deg = (a2 - a1) * 180 / Math.PI;
    deg = ((deg % 360) + 360) % 360;
    return deg;
  }

  // Perpendicular bisector of segment p1-p2, returned as a line extended `extendBy` mm past the segment's midpoint on each side.
  function perpendicularBisector(p1, p2, extendBy) {
    const m = midpoint(p1, p2);
    const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    return {
      p1: [m[0] - nx * extendBy, m[1] - ny * extendBy],
      p2: [m[0] + nx * extendBy, m[1] + ny * extendBy],
      midpoint: m,
    };
  }

  // Angle bisector ray from vertex, between rays vertex->p1 and vertex->p2, of given length.
  function angleBisector(vertex, p1, p2, length) {
    const a1 = Math.atan2(p1[1] - vertex[1], p1[0] - vertex[0]);
    const a2 = Math.atan2(p2[1] - vertex[1], p2[0] - vertex[0]);
    let diff = a2 - a1;
    while (diff <= -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    const bisectAngle = a1 + diff / 2;
    return {
      p1: vertex.slice(),
      p2: [vertex[0] + length * Math.cos(bisectAngle), vertex[1] + length * Math.sin(bisectAngle)],
    };
  }

  // Classic Thales-semicircle tangent construction: tangent points on a circle (center,r) as seen from an external point.
  function circleTangentFromExternalPoint(center, r, extPt) {
    const d = distance(center, extPt);
    if (d <= r) return { tangentPoints: [], tangentLength: 0 };
    const tangentLength = Math.sqrt(d * d - r * r);
    // Midpoint of center-extPt is the centre of the Thales auxiliary circle (diameter = d).
    const m = midpoint(center, extPt);
    const auxR = d / 2;
    // Intersection of circle(center,r) and circle(m,auxR) — the two tangent points.
    const dCM = distance(center, m);
    const a = (r * r - auxR * auxR + dCM * dCM) / (2 * dCM);
    const h = Math.sqrt(Math.max(0, r * r - a * a));
    const ux = (m[0] - center[0]) / dCM, uy = (m[1] - center[1]) / dCM;
    const px = center[0] + a * ux, py = center[1] + a * uy;
    const t1 = [px + h * -uy, py + h * ux];
    const t2 = [px - h * -uy, py - h * ux];
    return {
      tangentPoints: [t1, t2],
      tangentLength,
      auxCircle: { cx: m[0], cy: m[1], r: auxR },
    };
  }

  // Tangent line through a given point that already lies on the circle (perpendicular to the radius at that point).
  function circleTangentAtPoint(center, r, pointOnCircle, length) {
    const dx = pointOnCircle[0] - center[0], dy = pointOnCircle[1] - center[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    const half = (length || r) ;
    return {
      p1: [pointOnCircle[0] - nx * half, pointOnCircle[1] - ny * half],
      p2: [pointOnCircle[0] + nx * half, pointOnCircle[1] + ny * half],
    };
  }

  // Regular polygon vertices inscribed in a circle.
  function regularPolygonInCircle(center, r, sides, startAngleDeg) {
    const start = (startAngleDeg || -90) * Math.PI / 180;
    const pts = [];
    for (let i = 0; i < sides; i++) {
      const a = start + (i * 2 * Math.PI / sides);
      pts.push([center[0] + r * Math.cos(a), center[1] + r * Math.sin(a)]);
    }
    return pts;
  }

  // Points along a projected helix (cylindrical): one point per angular step, rising `pitch` mm per full turn.
  function helixPoints(baseRadius, pitch, turns, steps) {
    const total = steps || 12 * turns;
    const pts = [];
    for (let i = 0; i <= total; i++) {
      const t = i / (total / turns); // turns completed
      const a = t * 2 * Math.PI;
      pts.push({
        x: baseRadius * Math.cos(a),
        y: baseRadius * Math.sin(a),
        rise: t * pitch,
        angleDeg: (t * 360) % 360,
      });
    }
    return pts;
  }

  global.ConstructionGeometry = {
    arcGeom, ptSegDist, catmullRomExpand,
    midpoint, distance, rotatePoint, lineAtAngleLength, angleBetween,
    perpendicularBisector, angleBisector,
    circleTangentFromExternalPoint, circleTangentAtPoint,
    regularPolygonInCircle, helixPoints,
  };
})(window);
