/* ============================================
   RAG 3D ARCHITECTURE DIAGRAM
   Interactive visualization for Knowledge, Tools, and Reasoning layers.
   ============================================ */

function initRag3D() {
    const container = document.getElementById('rag-3d-container');
    if (!container || typeof THREE === 'undefined') return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const diagramGroup = new THREE.Group();
    scene.add(diagramGroup);

    // Layer factory
    function createLayerPane(y, color) {
        const group = new THREE.Group();

        // Glass Pane
        const geometry = new THREE.BoxGeometry(8, 0.1, 5);
        const material = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.15,
            shininess: 100
        });
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

        // Frame
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.5
        }));
        group.add(line);

        // Grid on pane
        const grid = new THREE.GridHelper(7.5, 10, color, color);
        grid.material.opacity = 0.1;
        grid.material.transparent = true;
        grid.position.y = 0.06;
        group.add(grid);

        group.position.y = y;
        diagramGroup.add(group);
        return group;
    }

    // Create 3 layers
    const layerPos = [2.5, 0, -2.5];
    createLayerPane(layerPos[0], 0xa78bfa);  // Agent (Purple)
    createLayerPane(layerPos[1], 0x3b82f6);    // MCP (Blue)
    createLayerPane(layerPos[2], 0x34d399); // RAG (Green)

    // Data Stream Connectors (Vertical lines at corners)
    const cornerCoords = [[3.5, 2.2], [-3.5, 2.2], [3.5, -2.2], [-3.5, -2.2]];
    cornerCoords.forEach(coord => {
        const lineGeom = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(coord[0], layerPos[0], coord[1]),
            new THREE.Vector3(coord[0], layerPos[2], coord[1])
        ]);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.2
        });
        diagramGroup.add(new THREE.Line(lineGeom, lineMat));
    });

    // Data Flow Particles
    const particles = [];
    const pCount = 24;
    const pGeometry = new THREE.SphereGeometry(0.06, 8, 8);

    function resetParticle(p) {
        p.position.set((Math.random() - 0.5) * 6, -3.5, (Math.random() - 0.5) * 4);
        p.speed = 0.015 + Math.random() * 0.03;
    }

    for (let i = 0; i < pCount; i++) {
        const pMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
        const p = new THREE.Mesh(pGeometry, pMaterial);
        resetParticle(p);
        p.position.y = -4 + Math.random() * 8;
        diagramGroup.add(p);
        particles.push(p);
    }

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(hemiLight);
    const spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(5, 10, 5);
    scene.add(spotLight);

    camera.position.set(13, 8, 13);
    camera.lookAt(0, 0, 0);

    let targetRotY = -0.5, targetRotX = 0.2;

    function animate() {
        requestAnimationFrame(animate);
        diagramGroup.rotation.y += (targetRotY - diagramGroup.rotation.y) * 0.03;
        diagramGroup.rotation.x += (targetRotX - diagramGroup.rotation.x) * 0.04;
        particles.forEach(p => {
            p.position.y += p.speed;
            const isNear = layerPos.some(ly => Math.abs(p.position.y - ly) < 0.2);
            if (isNear) p.scale.set(2, 2, 2); else p.scale.set(1, 1, 1);
            if (p.position.y > 4) resetParticle(p);
        });
        renderer.render(scene, camera);
    }

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 1.8;
        targetRotX = ((e.clientY - rect.top) / rect.height - 0.5) * 1.0;
    });
    container.addEventListener('mouseleave', () => { targetRotY = -0.5; targetRotX = 0.2; });
    animate();
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
}
window.initRag3D = initRag3D;
