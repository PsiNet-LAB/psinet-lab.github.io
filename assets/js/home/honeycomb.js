(function initHoneycomb() {
  var canvas = document.getElementById('honeycomb-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var card = canvas.closest('.bento-logo');
  var dpr = window.devicePixelRatio || 1;

  var hexRadius = 20;
  var hexH = hexRadius * 2;
  var hexW = Math.sqrt(3) * hexRadius;
  var colOffset = hexW;
  var rowOffset = hexH * 0.75;

  var MOUSE_GLOW_RADIUS = 80;
  var MAX_CELL_BRIGHTNESS = 0.45;
  var PULSE_RING_WIDTH = 30;

  var cells = [];
  var mouse = { x: -999, y: -999, active: false };
  var pulses = [];
  var centerX = 0;
  var centerY = 0;
  var time = 0;
  var nextPulseTime = 2;

  function hexPath(cx, cy, r) {
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      var angle = Math.PI / 6 + i * Math.PI / 3;
      var hx = cx + r * Math.cos(angle);
      var hy = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(hx, hy);
      else ctx.lineTo(hx, hy);
    }
    ctx.closePath();
  }

  function buildGrid() {
    var w = card.offsetWidth;
    var h = card.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    centerX = w / 2;
    centerY = h / 2;
    cells = [];

    var cols = Math.ceil(w / colOffset) + 2;
    var rows = Math.ceil(h / rowOffset) + 2;

    for (var col = -1; col < cols; col++) {
      for (var row = -1; row < rows; row++) {
        var cx = col * colOffset + (row % 2 === 1 ? colOffset / 2 : 0);
        var cy = row * rowOffset;
        cells.push({
          x: cx,
          y: cy,
          distCenter: Math.sqrt((cx - centerX) * (cx - centerX) + (cy - centerY) * (cy - centerY)),
          phase: (col * 0.7 + row * 0.4) % (Math.PI * 2),
          brightness: 0,
          edgeBrightness: 0
        });
      }
    }
  }

  function spawnPulse() {
    var origin;
    if (Math.random() < 0.5) {
      origin = { x: centerX, y: centerY };
    } else {
      var idx = Math.floor(Math.random() * cells.length);
      origin = { x: cells[idx].x, y: cells[idx].y };
    }
    pulses.push({
      x: origin.x,
      y: origin.y,
      radius: 0,
      maxRadius: Math.max(canvas.width, canvas.height) / dpr * 0.6,
      speed: 80 + Math.random() * 40,
      life: 1
    });
  }

  function render(dt) {
    time += dt;
    var w = canvas.width / dpr;
    var h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);

    nextPulseTime -= dt;
    if (nextPulseTime <= 0) {
      spawnPulse();
      nextPulseTime = 3 + Math.random() * 4;
    }

    for (var p = pulses.length - 1; p >= 0; p--) {
      pulses[p].radius += pulses[p].speed * dt;
      pulses[p].life = 1 - (pulses[p].radius / pulses[p].maxRadius);
      if (pulses[p].life <= 0) pulses.splice(p, 1);
    }

    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var wavePhase = cell.distCenter * 0.02 - time * 1.2 + cell.phase * 0.3;
      var breath = (Math.sin(wavePhase) * 0.5 + 0.5) * 0.08;
      var wave2 = (Math.sin(cell.distCenter * 0.01 + time * 0.5) * 0.5 + 0.5) * 0.03;
      var pulseBright = 0;

      for (var pp = 0; pp < pulses.length; pp++) {
        var pulse = pulses[pp];
        var distToPulse = Math.sqrt(
          (cell.x - pulse.x) * (cell.x - pulse.x) +
          (cell.y - pulse.y) * (cell.y - pulse.y)
        );
        var ringDist = Math.abs(distToPulse - pulse.radius);
        if (ringDist < PULSE_RING_WIDTH) {
          var ringIntensity = (1 - ringDist / PULSE_RING_WIDTH) * pulse.life * 0.25;
          pulseBright = Math.max(pulseBright, ringIntensity);
        }
      }

      var mouseBright = 0;
      if (mouse.active) {
        var distMouse = Math.sqrt(
          (cell.x - mouse.x) * (cell.x - mouse.x) +
          (cell.y - mouse.y) * (cell.y - mouse.y)
        );
        if (distMouse < MOUSE_GLOW_RADIUS) {
          mouseBright = (1 - distMouse / MOUSE_GLOW_RADIUS) * 0.3;
        }
      }

      cell.brightness = Math.min(breath + wave2 + pulseBright + mouseBright, MAX_CELL_BRIGHTNESS);
      cell.edgeBrightness = Math.min(0.04 + breath * 0.6 + pulseBright * 1.5 + mouseBright * 0.8, 0.5);
    }

    for (var f = 0; f < cells.length; f++) {
      var fillCell = cells[f];
      if (fillCell.brightness > 0.005) {
        hexPath(fillCell.x, fillCell.y, hexRadius - 1);
        ctx.fillStyle = 'rgba(94,234,212,' + fillCell.brightness.toFixed(3) + ')';
        ctx.fill();
      }
    }

    ctx.lineWidth = 0.5;
    for (var s = 0; s < cells.length; s++) {
      var strokeCell = cells[s];
      if (strokeCell.edgeBrightness > 0.01) {
        hexPath(strokeCell.x, strokeCell.y, hexRadius - 1);
        ctx.strokeStyle = 'rgba(94,234,212,' + strokeCell.edgeBrightness.toFixed(3) + ')';
        ctx.stroke();
      }
    }

    ctx.lineWidth = 0.4;
    var brightThreshold = 0.1;
    var connectionDist = colOffset * 1.3;
    for (var a = 0; a < cells.length; a++) {
      if (cells[a].brightness < brightThreshold) continue;
      for (var b = a + 1; b < cells.length; b++) {
        if (cells[b].brightness < brightThreshold) continue;
        var dx = cells[a].x - cells[b].x;
        var dy = cells[a].y - cells[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDist) {
          var alpha = Math.min(cells[a].brightness, cells[b].brightness) * 0.5;
          ctx.beginPath();
          ctx.moveTo(cells[a].x, cells[a].y);
          ctx.lineTo(cells[b].x, cells[b].y);
          ctx.strokeStyle = 'rgba(94,234,212,' + alpha.toFixed(3) + ')';
          ctx.stroke();
        }
      }
    }

    var glowSize = 60 + Math.sin(time * 1.2) * 10;
    var grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowSize);
    grd.addColorStop(0, 'rgba(94,234,212,0.06)');
    grd.addColorStop(1, 'rgba(94,234,212,0)');
    ctx.fillStyle = grd;
    ctx.fillRect(centerX - glowSize, centerY - glowSize, glowSize * 2, glowSize * 2);
  }

  buildGrid();
  var lastTime = performance.now();

  function loop(now) {
    var dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    render(dt);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  card.addEventListener('mousemove', function(e) {
    var rect = card.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  card.addEventListener('mouseleave', function() {
    mouse.active = false;
  });

  card.addEventListener('click', function(e) {
    var rect = card.getBoundingClientRect();
    pulses.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: Math.max(card.offsetWidth, card.offsetHeight) * 0.8,
      speed: 120,
      life: 1
    });
  });

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      dpr = window.devicePixelRatio || 1;
      buildGrid();
    }, 200);
  });
})();
