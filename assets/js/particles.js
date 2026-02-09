/* ============================================
   PARTICLES - Floating Background Effect
   ============================================ */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: null, y: null, radius: 150 };
        this.colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#6366f1'];
        
        this.init();
        this.animate();
        this.handleResize();
        this.handleMouse();
    }
    
    init() {
        this.resize();
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.colors));
        }
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }
    
    handleMouse() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    connectParticles() {
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a + 1; b < this.particles.length; b++) {
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 1 - distance / 150;
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });
        
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvas, colors) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
    }
    
    update(mouse) {
        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1;
        
        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                this.x -= forceDirectionX * force * this.density * 0.1;
                this.y -= forceDirectionY * force * this.density * 0.1;
            }
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particles-canvas');
});

// ============================================
// FLOATING SHAPES - Additional Visual Effect
// ============================================
class FloatingShapes {
    constructor() {
        this.container = document.querySelector('.floating-orbs');
        if (!this.container) return;
        
        this.shapes = [];
        this.init();
    }
    
    init() {
        // Shapes are handled by CSS, but we can add dynamic ones here
        this.addDynamicShapes();
    }
    
    addDynamicShapes() {
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'dynamic-shape';
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 100 + 50}px;
                height: ${Math.random() * 100 + 50}px;
                background: rgba(59, 130, 246, ${Math.random() * 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                filter: blur(40px);
                animation: float ${15 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${-Math.random() * 10}s;
            `;
            this.container.appendChild(shape);
        }
    }
}

// Initialize floating shapes
document.addEventListener('DOMContentLoaded', () => {
    new FloatingShapes();
});

// ============================================
// GRADIENT MESH - Advanced Background
// ============================================
class GradientMesh {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createGradient() {
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2 + Math.sin(this.time) * 200,
            this.canvas.height / 2 + Math.cos(this.time) * 200,
            0,
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.canvas.width
        );
        
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
        gradient.addColorStop(1, 'transparent');
        
        return gradient;
    }
    
    animate() {
        this.time += 0.01;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = this.createGradient();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// HERO PARTICLES - Specific Hero Section Effect
// ============================================
class HeroParticles {
    constructor() {
        this.canvas = document.getElementById('hero-particles');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['rgba(59, 130, 246, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(236, 72, 153, 0.5)'];
        this.mouse = { x: null, y: null, radius: 100 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && 
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            } else {
                this.mouse.x = null;
                this.mouse.y = null;
            }
        });
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    init() {
        this.particles = [];
        // Density calculation
        const particleCount = Math.floor(this.canvas.width * this.canvas.height / 12000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedY: Math.random() * 0.5 + 0.2,
                speedX: Math.random() * 0.4 - 0.2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                alpha: Math.random() * 0.5 + 0.1,
                density: Math.random() * 20 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            // Mouse interaction
            if (this.mouse.x != null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const directionX = forceDirectionX * force * p.density * 0.6;
                    const directionY = forceDirectionY * force * p.density * 0.6;
                    
                    p.x -= directionX;
                    p.y -= directionY;
                }
            }

            p.y -= p.speedY;
            p.x += p.speedX;
            
            // Reset if out of bounds (rising up)
            if (p.y < -10) {
                p.y = this.canvas.height + 10;
                p.x = Math.random() * this.canvas.width;
            }
            
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeroParticles();
});
