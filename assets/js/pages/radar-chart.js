/* ============================================
   ANIMATED SVG RADAR CHART
   index.html — skill proficiency visualization
   ============================================ */

(function() {
    const skills = [
        { name: 'Platform Eng',  value: 0.94, color: '#3b82f6' },
        { name: 'DevSecOps',     value: 0.91, color: '#8b5cf6' },
        { name: 'Cloud Arch',    value: 0.87, color: '#06b6d4' },
        { name: 'CI/CD',         value: 0.90, color: '#10b981' },
        { name: 'Observability', value: 0.85, color: '#f59e0b' },
        { name: 'Applied AI',    value: 0.82, color: '#ec4899' },
    ];

    const RINGS    = 4;
    const RADIUS   = 120;
    const LABEL_R  = 138;
    const N        = skills.length;
    const SVG_NS   = 'http://www.w3.org/2000/svg';

    function angleFor(i) {
        return (Math.PI * 2 * i) / N - Math.PI / 2;
    }

    function polar(r, angle) {
        return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
    }

    function initRadar() {
        const svg = document.getElementById('radar-svg');
        if (!svg) return;

        // --- Background rings ---
        for (let r = 1; r <= RINGS; r++) {
            const ring = document.createElementNS(SVG_NS, 'polygon');
            const pts = skills.map((_, i) => {
                const p = polar(RADIUS * (r / RINGS), angleFor(i));
                return `${p.x},${p.y}`;
            }).join(' ');
            ring.setAttribute('points', pts);
            ring.setAttribute('fill', 'none');
            ring.setAttribute('stroke', 'rgba(59,130,246,0.12)');
            ring.setAttribute('stroke-width', '1');
            svg.appendChild(ring);
        }

        // --- Axis lines ---
        skills.forEach((_, i) => {
            const end = polar(RADIUS, angleFor(i));
            const line = document.createElementNS(SVG_NS, 'line');
            line.setAttribute('x1', '0');
            line.setAttribute('y1', '0');
            line.setAttribute('x2', end.x.toFixed(2));
            line.setAttribute('y2', end.y.toFixed(2));
            line.setAttribute('stroke', 'rgba(59,130,246,0.15)');
            line.setAttribute('stroke-width', '1');
            svg.appendChild(line);
        });

        // --- Data polygon ---
        const dataPoly = document.createElementNS(SVG_NS, 'polygon');
        const finalPts = skills.map((s, i) => {
            const p = polar(RADIUS * s.value, angleFor(i));
            return `${p.x},${p.y}`;
        }).join(' ');

        dataPoly.setAttribute('points', skills.map((_, i) => '0,0').join(' ')); // start at center
        dataPoly.setAttribute('fill', 'rgba(59,130,246,0.12)');
        dataPoly.setAttribute('stroke', 'url(#radarGradient)');
        dataPoly.setAttribute('stroke-width', '2');
        dataPoly.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(dataPoly);

        // Gradient for stroke
        const defs = document.createElementNS(SVG_NS, 'defs');
        const grad = document.createElementNS(SVG_NS, 'linearGradient');
        grad.setAttribute('id', 'radarGradient');
        grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '100%');
        const s1 = document.createElementNS(SVG_NS, 'stop');
        s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#3b82f6');
        const s2 = document.createElementNS(SVG_NS, 'stop');
        s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', '#8b5cf6');
        grad.appendChild(s1); grad.appendChild(s2);
        defs.appendChild(grad);
        svg.insertBefore(defs, svg.firstChild);

        // --- Vertex dots ---
        const dots = skills.map((s, i) => {
            const dot = document.createElementNS(SVG_NS, 'circle');
            dot.setAttribute('r', '5');
            dot.setAttribute('cx', '0');
            dot.setAttribute('cy', '0');
            dot.setAttribute('fill', s.color);
            dot.setAttribute('stroke', 'var(--bg-primary,#0a0a0f)');
            dot.setAttribute('stroke-width', '2');
            svg.appendChild(dot);
            return dot;
        });

        // --- Labels ---
        skills.forEach((s, i) => {
            const lp = polar(LABEL_R, angleFor(i));
            const text = document.createElementNS(SVG_NS, 'text');
            text.setAttribute('x', lp.x.toFixed(2));
            text.setAttribute('y', lp.y.toFixed(2));
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            text.setAttribute('font-size', '11');
            text.setAttribute('font-family', 'Inter, sans-serif');
            text.setAttribute('font-weight', '500');
            text.setAttribute('fill', 'rgba(148,163,184,0.7)');
            text.textContent = s.name;
            svg.appendChild(text);
        });

        // --- Animate in when visible ---
        let animated = false;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                animateRadar(dataPoly, dots);
                observer.disconnect();
            }
        }, { threshold: 0.4 });
        observer.observe(svg);
    }

    function animateRadar(poly, dots) {
        const duration = 900;
        const start = performance.now();

        function frame(now) {
            const t = Math.min((now - start) / duration, 1);
            const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

            const pts = skills.map((s, i) => {
                const r = RADIUS * s.value * ease;
                const p = polar(r, angleFor(i));
                const dot = dots[i];
                dot.setAttribute('cx', p.x.toFixed(2));
                dot.setAttribute('cy', p.y.toFixed(2));
                return `${p.x.toFixed(2)},${p.y.toFixed(2)}`;
            }).join(' ');

            poly.setAttribute('points', pts);

            if (t < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRadar);
    } else {
        initRadar();
    }
})();
