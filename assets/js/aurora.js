/* ============================================
   AURORA.JS - Premium Visual Effects
   Portfolio: Raghuramreddy Thummalapalli

   Contains:
   1. Antigravity particle field (mouse-ring effect)
   2. Cursor spotlight glow
   3. Text scramble reveal
   4. Star particle field
   5. Section word-reveal on scroll
   ============================================ */

/* --------------------------------------------
   1. ANTIGRAVITY PARTICLE FIELD
   Particles drift freely. When the mouse is
   near, they form an animated wave-ring around
   the cursor - inspired by reactbits.dev
   -------------------------------------------- */
(function initAntigravity() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, t = 0;

    // Config
    const COUNT          = 260;
    const MAGNET_RADIUS  = 160;   // px - pull-in zone
    const RING_RADIUS    = 80;    // px - ring size around cursor
    const WAVE_SPEED     = 0.018;
    const WAVE_AMP       = 18;    // px wave amplitude on ring
    const LERP_SPEED     = 0.055;
    const PULSE_SPEED    = 0.04;
    const PARTICLE_SIZE  = 1.6;
    const DRIFT_SPEED    = 0.28;

    let mouse = { x: W / 2, y: H / 2, active: false };
    let autoX = 0, autoY = 0;
    let lastMove = 0;
    const particles = [];

    function isDark() {
        return document.documentElement.getAttribute('data-theme') !== 'light';
    }

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function mkParticle() {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.6 + 0.2) * DRIFT_SPEED;
        const rOffset = (Math.random() - 0.5) * 30;
        return {
            // world position
            x:  Math.random() * (W || 1200),
            y:  Math.random() * (H || 800),
            // drift velocity
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            // current rendered position (lerp target)
            cx: 0, cy: 0,
            // per-particle variance
            phase:   Math.random() * Math.PI * 2,
            rOffset: rOffset,
            size:    Math.random() * 0.8 + 0.6,
        };
    }

    function init() {
        particles.length = 0;
        for (let i = 0; i < COUNT; i++) {
            const p = mkParticle();
            p.cx = p.x;
            p.cy = p.y;
            particles.push(p);
        }
    }

    function lerp(a, b, s) { return a + (b - a) * s; }

    function draw() {
        t++;
        ctx.clearRect(0, 0, W, H);

        // Auto-animate cursor when idle > 2.5s
        const now = Date.now();
        let mx = mouse.x, my = mouse.y;
        if (now - lastMove > 2500) {
            const at = now / 1000;
            autoX = W * 0.5 + Math.sin(at * 0.4) * W * 0.22;
            autoY = H * 0.5 + Math.cos(at * 0.55) * H * 0.18;
            mx = autoX; my = autoY;
        }

        const dark = isDark();
        const baseColor = dark ? [139, 92, 246] : [99, 102, 241];

        particles.forEach((p) => {
            // Drift
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -20) p.x = W + 20;
            if (p.x > W + 20) p.x = -20;
            if (p.y < -20) p.y = H + 20;
            if (p.y > H + 20) p.y = -20;

            // Distance to mouse
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let tx = p.x, ty = p.y;

            if (dist < MAGNET_RADIUS) {
                // Pull into ring
                const angle = Math.atan2(dy, dx);
                const wave  = Math.sin(t * WAVE_SPEED * 60 + angle * 2 + p.phase) * WAVE_AMP;
                const r     = RING_RADIUS + wave + p.rOffset * 0.3;
                tx = mx + Math.cos(angle) * r;
                ty = my + Math.sin(angle) * r;
            }

            // Lerp current position toward target
            p.cx = lerp(p.cx, tx, LERP_SPEED);
            p.cy = lerp(p.cy, ty, LERP_SPEED);

            // Pulse size based on proximity
            const proximity = Math.max(0, 1 - dist / MAGNET_RADIUS);
            const pulse = 1 + Math.sin(t * PULSE_SPEED * 60 + p.phase) * 0.3 * proximity;
            const r = p.size * PARTICLE_SIZE * (1 + proximity * 0.8) * pulse;

            // Alpha: brighter when in ring
            const alpha = dark
                ? 0.25 + proximity * 0.65
                : 0.15 + proximity * 0.55;

            ctx.beginPath();
            ctx.arc(p.cx, p.cy, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${baseColor[0]},${baseColor[1]},${baseColor[2]},${alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    resize();
    init();
    window.addEventListener('resize', () => { resize(); init(); }, { passive: true });

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
        lastMove = Date.now();
    }, { passive: true });

    document.addEventListener('mouseleave', () => { mouse.active = false; });

    draw();
})();


