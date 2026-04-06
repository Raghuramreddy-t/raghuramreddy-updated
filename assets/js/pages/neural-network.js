/* ============================================
   NEURAL NETWORK CANVAS ANIMATION
   AI Ops page — animated inference visualization
   ============================================ */

(function() {
    function initNeuralNetwork(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animFrameId;
        let W, H;

        // ---- Layer definitions ----
        const layerDefs = [
            { count: 4, label: 'Input' },
            { count: 6, label: 'Hidden 1' },
            { count: 6, label: 'Hidden 2' },
            { count: 4, label: 'Output' },
        ];

        const COLORS = {
            node:        '#1e293b',
            nodeBorder:  'rgba(59, 130, 246, 0.55)',
            nodeBorderH: '#3b82f6',
            pulse:       ['#3b82f6', '#8b5cf6', '#06b6d4'],
            conn:        'rgba(59, 130, 246, 0.10)',
            connActive:  'rgba(59, 130, 246, 0.45)',
            label:       'rgba(148, 163, 184, 0.6)',
        };

        // ---- Nodes and connections ----
        let nodes = [];
        let connections = [];
        let pulses = [];

        function buildGraph() {
            nodes = [];
            connections = [];

            const layerXs = [];
            const padX = W * 0.12;
            const spacingX = (W - 2 * padX) / (layerDefs.length - 1);

            layerDefs.forEach((def, li) => {
                const x = padX + li * spacingX;
                const padY = H * 0.15;
                const spacingY = (H - 2 * padY) / (def.count - 1 || 1);
                layerXs.push(x);

                for (let ni = 0; ni < def.count; ni++) {
                    const y = def.count === 1 ? H / 2 : padY + ni * spacingY;
                    nodes.push({
                        x, y,
                        layer: li,
                        idx: ni,
                        r: W < 500 ? 10 : 13,
                        glow: 0,
                        glowColor: COLORS.pulse[0],
                    });
                }
            });

            // Build connections between consecutive layers
            let offset = 0;
            for (let li = 0; li < layerDefs.length - 1; li++) {
                const aCount = layerDefs[li].count;
                const bCount = layerDefs[li + 1].count;
                const aStart = offset;
                const bStart = offset + aCount;

                for (let ai = 0; ai < aCount; ai++) {
                    for (let bi = 0; bi < bCount; bi++) {
                        connections.push({
                            from: aStart + ai,
                            to:   bStart + bi,
                            active: 0,
                        });
                    }
                }
                offset += aCount;
            }
        }

        function launchPulse() {
            // Pick a random input node
            const inputCount = layerDefs[0].count;
            const startNode = Math.floor(Math.random() * inputCount);
            const color = COLORS.pulse[Math.floor(Math.random() * COLORS.pulse.length)];

            // Trace a path forward through layers
            const path = [startNode];
            let offset = 0;

            for (let li = 0; li < layerDefs.length - 1; li++) {
                const aCount = layerDefs[li].count;
                const bCount = layerDefs[li + 1].count;
                const aStart = offset;
                const bStart = offset + aCount;

                const currentLayerIdx = path[path.length - 1] - aStart;
                // Pick a random connection from this node to the next layer
                const nextIdx = Math.floor(Math.random() * bCount);
                path.push(bStart + nextIdx);
                offset += aCount;
            }

            // Create pulse object for each edge in the path
            for (let i = 0; i < path.length - 1; i++) {
                pulses.push({
                    from:  path[i],
                    to:    path[i + 1],
                    color,
                    t:      0,
                    delay:  i * 280,       // ms delay per layer
                    speed:  0.0018 + Math.random() * 0.001,
                    born:   performance.now(),
                    size:   3.5,
                });
            }
        }

        // Launch pulses periodically
        let lastPulse = 0;
        function maybelaunchPulse(now) {
            if (now - lastPulse > 420) {
                launchPulse();
                lastPulse = now;
            }
        }

        // ---- Drawing ----
        function drawConnections() {
            connections.forEach(conn => {
                const a = nodes[conn.from];
                const b = nodes[conn.to];
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = conn.active > 0 ? COLORS.connActive : COLORS.conn;
                ctx.lineWidth = conn.active > 0 ? 1.2 : 0.7;
                ctx.stroke();
                if (conn.active > 0) conn.active -= 0.02;
            });
        }

        function drawNodes() {
            nodes.forEach(node => {
                // Glow
                if (node.glow > 0) {
                    const g = ctx.createRadialGradient(node.x, node.y, node.r * 0.5, node.x, node.y, node.r * 2.8);
                    g.addColorStop(0, node.glowColor.replace(')', `, ${node.glow})`).replace('rgb', 'rgba'));
                    g.addColorStop(1, 'transparent');
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.r * 2.8, 0, Math.PI * 2);
                    ctx.fillStyle = g;
                    ctx.fill();
                    node.glow -= 0.025;
                }

                // Node fill
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
                ctx.fillStyle = COLORS.node;
                ctx.fill();

                // Border
                ctx.strokeStyle = node.glow > 0 ? node.glowColor : COLORS.nodeBorder;
                ctx.lineWidth = node.glow > 0 ? 2 : 1.2;
                ctx.stroke();

                // Inner dot
                ctx.beginPath();
                ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = node.glow > 0 ? node.glowColor : 'rgba(59,130,246,0.4)';
                ctx.fill();
            });
        }

        function drawPulses(now) {
            pulses = pulses.filter(p => {
                const elapsed = now - p.born - p.delay;
                if (elapsed < 0) return true;  // hasn't started yet
                p.t = Math.min(1, elapsed * p.speed * 60 / 1000 * (1000 / 16));
                // simpler: advance t by speed each frame
                p.t = Math.min(1, p.t + p.speed);

                const a = nodes[p.from];
                const b = nodes[p.to];
                const x = a.x + (b.x - a.x) * p.t;
                const y = a.y + (b.y - a.y) * p.t;

                // Highlight the connection it's traveling
                const conn = connections.find(c => c.from === p.from && c.to === p.to);
                if (conn) conn.active = 0.8;

                // Glow arriving node
                if (p.t >= 1) {
                    nodes[p.to].glow = 0.9;
                    nodes[p.to].glowColor = p.color;
                    return false; // done
                }

                // Draw the pulse dot
                const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 2.5);
                grd.addColorStop(0, p.color);
                grd.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.arc(x, y, p.size * 2.5, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                return true;
            });
        }

        function drawLabels() {
            let offset = 0;
            layerDefs.forEach((def, li) => {
                const firstNode = nodes[offset];
                const lastNode  = nodes[offset + def.count - 1];
                const x = firstNode.x;
                const y = lastNode.y + 28;

                ctx.font = `500 11px Inter, sans-serif`;
                ctx.fillStyle = COLORS.label;
                ctx.textAlign = 'center';
                ctx.fillText(def.label.toUpperCase(), x, y);
                offset += def.count;
            });
        }

        // ---- Resize ----
        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            W = canvas.width  = rect.width  || 640;
            H = canvas.height = rect.height || 320;
            buildGraph();
        }

        // ---- Loop ----
        function loop() {
            const now = performance.now();
            ctx.clearRect(0, 0, W, H);
            maybelaunchPulse(now);
            drawConnections();
            drawPulses(now);
            drawNodes();
            drawLabels();
            animFrameId = requestAnimationFrame(loop);
        }

        window.addEventListener('resize', () => {
            resize();
        });

        resize();
        loop();

        // Pause when tab hidden (saves resources)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animFrameId);
            } else {
                loop();
            }
        });
    }

    // Auto-init on DOMContentLoaded or immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initNeuralNetwork('neural-canvas'));
    } else {
        initNeuralNetwork('neural-canvas');
    }
})();
