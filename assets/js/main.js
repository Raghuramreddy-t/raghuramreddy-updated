/* ============================================
   MAIN JAVASCRIPT - Portfolio Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTheme();
    initNavbar();
    initMobileNav();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initHeroOrbit();
    initCommandPalette();

    // Optional polish (you already wrote it but never called it)
    initMagneticButtons?.();

    // NEW: AI widget available on all pages
    initGlobalAIWidget();
});

// ============================================
// THEME MANAGEMENT
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        html.setAttribute('data-theme', 'dark');
    }
    
    themeToggle?.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition class
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, 100));
}

// ============================================
// MOBILE NAVIGATION
// ============================================
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu?.contains(e.target) && !navToggle?.contains(e.target)) {
            navMenu?.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    navMenu?.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SCROLL ANIMATIONS (AOS-like)
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Handle staggered children
                const delay = entry.target.dataset.aosDelay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0) scale(1)';
                }, parseInt(delay));
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// HERO ORBIT ANIMATION
// ============================================
function initHeroOrbit() {
  const orbits = document.querySelectorAll('.orbit');
  if (!orbits.length) return;

  orbits.forEach((orbit, idx) => {
    const words = Array.from(orbit.querySelectorAll('.orb-word'));
    if (!words.length) return;

    // Ellipse radii per ring (tuned for your CSS sizes)
    const isRing1 = orbit.classList.contains('orbit-1');
    const rx = isRing1 ? 200 : 250;   // horizontal radius
    const ry = isRing1 ? 105 : 135;   // vertical radius

    const centerX = orbit.offsetWidth / 2;
    const centerY = orbit.offsetHeight / 2;

    words.forEach((w, i) => {
      const t = (i / words.length) * Math.PI * 2;

      // ellipse placement
      const x = centerX + Math.cos(t) * rx;
      const y = centerY + Math.sin(t) * ry;

      w.style.left = `${x}px`;
      w.style.top = `${y}px`;

      // subtle depth: top items slightly brighter
      const depth = (Math.sin(t) + 1) / 2; // 0..1
      w.style.opacity = (0.65 + depth * 0.35).toFixed(2);

      // tiny float per word (offset animation without keyframes)
      w.style.animation = `wordBob ${3.5 + (i % 5) * 0.6}s ease-in-out ${(i * 0.12)}s infinite`;
    });
  });

  // Inject bob keyframes once
  if (!document.getElementById('wordBobStyle')) {
    const st = document.createElement('style');
    st.id = 'wordBobStyle';
    st.textContent = `
      @keyframes wordBob {
        0%,100% { transform: translate(-50%,-50%) translateY(0); }
        50% { transform: translate(-50%,-50%) translateY(-6px); }
      }
    `;
    document.head.appendChild(st);
  }
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ============================================
// CURSOR FOLLOWER (Optional)
// ============================================
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Scale on hover
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!valid) {
                e.preventDefault();
            }
        });
    });
}

// ============================================
// LAZY LOADING IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    });
}

// ============================================
// NOTIFICATION TOAST
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// UTILITY: Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// UTILITY: Throttle Function
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// COMMAND PALETTE (Evidence Assistant)
// ============================================
function initCommandPalette() {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'cmd-modal';
    modal.innerHTML = `
        <div class="cmd-content">
            <div class="cmd-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="cmd-input" placeholder="Search evidence, projects, or metrics..." autocomplete="off">
                <span class="cmd-esc">ESC</span>
            </div>
            <div class="cmd-results" id="cmd-results">
                <div class="cmd-empty">Type to search across projects, impact, and artifacts...</div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');

    // Search Index
    const searchIndex = [
        { title: "Project SHIELD", type: "Project", url: "pages/projects.html#shield", tags: "automation, security, reporting" },
        { title: "Upgrade Factory", type: "Project", url: "pages/projects.html#upgrade-factory", tags: "openshift, automation, platform" },
        { title: "Impact Dashboard", type: "Page", url: "pages/impact.html", tags: "metrics, roi, results" },
        { title: "Media Hub", type: "Resource", url: "pages/media-hub.html", tags: "pdf, templates, study packs" },
        { title: "XOps Operating Model", type: "Blog", url: "pages/blog.html", tags: "strategy, devops, culture" },
        { title: "OpenTelemetry Notes", type: "Download", url: "pages/media-hub.html", tags: "pdf, study, observability" },
        { title: "AI Governance", type: "System", url: "pages/ai-ops.html", tags: "safety, policy, copilot" }
    ];

    // Toggle Logic
    const toggleModal = (show) => {
        if (show) {
            modal.classList.add('active');
            input.focus();
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            input.value = '';
            results.innerHTML = '<div class="cmd-empty">Type to search across projects, impact, and artifacts...</div>';
            document.body.style.overflow = '';
        }
    };

    // Event Listeners
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleModal(true);
        }
        if (e.key === 'Escape') toggleModal(false);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) toggleModal(false);
    });

    // Search Logic
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (!query) {
            results.innerHTML = '<div class="cmd-empty">Type to search across projects, impact, and artifacts...</div>';
            return;
        }

        const filtered = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.tags.includes(query) ||
            item.type.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            results.innerHTML = '<div class="cmd-empty">No results found.</div>';
            return;
        }

        results.innerHTML = filtered.map(item => `
            <a href="${item.url}" class="cmd-item" onclick="document.querySelector('.cmd-modal').classList.remove('active')">
                <div class="cmd-item-content">
                    <span class="cmd-item-title">${item.title}</span>
                    <span class="cmd-item-tags">${item.tags}</span>
                </div>
                <span class="cmd-item-type">${item.type}</span>
            </a>
        `).join('');
    });
}

// ============================================
// GLOBAL AI WIDGET (RRR Assistant) - Injected on every page
// ============================================
function initGlobalAIWidget() {
    // Prevent duplicates
    if (document.getElementById('ai-fab') || document.getElementById('ai-panel')) return;

    // Brand controls (edit these only)
    const BRAND = {
        name: 'Ask Raghu',              // alt: 'RRR Assistant' / 'Raghu Intelligence'
        subtitle: 'Fast answers about my work',
        badge: 'RRR',
    };

    // Inject CSS once (so it works even if you don’t update main.css yet)
    if (!document.getElementById('ai-widget-styles')) {
        const style = document.createElement('style');
        style.id = 'ai-widget-styles';
        style.textContent = `
          .ai-fab {
            position: fixed; right: 18px; bottom: 18px; z-index: 9999;
            display: inline-flex; align-items: center; gap: 10px;
            padding: 14px 20px; border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.14);
            background: linear-gradient(135deg, rgba(var(--ai-accent), 1), rgba(var(--ai-accent-2), 1));
            color: #fff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.35), 0 0 0 6px rgba(var(--ai-accent), 0.10);
            cursor: pointer;
            font-weight: 700;
            font-size: 16px;
            letter-spacing: 0.2px;
            transition: transform 160ms ease, box-shadow 160ms ease;
          }
          .ai-fab:hover {
            transform: translateY(-1px);
            box-shadow: 0 14px 38px rgba(0,0,0,0.42), 0 0 0 8px rgba(var(--ai-accent), 0.14);
          }
          .ai-fab-badge {
            width: 34px; height: 34px; border-radius: 10px;
            display: grid; place-items: center;
            background: rgba(0,0,0,0.22);
            border: 1px solid rgba(255,255,255,0.16);
            font-family: "JetBrains Mono", monospace;
            font-size: 12px;
          }

          .ai-panel {
            position: fixed; right: 18px; bottom: 86px; z-index: 9999;
            width: 360px; height: 520px;
            background: rgba(17, 17, 24, 0.95);
            border: 1px solid rgba(255,255,255,0.14);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.45);
            backdrop-filter: blur(10px);
            overflow: hidden;
            transform: translateY(10px);
            opacity: 0;
            pointer-events: none;
            transition: 200ms ease;
          }
          .ai-panel.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: auto;
          }

          .ai-panel-header {
            display: flex; align-items: center; justify-content: space-between;
            padding: 14px 14px;
            border-bottom: 1px solid rgba(255,255,255,0.10);
          }
          .ai-title { display: flex; align-items: center; gap: 10px; }
          .ai-header-badge {
            width: 32px; height: 32px; border-radius: 8px;
            display: grid; place-items: center;
            background: linear-gradient(135deg, rgba(var(--ai-accent), 1), rgba(var(--ai-accent-2), 1));
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
            font-family: "JetBrains Mono", monospace;
            font-size: 12px;
            font-weight: 700;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          }
          .ai-title .dot {
            width: 10px; height: 10px; border-radius: 999px;
            background: rgba(var(--ai-accent), 1);
            box-shadow: 0 0 0 6px rgba(var(--ai-accent), 0.14);
          }
          .ai-title h4 {
            margin: 0; font-size: 14px; font-weight: 900;
            color: rgba(255,255,255,0.92);
          }
          .ai-title p {
            margin: 2px 0 0 0; font-size: 12px;
            color: rgba(255,255,255,0.60);
          }
          .ai-close {
            border: none; background: transparent;
            color: rgba(255,255,255,0.7);
            font-size: 18px; cursor: pointer;
          }

          .ai-chat { padding: 14px; height: calc(100% - 120px); overflow: auto; }

          .ai-welcome {
            padding: 14px;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,0.10);
            background: rgba(255,255,255,0.06);
            color: rgba(255,255,255,0.86);
            line-height: 1.5;
            font-size: 15px;
          }

          .ai-suggest {
            display: flex; flex-wrap: wrap; gap: 8px;
            margin-top: 12px;
          }
          .ai-chip {
            padding: 8px 10px;
            border-radius: 999px;
            background: rgba(var(--ai-accent), 0.16);
            border: 1px solid rgba(var(--ai-accent), 0.25);
            color: rgba(255,255,255,0.92);
            font-size: 13px;
            cursor: pointer;
            user-select: none;
          }
          .ai-chip:hover { background: rgba(var(--ai-accent), 0.22); }

          .ai-inputbar {
            display: flex; gap: 10px;
            padding: 12px 12px;
            border-top: 1px solid rgba(255,255,255,0.10);
          }
          .ai-inputbar input {
            flex: 1;
            padding: 12px 12px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.07);
            color: rgba(255,255,255,0.92);
            font-size: 15px;
            outline: none;
          }
          .ai-inputbar button {
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,0.14);
            background: linear-gradient(135deg, rgba(var(--ai-accent), 1), rgba(var(--ai-accent-2), 1));
            color: #fff;
            font-weight: 900;
            cursor: pointer;
          }

          .ai-msg { margin: 10px 0; display: flex; }
          .ai-msg.user { justify-content: flex-end; }
          .ai-bubble {
            max-width: 82%;
            padding: 10px 12px;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,0.10);
            font-size: 15px;
            line-height: 1.6;
            white-space: pre-wrap;
          }
          .ai-msg.user .ai-bubble {
            background: linear-gradient(135deg, rgba(var(--ai-accent), 0.95), rgba(var(--ai-accent-2), 0.95));
            color: #fff;
            border-color: rgba(255,255,255,0.12);
          }
          .ai-msg.bot .ai-bubble {
            background: rgba(255,255,255,0.06);
            color: rgba(255,255,255,0.88);
          }

          .ai-typing { display: inline-flex; gap: 5px; align-items: center; }
          .ai-typing span {
            width: 7px; height: 7px; border-radius: 50%;
            background: rgba(255,255,255,0.55);
            animation: aiBounce 1.2s ease-in-out infinite;
          }
          .ai-typing span:nth-child(2){ animation-delay: .15s; }
          .ai-typing span:nth-child(3){ animation-delay: .3s; }
          @keyframes aiBounce { 0%,100%{ transform: translateY(0); opacity: .5;} 50%{ transform: translateY(-4px); opacity: 1;} }
        `;
        document.head.appendChild(style);
    }

    // Inject HTML
    const html = `
      <button class="ai-fab" id="ai-fab" aria-label="${escapeHtml(BRAND.name)}">
        <span class="ai-fab-badge">${escapeHtml(BRAND.badge)}</span>
        <span>${escapeHtml(BRAND.name)}</span>
      </button>

      <div class="ai-panel" id="ai-panel" role="dialog" aria-label="${escapeHtml(BRAND.name)}">
        <div class="ai-panel-header">
          <div class="ai-title">
            <div class="ai-header-badge">${escapeHtml(BRAND.badge)}</div>
            <span class="dot"></span>
            <div>
              <h4>${escapeHtml(BRAND.name)}</h4>
              <p>${escapeHtml(BRAND.subtitle)}</p>
            </div>
          </div>
          <button class="ai-close" id="ai-close" aria-label="Close">✕</button>
        </div>

        <div class="ai-chat" id="ai-chat">
          <div class="ai-welcome">
            <b>Ask anything about my work.</b><br/>
            Try projects, platform engineering, DevSecOps, AI systems, or contact.
            <div class="ai-suggest">
              <span class="ai-chip" data-q="Top 3 projects and outcomes">Top projects</span>
              <span class="ai-chip" data-q="What is Project SHIELD?">Project SHIELD</span>
              <span class="ai-chip" data-q="What is your platform engineering approach?">Platform approach</span>
              <span class="ai-chip" data-q="How do you do AI safely in ops?">Safe AI</span>
            </div>
          </div>
        </div>

        <div class="ai-inputbar">
          <input id="ai-input" type="text" placeholder="Ask a question… (e.g., projects)" />
          <button id="ai-send">Send</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);

    // Wire up behavior
    const fab = document.getElementById('ai-fab');
    const panel = document.getElementById('ai-panel');
    const close = document.getElementById('ai-close');
    const chat = document.getElementById('ai-chat');
    const input = document.getElementById('ai-input');
    const send = document.getElementById('ai-send');

    function openPanel() {
        panel.classList.add('active');
        setTimeout(() => input?.focus(), 50);
    }
    function closePanel() {
        panel.classList.remove('active');
    }

    fab.addEventListener('click', openPanel);
    close.addEventListener('click', closePanel);

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !fab.contains(e.target)) closePanel();
    });

    // Suggested chips
    chat.querySelectorAll('.ai-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const q = chip.getAttribute('data-q');
            input.value = q;
            input.focus();
        });
    });

    // Local knowledge (simple now; later you can swap to GPT/local LLM)
    const KB = buildAIKnowledgeBase();

    // Dynamic Knowledge Loading (Blog)
    fetch('assets/data/blog-index.json')
        .then(res => res.json())
        .then(data => {
            if (data && data.posts) {
                const baseUrl = data.site?.baseUrl || window.location.origin;
                data.posts.forEach(post => {
                    // Construct a full, absolute URL to avoid broken relative links.
                    const fullUrl = post.url.startsWith('http') ? post.url : `${baseUrl}${post.url}`;
                    KB.push({
                        keywords: [
                            ...post.tags.map(t => t.toLowerCase()), 
                            ...post.title.toLowerCase().split(' ')
                        ],
                        response: `I found an article about that: "${post.title}".\n\nSummary: ${post.description}\n\nRead here: ${fullUrl}`
                    });
                });
            }
        }).catch(e => console.log('AI Blog Index load failed', e));

    function addMessage(text, who) {
        const wrap = document.createElement('div');
        wrap.className = `ai-msg ${who}`;
        const bubble = document.createElement('div');
        bubble.className = 'ai-bubble';
        bubble.textContent = text;
        wrap.appendChild(bubble);
        chat.appendChild(wrap);
        chat.scrollTop = chat.scrollHeight;
    }

    function showTyping() {
        const wrap = document.createElement('div');
        wrap.className = 'ai-msg bot';
        wrap.id = 'ai-typing';
        const bubble = document.createElement('div');
        bubble.className = 'ai-bubble';
        bubble.innerHTML = `<span class="ai-typing"><span></span><span></span><span></span></span>`;
        wrap.appendChild(bubble);
        chat.appendChild(wrap);
        chat.scrollTop = chat.scrollHeight;
    }

    function hideTyping() {
        const t = document.getElementById('ai-typing');
        if (t) t.remove();
    }

    function respond(query) {
        const lower = query.toLowerCase();

        for (const item of KB) {
            if (item.keywords.some(k => lower.includes(k))) return item.response;
        }

        return `I can answer questions about:
- Projects (SHIELD, Upgrade Factory, toolchain modernization)
- Platform engineering & OpenShift/Kubernetes
- DevSecOps & secure supply chain
- AI systems (safe, auditable, measurable)
- Contact & links

Try: "Top 3 projects and outcomes"`;
    }

    function sendMessage() {
        const msg = (input.value || '').trim();
        if (!msg) return;
        addMessage(msg, 'user');
        input.value = '';

        showTyping();
        setTimeout(() => {
            hideTyping();
            addMessage(respond(msg), 'bot');
        }, 450);
    }

    send.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Utility
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, s => ({
            '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
        }[s]));
    }
}

function buildAIKnowledgeBase() {
    // IMPORTANT: no broken "more" keyword; keep keywords as strings
    return [
        {
            keywords: ['project', 'projects', 'shield', 'upgrade factory', 'toolchain'],
            response:
`Top work highlights:
- Project SHIELD: automated reporting + early risk visibility (reduces surprises before CAB).
- Upgrade Factory: standardized platform/tool upgrades with safer execution patterns.
- Toolchain modernization: moving VM-based DevOps tools toward containerized/OpenShift-ready deployments.`
        },
        {
            keywords: ['platform', 'idp', 'backstage', 'openshift', 'kubernetes'],
            response:
`Platform engineering focus:
- Stable “golden paths” for teams (secure defaults, consistent delivery).
- OpenShift/Kubernetes operational patterns (standardization + guardrails).
- Self-service workflows that reduce ticket volume, not create more process.`
        },
        {
            keywords: ['devsecops', 'security', 'supply chain', 'sast', 'sca', 'xray', 'sonarqube'],
            response:
`DevSecOps approach:
- Shift-left checks (SAST/SCA) + policy gates
- Artifact integrity (signing/provenance where possible)
- Audit trails + evidence-by-design (no “trust me” releases).`
        },
        {
            keywords: ['ai', 'agents', 'copilot', 'llm', 'agentic'],
            response:
`Not AI for AI’s sake.
Every AI system I build follows three principles: safe-by-design, fully auditable, and measurable business value.
AI should enhance decision-making — not replace human judgment.`
        },
        {
            keywords: ['contact', 'linkedin', 'github', 'email'],
            response:
`Connect:
- LinkedIn: linkedin.com/in/raghuramreddy-t-9237901b3
- GitHub: github.com/Raghuramreddy-t
If you want email access, use the Contact page.`
        }
        ,
        {
            keywords: ['more', 'help', 'menu', 'options'],
            response: `I can help with:\n- Projects & Case Studies\n- Platform Engineering\n- DevSecOps\n- AI Systems\n- Contact Info\n\nJust type a topic!`
        }
    ];
}