/* --------------------------------------------
   2. CURSOR SPOTLIGHT GLOW
   A soft radial gradient follows the cursor
   -------------------------------------------- */
(function initCursorSpotlight() {
    const isMobile = () => window.matchMedia('(hover: none)').matches;
    if (isMobile()) return;

    const el = document.createElement('div');
    el.id = 'cursor-spotlight';
    el.setAttribute('aria-hidden', 'true');
    document.body.appendChild(el);

    let mx = -9999, my = -9999;
    let cx = -9999, cy = -9999;
    let visible = false;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!visible) { visible = true; el.style.opacity = '1'; }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        visible = false;
        el.style.opacity = '0';
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
        cx = lerp(cx, mx, 0.08);
        cy = lerp(cy, my, 0.08);
        el.style.transform = `translate(${cx}px, ${cy}px)`;
        requestAnimationFrame(tick);
    }
    tick();
})();


/* --------------------------------------------
   3. TEXT SCRAMBLE REVEAL
   Random characters cycle before settling on
   the real text. Triggered on page load.
   -------------------------------------------- */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        this._update = this._update.bind(this);
    }

    run(text) {
        this._queue = [...text].map((to, i) => ({
            to,
            start: Math.floor(i * 1.2),
            end:   Math.floor(i * 1.2) + Math.floor(Math.random() * 10) + 6,
            char:  '',
        }));
        cancelAnimationFrame(this._raf);
        this._frame = 0;
        this._update();
    }

    _update() {
        let out = '';
        let done = 0;
        this._queue.forEach((q) => {
            if (this._frame >= q.end) {
                done++;
                out += q.to;
            } else if (this._frame >= q.start) {
                if (!q.char || Math.random() < 0.3) {
                    q.char = this.chars[Math.floor(Math.random() * this.chars.length)];
                }
                out += `<span class="scramble-ghost">${q.char}</span>`;
            } else {
                out += q.to === ' ' ? ' ' : '&nbsp;';
            }
        });
        this.el.innerHTML = out;
        if (done < this._queue.length) {
            this._raf = requestAnimationFrame(this._update);
            this._frame++;
        }
    }
}

(function initScramble() {
    function run() {
        const el = document.querySelector('.hero-line.line-1');
        if (!el) return;
        if (document.body.classList.contains('home-page')) return;
        const text = el.textContent.trim();
        if (!text) return;

        setTimeout(() => {
            const s = new TextScramble(el);
            s.run(text);
        }, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();


/* --------------------------------------------
   4. STAR PARTICLE FIELD
   Tiny twinkling stars float upward - dark mode
   -------------------------------------------- */
(function initStarField() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H;
    const STARS = [];
    const COUNT = 55;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        W = canvas.width  = rect.width  || window.innerWidth;
        H = canvas.height = rect.height || window.innerHeight;
    }

    function mkStar() {
        return {
            x:     Math.random() * W,
            y:     Math.random() * H,
            r:     Math.random() * 1.4 + 0.3,
            a:     Math.random(),
            speed: Math.random() * 0.25 + 0.08,
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
        };
    }

    function init() {
        resize();
        STARS.length = 0;
        for (let i = 0; i < COUNT; i++) STARS.push(mkStar());
    }

    window.addEventListener('resize', () => { resize(); }, { passive: true });

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        if (!isDark) { requestAnimationFrame(draw); return; }

        STARS.forEach((s) => {
            s.y  -= s.speed;
            s.twinkle += s.twinkleSpeed;
            const alpha = s.a * (0.5 + 0.5 * Math.sin(s.twinkle));

            if (s.y < -4) {
                s.y = H + 4;
                s.x = Math.random() * W;
            }

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#a5b4fc';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    init();
    draw();
})();


/* --------------------------------------------
   5. SECTION WORD-REVEAL ON SCROLL
   Section subtitles split into words that
   stagger in as you scroll past
   -------------------------------------------- */
(function initWordReveal() {
    function prepare() {
        const targets = document.querySelectorAll('.section-subtitle, .section-tag');
        targets.forEach((el) => {
            if (el.dataset.wordRevealDone) return;
            el.dataset.wordRevealDone = '1';

            const words = el.textContent.split(/\s+/).filter(Boolean);
            el.innerHTML = words.map((w, i) =>
                `<span class="wr-word" style="--wr-delay:${i * 55}ms">${w}</span>`
            ).join(' ');
            el.classList.add('word-reveal-container');
        });

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('wr-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.word-reveal-container').forEach((el) => io.observe(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', prepare);
    } else {
        prepare();
    }
})();


