/* ============================================================
   SPLASH CANVAS v3 — "Heaven Through Space" — Immersive VR
   Aurora waves · Hyperspace warp · VR floor grid · Nebula
   Sacred rings · Comets · Rising souls · Divine bloom
   ============================================================ */
(function () {
    'use strict';

    var canvas = document.getElementById('splash-canvas');
    if (!canvas || !canvas.getContext) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx   = canvas.getContext('2d');
    var W, H, cx, cy;
    var frame = 0, raf, alive = true;
    var gridOffset = 0;

    /* ── RESIZE ──────────────────────────────────────────────── */
    function resize() {
        W  = canvas.width  = window.innerWidth;
        H  = canvas.height = window.innerHeight;
        cx = W / 2;
        cy = H / 2;
        initStars();
        initSouls();
        initDust();
    }

    /* ══════════════════════════════════════════════════════════
       1. BACKGROUND — deep space radial
    ══════════════════════════════════════════════════════════ */
    function drawBg() {
        var g = ctx.createRadialGradient(cx, cy * 0.7, 0, cx, cy, Math.max(W, H) * 0.9);
        g.addColorStop(0,    '#1e0840');
        g.addColorStop(0.18, '#110530');
        g.addColorStop(0.45, '#080218');
        g.addColorStop(0.75, '#030010');
        g.addColorStop(1,    '#010008');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }

    /* ══════════════════════════════════════════════════════════
       2. NEBULA — overlapping colour clouds
    ══════════════════════════════════════════════════════════ */
    var nebData = [
        { rx:0.08, ry:0.18, rr:0.50, h:265, s:75, a:0.055, ph:0.0  },
        { rx:0.92, ry:0.15, rr:0.44, h:220, s:65, a:0.050, ph:1.2  },
        { rx:0.50, ry:0.82, rr:0.40, h:310, s:60, a:0.045, ph:2.4  },
        { rx:0.14, ry:0.72, rr:0.35, h:195, s:55, a:0.040, ph:3.6  },
        { rx:0.82, ry:0.78, rr:0.38, h:250, s:70, a:0.048, ph:0.9  },
        { rx:0.35, ry:0.10, rr:0.32, h:290, s:60, a:0.038, ph:1.8  },
        { rx:0.70, ry:0.12, rr:0.30, h:185, s:50, a:0.035, ph:2.7  },
        { rx:0.50, ry:0.45, rr:0.28, h: 45, s:70, a:0.030, ph:0.5  },  // gold centre
    ];

    function drawNebula() {
        var t = frame * 0.0025;
        for (var i = 0; i < nebData.length; i++) {
            var n = nebData[i];
            var pulse = 0.82 + 0.18 * Math.sin(n.ph + t);
            var r     = Math.max(W, H) * n.rr * pulse;
            var a     = n.a * pulse;
            var g = ctx.createRadialGradient(n.rx*W, n.ry*H, 0, n.rx*W, n.ry*H, r);
            g.addColorStop(0,   'hsla('+n.h+','+n.s+'%,52%,'+a+')');
            g.addColorStop(0.45,'hsla('+n.h+','+n.s+'%,38%,'+(a*0.45)+')');
            g.addColorStop(1,   'hsla('+n.h+','+n.s+'%,28%,0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        }
    }

    /* ══════════════════════════════════════════════════════════
       3. AURORA — undulating light bands near the top
    ══════════════════════════════════════════════════════════ */
    var auroraBands = [
        { yf:0.06, amp:0.035, color:[100,220,190], a:0.09, spd:0.6,  ph:0.0 },
        { yf:0.11, amp:0.025, color:[130,140,255], a:0.08, spd:0.45, ph:1.4 },
        { yf:0.16, amp:0.040, color:[180, 80,255], a:0.07, spd:0.55, ph:2.8 },
        { yf:0.21, amp:0.020, color:[ 60,190,255], a:0.06, spd:0.38, ph:1.0 },
    ];

    function drawAurora() {
        var t = frame * 0.004;
        auroraBands.forEach(function(b) {
            var baseY  = b.yf * H;
            var amp    = b.amp * H;
            var c      = b.color;
            var colStr = c[0]+','+c[1]+','+c[2];

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, baseY);
            var segs = 10;
            for (var i = 1; i <= segs; i++) {
                var x  = (i / segs) * W;
                var y  = baseY + Math.sin(t * b.spd + b.ph + i * 0.9) * amp;
                var cx1 = x - W / segs * 0.5;
                var cy1 = baseY + Math.sin(t * b.spd + b.ph + (i - 0.5) * 0.9) * amp * 1.4;
                ctx.quadraticCurveTo(cx1, cy1, x, y);
            }
            ctx.lineTo(W, 0); ctx.lineTo(0, 0); ctx.closePath();

            var g = ctx.createLinearGradient(0, baseY - amp * 2, 0, baseY + amp * 3);
            g.addColorStop(0,   'rgba('+colStr+',0)');
            g.addColorStop(0.3, 'rgba('+colStr+','+b.a+')');
            g.addColorStop(0.7, 'rgba('+colStr+','+(b.a*0.5)+')');
            g.addColorStop(1,   'rgba('+colStr+',0)');
            ctx.fillStyle = g;
            ctx.fill();
            ctx.restore();
        });
    }

    /* ══════════════════════════════════════════════════════════
       4. GOD RAYS — light shafts from centre
    ══════════════════════════════════════════════════════════ */
    var godRays = (function() {
        var rs = [];
        for (var i = 0; i < 22; i++) {
            rs.push({
                a0:  (i / 22) * Math.PI * 2,
                hw:  0.022 + Math.random() * 0.048,
                al:  0.016 + Math.random() * 0.028,
                spd: (Math.random() - 0.5) * 0.00025,
                ph:  Math.random() * Math.PI * 2,
                warm: Math.random() < 0.45
            });
        }
        return rs;
    })();

    function drawGodRays() {
        var len = Math.max(W, H) * 1.6;
        var t   = frame * 0.003;
        ctx.save();
        for (var i = 0; i < godRays.length; i++) {
            var r = godRays[i];
            r.a0 += r.spd;
            var pulse = 0.45 + 0.55 * Math.sin(r.ph + t);
            var a     = r.al * pulse;
            var a1 = r.a0 - r.hw, a2 = r.a0 + r.hw;
            var mx = cx + Math.cos(r.a0) * len * 0.45;
            var my = cy + Math.sin(r.a0) * len * 0.45;
            var g = ctx.createLinearGradient(cx, cy, mx, my);
            if (r.warm) {
                g.addColorStop(0, 'rgba(255,200, 80,'+(a*3.5).toFixed(3)+')');
                g.addColorStop(1, 'rgba(255,140, 40,0)');
            } else {
                g.addColorStop(0, 'rgba(190,160,255,'+(a*3.0).toFixed(3)+')');
                g.addColorStop(1, 'rgba(120, 80,255,0)');
            }
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(a1)*len, cy + Math.sin(a1)*len);
            ctx.lineTo(cx + Math.cos(a2)*len, cy + Math.sin(a2)*len);
            ctx.closePath();
            ctx.fillStyle = g;
            ctx.fill();
        }
        ctx.restore();
    }

    /* ══════════════════════════════════════════════════════════
       5. HYPERSPACE WARP STARS — 1000 streaks from centre
    ══════════════════════════════════════════════════════════ */
    var STAR_N = 1000;
    var stars  = [];

    function resetStar(s, scatter) {
        s.angle = Math.random() * Math.PI * 2;
        s.r     = scatter ? 2 + Math.random() * Math.max(W,H) * 0.52 : 1 + Math.random() * 4;
        s.spd   = 1.046 + Math.random() * 0.026;
        s.thick = 0.3 + Math.random() * 0.7;
        var rand = Math.random();
        // 20% gold, 15% pink, rest cool blue/white
        s.hue   = rand < 0.20 ? 45 + Math.random()*15
                : rand < 0.35 ? 320 + Math.random()*30
                :               200 + Math.random()*50;
        s.sat   = 60 + Math.random() * 40;
        s.lit   = 70 + Math.random() * 28;
        return s;
    }
    function initStars() {
        stars = [];
        for (var i = 0; i < STAR_N; i++) stars.push(resetStar({}, true));
    }

    function drawStars() {
        var maxD = Math.max(W,H) * 0.72;
        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            var pr = s.r;
            s.r  *= s.spd;
            var x2 = cx + Math.cos(s.angle)*s.r;
            var y2 = cy + Math.sin(s.angle)*s.r;
            if (x2<-12||x2>W+12||y2<-12||y2>H+12) { resetStar(s,false); continue; }
            var x1 = cx + Math.cos(s.angle)*pr;
            var y1 = cy + Math.sin(s.angle)*pr;
            var t  = Math.min(1, s.r / maxD);
            var a  = Math.min(1, t * 1.9);
            var g  = ctx.createLinearGradient(x1, y1, x2, y2);
            g.addColorStop(0, 'hsla('+s.hue+','+s.sat+'%,'+s.lit+'%,0)');
            g.addColorStop(1, 'hsla('+s.hue+','+s.sat+'%,'+s.lit+'%,'+a.toFixed(2)+')');
            ctx.strokeStyle = g;
            ctx.lineWidth   = s.thick * (0.5 + t * 2.5);
            ctx.lineCap     = 'round';
            ctx.beginPath();
            ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
            ctx.stroke();
        }
    }

    /* ══════════════════════════════════════════════════════════
       6. VR FLOOR GRID — perspective grid rushing toward viewer
    ══════════════════════════════════════════════════════════ */
    function drawGrid() {
        gridOffset = (gridOffset + 0.016) % 1;
        var vpY     = cy * 0.82;   // vanishing point slightly above centre
        var floorY  = H;
        var floorHW = W * 0.72;
        var DEPTH   = 14, VERT = 12;

        ctx.save();
        ctx.globalAlpha = 1;

        // Horizontal grid lines (rushing outward)
        for (var d = 0; d <= DEPTH; d++) {
            var tt  = ((d / DEPTH) + gridOffset) % 1;
            var tp  = tt * tt * tt;                    // cubic — fast near viewer
            var y   = vpY + tp * (floorY - vpY);
            var hw  = tp * floorHW;
            var al  = Math.min(1, tp * 2.2) * 0.38;
            if (al < 0.02) continue;

            var g = ctx.createLinearGradient(cx-hw, y, cx+hw, y);
            g.addColorStop(0,   'rgba(140,90,255,0)');
            g.addColorStop(0.15,'rgba(140,90,255,'+al+')');
            g.addColorStop(0.5, 'rgba(180,130,255,'+(al*1.4)+')');
            g.addColorStop(0.85,'rgba(140,90,255,'+al+')');
            g.addColorStop(1,   'rgba(140,90,255,0)');
            ctx.strokeStyle = g;
            ctx.lineWidth   = 0.6 + tp * 1.2;
            ctx.beginPath();
            ctx.moveTo(cx-hw, y); ctx.lineTo(cx+hw, y);
            ctx.stroke();
        }

        // Vertical convergence lines
        for (var v = 0; v <= VERT; v++) {
            var frac = v / VERT;
            var bx   = cx - floorHW + frac * floorHW * 2;
            var al2  = 0.28 * Math.sin(frac * Math.PI);
            var g2   = ctx.createLinearGradient(cx, vpY, bx, floorY);
            g2.addColorStop(0,   'rgba(120,70,255,0)');
            g2.addColorStop(0.25,'rgba(130,80,255,'+(al2*0.4)+')');
            g2.addColorStop(1,   'rgba(110,60,220,'+al2+')');
            ctx.strokeStyle = g2;
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.moveTo(cx, vpY); ctx.lineTo(bx, floorY);
            ctx.stroke();
        }

        ctx.restore();
    }

    /* ══════════════════════════════════════════════════════════
       7. SACRED RINGS — gold → violet → deep blue
    ══════════════════════════════════════════════════════════ */
    var rings = [];
    var RING_SPAWN = 32;

    function spawnRing() {
        rings.push({ r:0, spd: 2.5+Math.random()*2.5, maxR: Math.max(W,H)*0.90, lw:1.0+Math.random()*1.2 });
    }

    function drawRings() {
        if (frame % RING_SPAWN === 0) spawnRing();
        for (var i = rings.length-1; i >= 0; i--) {
            var rn = rings[i];
            rn.r  += rn.spd;
            var t  = rn.r / rn.maxR;
            if (t >= 1) { rings.splice(i,1); continue; }

            var hue, a;
            if (t < 0.30) {
                hue = 45 + (t/0.30) * (270-45);
                a   = t * 3.0;
            } else if (t < 0.65) {
                hue = 270 + ((t-0.30)/0.35) * (215-270);
                a   = (1 - (t-0.30)/0.35) * 0.75;
            } else {
                hue = 215;
                a   = (1-t) * 0.45;
            }
            a = Math.min(0.80, a);

            // Outer glow ring
            ctx.beginPath();
            ctx.arc(cx, cy, rn.r, 0, Math.PI*2);
            ctx.strokeStyle = 'hsla('+hue.toFixed(0)+',90%,68%,'+(a*0.25).toFixed(3)+')';
            ctx.lineWidth   = rn.lw * (1 + t*3) + 4;
            ctx.stroke();

            // Sharp inner ring
            ctx.beginPath();
            ctx.arc(cx, cy, rn.r, 0, Math.PI*2);
            ctx.strokeStyle = 'hsla('+hue.toFixed(0)+',88%,74%,'+a.toFixed(3)+')';
            ctx.lineWidth   = rn.lw * (0.8 + t*1.5);
            ctx.stroke();
        }
    }

    /* ══════════════════════════════════════════════════════════
       8. COMETS — rare dramatic streaks across the sky
    ══════════════════════════════════════════════════════════ */
    var comets = [];

    function maybeSpawnComet() {
        if (Math.random() < 0.0025 && comets.length < 4) {
            var fromLeft = Math.random() > 0.5;
            var angle    = (Math.random() * 0.4 + 0.1) * (fromLeft ? 1 : -1 + Math.PI);
            var spd      = 9 + Math.random() * 7;
            comets.push({
                x:    fromLeft ? -60 : W+60,
                y:    H * (0.05 + Math.random() * 0.55),
                vx:   Math.cos(angle) * spd,
                vy:   Math.sin(angle) * spd * 0.35 + Math.random() * 1.5,
                len:  100 + Math.random() * 150,
                al:   0.85 + Math.random() * 0.15,
                hue:  Math.random() < 0.45 ? 48 : 210 + Math.random() * 60,
                size: 1.5 + Math.random() * 1.5
            });
        }
    }

    function drawComets() {
        maybeSpawnComet();
        for (var i = comets.length-1; i >= 0; i--) {
            var c = comets[i];
            c.x  += c.vx; c.y += c.vy; c.al -= 0.006;
            if (c.al <= 0 || c.x<-300 || c.x>W+300 || c.y<-200 || c.y>H+200) { comets.splice(i,1); continue; }
            var ang  = Math.atan2(c.vy, c.vx);
            var tx   = c.x - Math.cos(ang) * c.len;
            var ty   = c.y - Math.sin(ang) * c.len;
            var g    = ctx.createLinearGradient(tx, ty, c.x, c.y);
            g.addColorStop(0,   'hsla('+c.hue+',90%,85%,0)');
            g.addColorStop(0.6, 'hsla('+c.hue+',90%,90%,'+(c.al*0.4).toFixed(2)+')');
            g.addColorStop(1,   'hsla('+c.hue+',95%,98%,'+c.al.toFixed(2)+')');
            ctx.strokeStyle = g;
            ctx.lineWidth   = c.size;
            ctx.lineCap     = 'round';
            ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(c.x,c.y); ctx.stroke();
            // Glowing head
            var gH = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size*5);
            gH.addColorStop(0, 'hsla('+c.hue+',100%,100%,'+c.al+')');
            gH.addColorStop(1, 'hsla('+c.hue+',90%,80%,0)');
            ctx.fillStyle = gH;
            ctx.beginPath(); ctx.arc(c.x, c.y, c.size*5, 0, Math.PI*2); ctx.fill();
        }
    }

    /* ══════════════════════════════════════════════════════════
       9. FLOATING DUST — tiny ambient specs
    ══════════════════════════════════════════════════════════ */
    var DUST_N = 160;
    var dust   = [];

    function initDust() {
        dust = [];
        for (var i = 0; i < DUST_N; i++) {
            dust.push({
                x: Math.random()*W, y: Math.random()*H,
                vx:(Math.random()-0.5)*0.18, vy:-(0.05+Math.random()*0.15),
                r: 0.5+Math.random()*1.0,
                al:0.08+Math.random()*0.22,
                ph:Math.random()*Math.PI*2,
                warm:Math.random()<0.4
            });
        }
    }

    function drawDust() {
        var t = frame*0.02;
        for (var i = 0; i < dust.length; i++) {
            var d = dust[i];
            d.x += d.vx + Math.sin(d.ph+t*0.4)*0.12;
            d.y += d.vy;
            if (d.y < -5) { d.y = H+5; d.x = Math.random()*W; }
            var tw = 0.6 + 0.4*Math.sin(d.ph+t*2);
            var a  = d.al * tw;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r*tw, 0, Math.PI*2);
            ctx.fillStyle = d.warm
                ? 'rgba(255,210,100,'+a.toFixed(3)+')'
                : 'rgba(180,160,255,'+a.toFixed(3)+')';
            ctx.fill();
        }
    }

    /* ══════════════════════════════════════════════════════════
       10. RISING SOULS — glowing orbs ascending to the light
    ══════════════════════════════════════════════════════════ */
    var SOUL_N = 220;
    var souls  = [];

    function resetSoul(s, scatter) {
        var depth = 0.12 + Math.random()*0.88;
        s.x    = Math.random()*W;
        s.y    = scatter ? Math.random()*H : H+12;
        s.vy   = -(0.18 + depth*1.0);
        s.vx   = (Math.random()-0.5)*0.4;
        s.sz   = 0.5 + depth*2.2;
        s.al   = 0.10 + depth*0.48;
        s.ph   = Math.random()*Math.PI*2;
        s.warm = Math.random() < 0.38;
        return s;
    }
    function initSouls() {
        souls = [];
        for (var i = 0; i < SOUL_N; i++) souls.push(resetSoul({}, true));
    }

    function drawSouls() {
        var t = frame*0.018;
        for (var i = 0; i < souls.length; i++) {
            var s = souls[i];
            s.y += s.vy; s.x += s.vx + Math.sin(s.ph+t*0.5)*0.28;
            if (s.y < -12) { resetSoul(s,false); continue; }
            var tw = 0.55 + 0.45*Math.sin(s.ph+t*3.2);
            var a  = Math.min(1, s.al*tw);
            var r  = s.sz*tw;
            var g  = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r*7);
            if (s.warm) {
                g.addColorStop(0,   'rgba(255,215,80,'+a.toFixed(3)+')');
                g.addColorStop(0.35,'rgba(255,160,40,'+(a*0.38).toFixed(3)+')');
                g.addColorStop(1,   'rgba(255,100,10,0)');
            } else {
                g.addColorStop(0,   'rgba(210,185,255,'+a.toFixed(3)+')');
                g.addColorStop(0.35,'rgba(145,105,255,'+(a*0.38).toFixed(3)+')');
                g.addColorStop(1,   'rgba(80,50,230,0)');
            }
            ctx.beginPath(); ctx.arc(s.x, s.y, r*7, 0, Math.PI*2);
            ctx.fillStyle = g; ctx.fill();
            ctx.beginPath(); ctx.arc(s.x, s.y, r, 0, Math.PI*2);
            ctx.fillStyle = s.warm
                ? 'rgba(255,245,180,'+Math.min(1,a*1.8).toFixed(3)+')'
                : 'rgba(235,225,255,'+Math.min(1,a*1.8).toFixed(3)+')';
            ctx.fill();
        }
    }

    /* ══════════════════════════════════════════════════════════
       11. DIVINE BLOOM — the heavenly light source at centre
    ══════════════════════════════════════════════════════════ */
    function drawBloom() {
        var pulse  = 0.86 + 0.14 * Math.sin(frame * 0.022);
        var pulse2 = 0.80 + 0.20 * Math.sin(frame * 0.038 + 1.2);

        // ── Scene-wide warm glow ──
        var sc = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W,H)*0.75);
        sc.addColorStop(0,    'rgba(255,200,80,0.18)');
        sc.addColorStop(0.15, 'rgba(200,120,255,0.09)');
        sc.addColorStop(0.40, 'rgba(80,50,200,0.04)');
        sc.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = sc; ctx.fillRect(0,0,W,H);

        // ── Additive glow layer (screen blend) ──
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        var g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280*pulse);
        g1.addColorStop(0,   'rgba(255,230,120,0.55)');
        g1.addColorStop(0.3, 'rgba(200,120,255,0.20)');
        g1.addColorStop(0.7, 'rgba(80,60,200,0.05)');
        g1.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g1;
        ctx.beginPath(); ctx.arc(cx, cy, 280*pulse, 0, Math.PI*2); ctx.fill();

        ctx.restore();

        // ── Inner corona ──
        var g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90*pulse);
        g2.addColorStop(0,   'rgba(255,255,220,0.70)');
        g2.addColorStop(0.25,'rgba(255,225,100,0.45)');
        g2.addColorStop(0.6, 'rgba(200,100,255,0.15)');
        g2.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g2;
        ctx.beginPath(); ctx.arc(cx, cy, 90*pulse, 0, Math.PI*2); ctx.fill();

        // ── Bright core ──
        var g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28*pulse2);
        g3.addColorStop(0,   'rgba(255,255,255,1)');
        g3.addColorStop(0.4, 'rgba(255,255,240,0.85)');
        g3.addColorStop(0.8, 'rgba(255,230,150,0.30)');
        g3.addColorStop(1,   'rgba(255,200,80,0)');
        ctx.fillStyle = g3;
        ctx.beginPath(); ctx.arc(cx, cy, 28*pulse2, 0, Math.PI*2); ctx.fill();

        // ── Hot white pinpoint ──
        var g4 = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8*pulse2);
        g4.addColorStop(0, 'rgba(255,255,255,1)');
        g4.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g4;
        ctx.beginPath(); ctx.arc(cx, cy, 8*pulse2, 0, Math.PI*2); ctx.fill();

        // ── Cross lens flare (4 beams + 4 diagonals) ──
        var bLen = Math.min(W,H) * 0.60 * pulse;
        [0, Math.PI*0.5, Math.PI*0.25, Math.PI*0.75,
         Math.PI*0.125, Math.PI*0.375, Math.PI*0.625, Math.PI*0.875
        ].forEach(function(angle, idx) {
            var pri = idx < 4;
            var bA  = pri ? 0.24 : 0.09;
            var bW  = pri ? (idx < 2 ? 6 : 3) : 1.5;
            var len2 = pri ? bLen : bLen * 0.65;
            var g5 = ctx.createLinearGradient(
                cx-Math.cos(angle)*len2, cy-Math.sin(angle)*len2,
                cx+Math.cos(angle)*len2, cy+Math.sin(angle)*len2
            );
            g5.addColorStop(0,    'rgba(255,220,80,0)');
            g5.addColorStop(0.42, 'rgba(255,240,160,'+bA+')');
            g5.addColorStop(0.5,  'rgba(255,255,230,'+(bA*2.0)+')');
            g5.addColorStop(0.58, 'rgba(255,240,160,'+bA+')');
            g5.addColorStop(1,    'rgba(255,220,80,0)');
            ctx.save();
            ctx.strokeStyle = g5; ctx.lineWidth = bW;
            ctx.beginPath();
            ctx.moveTo(cx-Math.cos(angle)*len2, cy-Math.sin(angle)*len2);
            ctx.lineTo(cx+Math.cos(angle)*len2, cy+Math.sin(angle)*len2);
            ctx.stroke(); ctx.restore();
        });
    }

    /* ══════════════════════════════════════════════════════════
       MAIN LOOP
    ══════════════════════════════════════════════════════════ */
    function loop() {
        if (!alive) return;
        frame++;
        ctx.clearRect(0,0,W,H);

        drawBg();        // 1. deep space
        drawNebula();    // 2. colour nebula clouds
        drawAurora();    // 3. aurora waves
        drawGodRays();   // 4. light shafts
        drawGrid();      // 5. VR floor grid
        drawStars();     // 6. hyperspace warp streaks
        drawRings();     // 7. sacred expanding rings
        drawComets();    // 8. occasional comet streaks
        drawDust();      // 9. ambient floating dust
        drawSouls();     // 10. rising soul particles
        drawBloom();     // 11. divine centre bloom (always top)

        raf = requestAnimationFrame(loop);
    }

    /* ── CLEANUP ─────────────────────────────────────────────── */
    var splashEl = document.getElementById('site-splash');
    if (splashEl) {
        splashEl.addEventListener('transitionend', function () {
            if (splashEl.classList.contains('splash-hidden')) {
                alive = false; cancelAnimationFrame(raf);
            }
        });
    }
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) { alive = false; cancelAnimationFrame(raf); }
        else if (splashEl && !splashEl.classList.contains('splash-hidden')) { alive = true; loop(); }
    });
    window.addEventListener('resize', resize);

    resize();
    loop();
})();
