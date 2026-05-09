/* ============================================
   MAIN JAVASCRIPT - Portfolio Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    ensureSharedBackgroundTheme();
    initTheme();
    initNavbar();
    injectArticleHeaderDate();
    ensureOperationalStandardsNavLink();
    normalizePrimaryNavOrder();
    initUISound();
    initSocialIcons();
    initMobileNav();
    initAutoPageAnimations();
    initScrollAnimations();
    initCounters();
    initSmoothScroll();
    initHeroOrbit();
    initCommandPalette();
    if (typeof initHero3D === 'function') initHero3D();
    if (typeof initRag3D === 'function') initRag3D();
    if (typeof initMagneticButtons === 'function') initMagneticButtons();
    initGlobalAIWidget();

    // V2 enhancements
    initScrollProgress();
    initScramble();
    initStatCounters();
    initTypewriter();
    initCardTilt();
    initReactBitsAdaptations();
    initSpotlightHover();

    // Wave 5 - Jeton-inspired animations
    initNavCharStagger();
    initWordReveal();
    initBtnRoll();
});

function injectArticleHeaderDate() {
    const header = document.querySelector('.page-header .page-header-content');
    if (!header) return;
    if (header.querySelector('.article-header-date, .card-tags')) return;

    const ldJsonScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const published = ldJsonScripts
        .map((script) => {
            try {
                return JSON.parse(script.textContent || 'null');
            } catch {
                return null;
            }
        })
        .find((data) => data && data.datePublished);

    if (!published || !published.datePublished) return;

    const date = new Date(String(published.datePublished) + 'T00:00:00Z');
    if (Number.isNaN(date.getTime())) return;

    const label = document.createElement('div');
    label.className = 'card-tags article-header-date';
    label.style.marginTop = '20px';
    label.style.justifyContent = 'center';

    const chip = document.createElement('span');
    chip.textContent = date.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
    label.appendChild(chip);

    const subtitle = header.querySelector('.page-subtitle');
    if (subtitle && subtitle.parentNode === header) {
        subtitle.insertAdjacentElement('afterend', label);
    } else {
        header.appendChild(label);
    }
}

function ensureOperationalStandardsNavLink() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;

    const hasLink = Array.from(navMenu.querySelectorAll('a.nav-link')).some((link) => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        return href.includes('operational-standards-library.html');
    });
    if (hasLink) return;

    const path = window.location.pathname.toLowerCase();
    const inPages = path.includes('/pages/');
    const inBlog = path.includes('/pages/blog/');
    const href = inBlog ? '../operational-standards-library.html' : (inPages ? 'operational-standards-library.html' : 'pages/operational-standards-library.html');

    const link = document.createElement('a');
    link.href = href;
    link.className = 'nav-link';
    // Keep the navbar compact; the full name is preserved for screen readers.
    link.textContent = 'Standards Library';
    link.setAttribute('aria-label', 'Operational Standards Library');
    if (path.endsWith('/operational-standards-library.html')) {
        link.classList.add('active');
    }

    navMenu.appendChild(link);
}

function normalizePrimaryNavOrder() {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;

    const links = Array.from(navMenu.querySelectorAll('a.nav-link'));
    if (!links.length) return;

    const scoreLink = (link) => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const text = (link.textContent || '').toLowerCase();
        if (href.includes('index') || text.includes('home')) return 0;
        if (href.includes('work') || text.includes('work')) return 1;
        if (href.includes('applied-ai-systems') || text.includes('applied ai')) return 2;
        if (href.includes('future-systems') || text.includes('future systems')) return 3;
        if (href.includes('operational-standards-library') || text.includes('operational standards')) return 4;
        if (href.includes('writing') || text.includes('writing')) return 5;
        if (href.includes('about') || text.includes('about')) return 6;
        if (href.includes('contact') || text.includes('contact')) return 7;
        return 99;
    };

    links
        .sort((a, b) => scoreLink(a) - scoreLink(b))
        .forEach((link) => navMenu.appendChild(link));
}

function resolveSitePath(path) {
    const raw = String(path || '').trim();
    if (!raw || /^(https?:|mailto:|tel:|data:|#|javascript:)/i.test(raw)) return raw;

    const cleanPath = raw.replace(/^\/+/, '');
    const depth = window.location.pathname.includes('/pages/blog/') ? '../../' :
        window.location.pathname.includes('/pages/') ? '../' : '';
    return depth + cleanPath;
}

function initSocialIcons() {
    const getSocialIconColor = () => {
        return document.documentElement.getAttribute('data-theme') === 'light'
            ? '4c1d95' : 'a5b4fc';
    };

    const buildIconMap = (color) => ({
        github: `https://api.iconify.design/mdi:github.svg?color=${color}`,
        linkedin: `https://api.iconify.design/mdi:linkedin.svg?color=${color}`,
        contact: `https://api.iconify.design/material-symbols:mail-outline-rounded.svg?color=${color}`
    });

    let iconMap = buildIconMap(getSocialIconColor());

    const fallbackSvg = (label) => {
        if (label === 'github') {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-4 1.5-4-2.5-5-3m10 6v-3.5c0-1 .1-1.4-.5-2 2.2-.2 4.5-1.1 4.5-5a3.9 3.9 0 0 0-1-2.7 3.6 3.6 0 0 0-.1-2.7s-.9-.3-2.9 1.1a10 10 0 0 0-5.2 0C6.8 2.3 5.9 2.6 5.9 2.6a3.6 3.6 0 0 0-.1 2.7A3.9 3.9 0 0 0 4.8 8c0 3.9 2.3 4.8 4.5 5-.5.5-.6 1.1-.5 2V22"/></svg>';
        }
        if (label === 'linkedin') {
            return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v2a4 4 0 0 1 2-3z"/><path d="M2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>';
        }
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16v16H4z"/><path d="M4 7l8 6 8-6"/></svg>';
    };

    // Footer icon buttons (replace contents).
    document.querySelectorAll('.footer .footer-icon-grid .icon-btn').forEach((btn) => {
        const label = (btn.getAttribute('aria-label') || '').toLowerCase();
        if (!iconMap[label]) return;

        btn.innerHTML = `<img class="icon-img" src="${iconMap[label]}" alt="${label} icon" loading="lazy" decoding="async">`;
        const img = btn.querySelector('img.icon-img');
        if (img) {
            img.addEventListener('error', () => {
                btn.innerHTML = fallbackSvg(label);
            }, { once: true });
        }
    });

    // Text links (prepend icons, keep text).
    document.querySelectorAll('a.social-pill, a.footer-link').forEach((el) => {
        if (el.querySelector('img.link-icon')) return;
        const label = (el.textContent || '').trim().toLowerCase();
        if (!iconMap[label]) return;

        const img = document.createElement('img');
        img.className = 'link-icon';
        img.src = iconMap[label];
        img.alt = `${label} icon`;
        img.loading = 'lazy';
        img.decoding = 'async';
        el.prepend(img);
        el.classList.add('has-link-icon');
    });
}

function refreshSocialIconColors() {
    const getSocialIconColor = () => {
        return document.documentElement.getAttribute('data-theme') === 'light'
            ? '4c1d95' : 'a5b4fc';
    };

    const buildIconUrl = (icon, color) => {
        const iconMap = {
            github: `https://api.iconify.design/mdi:github.svg?color=${color}`,
            linkedin: `https://api.iconify.design/mdi:linkedin.svg?color=${color}`,
            contact: `https://api.iconify.design/material-symbols:mail-outline-rounded.svg?color=${color}`
        };
        return iconMap[icon];
    };

    const color = getSocialIconColor();

    // Update footer icon buttons
    document.querySelectorAll('.footer .footer-icon-grid .icon-btn img.icon-img').forEach((img) => {
        const btn = img.closest('.icon-btn');
        const label = (btn?.getAttribute('aria-label') || '').toLowerCase();
        if (label) {
            img.src = buildIconUrl(label, color);
        }
    });

    // Update social pill icons
    document.querySelectorAll('a.social-pill img.link-icon, a.footer-link img.link-icon').forEach((img) => {
        const el = img.closest('a');
        const label = (el?.textContent || '').trim().toLowerCase();
        if (label) {
            img.src = buildIconUrl(label, color);
        }
    });
}

function initAutoPageAnimations() {
    const revealSelectors = [
        '.publication-card:not([data-aos])',
        '.project-card:not([data-aos])',
        '.future-card:not([data-aos])',
        '.ai-card:not([data-aos])',
        '.principle-card:not([data-aos])',
        '.education-card:not([data-aos])',
        '.evidence-card:not([data-aos])',
        '.system-card:not([data-aos])',
        '.contact-method:not([data-aos])',
        '.media-item:not([data-aos])'
    ];

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = document.querySelectorAll(revealSelectors.join(','));
    nodes.forEach((el, index) => {
        el.setAttribute('data-aos', reducedMotion ? 'fade-in' : 'fade-up');
        if (!reducedMotion) {
            el.setAttribute('data-aos-delay', String((index % 6) * 70));
        }
    });

    document.querySelectorAll('.section-header:not([data-aos])').forEach((header) => {
        header.setAttribute('data-aos', 'fade-up');
    });
}

function initUISound() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    let enabled = localStorage.getItem('rrr-ui-sound') === 'on';
    let ctx = null;
    let lastHoverAt = 0;

    function ensureCtx() {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        return ctx;
    }

    function tone(freq, duration, type, gainVal) {
        if (!enabled) return;
        const ac = ensureCtx();
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, ac.currentTime);
        gain.gain.setValueAtTime(0.0001, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(gainVal || 0.02, ac.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
        osc.connect(gain).connect(ac.destination);
        osc.start();
        osc.stop(ac.currentTime + duration + 0.02);
    }

    function updateButton(btn) {
        btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        btn.setAttribute('title', enabled ? 'Sound: On' : 'Sound: Off');
        btn.innerHTML = enabled
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H3v6h3l5 4V5z"></path><path d="M19 9a4 4 0 010 6"></path><path d="M16.5 6.5a8 8 0 010 11"></path></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H3v6h3l5 4V5z"></path><path d="M23 9l-6 6"></path><path d="M17 9l6 6"></path></svg>';
    }

    let btn = document.getElementById('ui-sound-toggle');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'ui-sound-toggle';
        btn.className = 'theme-toggle ui-sound-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Toggle UI sounds');
        navActions.insertBefore(btn, navActions.firstChild);
    }
    updateButton(btn);

    btn.addEventListener('click', () => {
        enabled = !enabled;
        localStorage.setItem('rrr-ui-sound', enabled ? 'on' : 'off');
        updateButton(btn);
        if (enabled) tone(660, 0.12, 'triangle', 0.03);
    });

    document.addEventListener('mouseover', (e) => {
        if (!enabled) return;
        const target = e.target.closest('a, button, .project-card, .evidence-card, .spotlight-slide');
        if (!target) return;
        const now = performance.now();
        if (now - lastHoverAt < 120) return;
        lastHoverAt = now;
        tone(420, 0.06, 'sine', 0.009);
    }, { passive: true });

    document.addEventListener('click', (e) => {
        if (!enabled) return;
        const target = e.target.closest('a, button, .project-card, .evidence-card, .spotlight-slide');
        if (!target) return;
        tone(780, 0.09, 'triangle', 0.02);
    }, { passive: true });
}

function ensureSharedBackgroundTheme() {
    if (!document.querySelector('.floating-orbs')) {
        const orbs = document.createElement('div');
        orbs.className = 'floating-orbs';
        orbs.innerHTML = '<div class="orb orb-1"></div><div class="orb orb-2"></div>';
        document.body.insertBefore(orbs, document.body.firstChild);
    }
    if (!document.getElementById('aurora-canvas')) {
        const canvas = document.createElement('canvas');
        canvas.id = 'aurora-canvas';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.insertBefore(canvas, document.body.firstChild);
    }
    const hasAuroraScript = Array.from(document.scripts).some((script) => (
        (script.getAttribute('src') || '').includes('/assets/js/aurora.js') ||
        (script.getAttribute('src') || '').includes('assets/js/aurora.js')
    ));
    if (!hasAuroraScript) {
        const script = document.createElement('script');
        const pageDepth = window.location.pathname.includes('/pages/blog/') ? '../../' :
            window.location.pathname.includes('/pages/') ? '../' : '';
        script.src = pageDepth + 'assets/js/aurora.js';
        script.defer = true;
        document.body.appendChild(script);
    }
}
// ============================================
// THEME MANAGEMENT
// ============================================
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Ensure saved theme applies even on pages that miss the inline bootstrap script.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
        html.setAttribute('data-theme', savedTheme);
    }

    themeToggle?.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Suppress transitions for a single frame so the swap is instant
        html.classList.add('no-transition');
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => html.classList.remove('no-transition'));
        });

        // Refresh social icon colors for new theme
        refreshSocialIconColors();
    });

    // Listen for system theme changes (only when user has no saved pref)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            html.classList.add('no-transition');
            html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => html.classList.remove('no-transition'));
            });
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
        anchor.addEventListener('click', function (e) {
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

    orbits.forEach((orbit) => {
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
        { title: "Impact Dashboard", type: "Page", url: "pages/work.html#impact", tags: "metrics, roi, results" },
        { title: "Operational Standards Library", type: "Resource", url: "pages/operational-standards-library.html", tags: "xops, standards, reliability, governance" },
        { title: "XOps Operating Model", type: "Page", url: "pages/operational-standards-library.html", tags: "xops, platform engineering, delivery, control" },
        { title: "Observability Standards", type: "Resource", url: "pages/operational-standards-library.html", tags: "observability, telemetry, signals, diagnostics" },
        { title: "AI Governance", type: "System", url: "pages/applied-ai-systems.html", tags: "safety, policy, copilot" },
        { title: "Why AI Fails Without Grounding", type: "Article", url: "pages/blog/rag-knowledge-systems.html", tags: "rag, mcp, agents, grounding, ai safety" }
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
            <a href="${resolveSitePath(item.url)}" class="cmd-item" onclick="document.querySelector('.cmd-modal').classList.remove('active')">
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
// GLOBAL AI WIDGET (Ask Raghu) - Crawls full site, answers from content
// ============================================
function initGlobalAIWidget() {
    if (document.getElementById('ai-fab') || document.getElementById('ai-panel')) return;

    const pagesToIndex = [
        'index.html',
        'pages/about.html',
        'pages/work.html',
        'pages/projects.html',
        'pages/platforms.html',
        'pages/applied-ai-systems.html',
        'pages/future-systems.html',
        'pages/impact.html',
        'pages/writing.html',
        'pages/contact.html',
        'pages/operational-standards-library.html',
        'pages/blog/rag-knowledge-systems.html',
        'pages/blog/devops-to-platform-engineering.html',
        'pages/blog/ci-cd-failures-at-scale.html',
        'pages/blog/secure-by-design-ci-cd.html',
        'pages/blog/toolchain-modernization.html',
        'pages/blog/xops-beyond-devops-2025.html',
        'pages/blog/ai-cicd-troubleshooter.html'
    ];

    if (!document.getElementById('ai-widget-styles')) {
        const style = document.createElement('style');
        style.id = 'ai-widget-styles';
        style.textContent = `
          /* Ask Raghu widget — site violet/blue palette */
          .ai-fab{position:fixed;right:24px;bottom:24px;z-index:9999;display:flex;align-items:center;gap:7px;border:none;border-radius:999px;padding:11px 20px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-weight:600;font-size:13px;font-family:inherit;cursor:pointer;box-shadow:0 4px 24px rgba(139,92,246,.4);transition:transform .2s,box-shadow .2s,opacity .2s}
          .ai-fab:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(139,92,246,.55);opacity:.92}
          .ai-fab svg{width:15px;height:15px;stroke:#fff;flex-shrink:0}
          .ai-panel{position:fixed;right:24px;bottom:80px;z-index:9999;width:420px;height:580px;display:none;grid-template-rows:auto 1fr auto auto;background:var(--bg-primary,#0a0a0f);border:1px solid rgba(139,92,246,.2);border-radius:20px;overflow:hidden;backdrop-filter:blur(32px);box-shadow:0 24px 64px rgba(0,0,0,.6),0 0 0 1px rgba(139,92,246,.08)}
          .ai-panel.active{display:grid}
          .ai-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid rgba(139,92,246,.15);background:linear-gradient(135deg,rgba(59,130,246,.07),rgba(139,92,246,.07))}
          .ai-head-left{display:flex;align-items:center;gap:9px}
          .ai-head-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:1px solid rgba(139,92,246,.45);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;font-weight:800;font-size:11px;letter-spacing:.08em;font-family:var(--font-mono,monospace)}
          .ai-title{font-weight:700;font-size:13.5px;color:var(--text-primary,#ccd6f6);letter-spacing:.01em}
          .ai-title em{display:block;color:var(--text-muted,#5d6b8a);font-style:normal;font-size:11px;font-weight:400;margin-top:1px}
          .ai-close{background:transparent;border:1px solid rgba(139,92,246,.2);color:var(--text-secondary,#8892b0);border-radius:8px;width:28px;height:28px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s;flex-shrink:0}
          .ai-close:hover{background:rgba(139,92,246,.15);color:#a78bfa}
          .ai-body{padding:14px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
          .ai-body::-webkit-scrollbar{width:4px}.ai-body::-webkit-scrollbar-track{background:transparent}.ai-body::-webkit-scrollbar-thumb{background:rgba(139,92,246,.25);border-radius:4px}
          .ai-msg{padding:11px 14px;border-radius:14px;font-size:13px;line-height:1.65;max-width:92%;white-space:pre-wrap;word-break:break-word}
          .ai-msg.bot{background:rgba(139,92,246,.07);color:var(--text-primary,#ccd6f6);border:1px solid rgba(139,92,246,.15);align-self:flex-start}
          .ai-msg.user{background:linear-gradient(135deg,rgba(59,130,246,.18),rgba(139,92,246,.18));color:#c4b5fd;border:1px solid rgba(139,92,246,.25);align-self:flex-end}
          .ai-suggestions{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}
          .ai-chip{background:transparent;border:1px solid rgba(139,92,246,.2);color:var(--text-secondary,#8892b0);border-radius:999px;padding:5px 12px;font-size:11.5px;font-family:inherit;cursor:pointer;transition:border-color .15s,color .15s,background .15s}
          .ai-chip:hover{border-color:rgba(139,92,246,.5);color:#a78bfa;background:rgba(139,92,246,.08)}
          .ai-foot{display:grid;grid-template-columns:1fr auto;gap:8px;padding:10px 14px;border-top:1px solid rgba(139,92,246,.12);background:rgba(0,0,0,.12)}
          .ai-input{border:1px solid rgba(139,92,246,.2);background:rgba(139,92,246,.05);color:var(--text-primary,#ccd6f6);border-radius:12px;padding:10px 14px;font-size:13px;font-family:inherit;outline:none;transition:border-color .2s;width:100%;box-sizing:border-box}
          .ai-input:focus{border-color:rgba(139,92,246,.5)}
          .ai-input::placeholder{color:var(--text-muted,#5d6b8a)}
          .ai-send{border:none;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border-radius:12px;padding:0 18px;cursor:pointer;font-weight:600;font-size:13px;font-family:inherit;white-space:nowrap;transition:opacity .2s,box-shadow .2s}
          .ai-send:hover{opacity:.88;box-shadow:0 4px 14px rgba(139,92,246,.4)}
          .ai-send:disabled{opacity:.35;cursor:not-allowed}
          [data-theme="light"] .ai-panel{background:#fafafe;border-color:rgba(139,92,246,.15);box-shadow:0 24px 64px rgba(0,0,0,.12)}
          [data-theme="light"] .ai-msg.bot{background:rgba(139,92,246,.05);color:#1e1b4b;border-color:rgba(139,92,246,.12)}
          [data-theme="light"] .ai-msg.user{background:linear-gradient(135deg,rgba(99,102,241,.12),rgba(139,92,246,.12));color:#5b21b6;border-color:rgba(99,102,241,.2)}
          [data-theme="light"] .ai-input{background:#f5f3ff;color:#1e1b4b;border-color:rgba(139,92,246,.2)}
          [data-theme="light"] .ai-chip{border-color:rgba(99,102,241,.2);color:#4c1d95}
          [data-theme="light"] .ai-foot{background:rgba(99,102,241,.03);border-top-color:rgba(99,102,241,.1)}
          @media(max-width:640px){.ai-panel{left:10px;right:10px;width:auto;height:70vh;bottom:72px}.ai-fab{right:14px;bottom:14px}}
        `;
        document.head.appendChild(style);
    }

    const fab = document.createElement('button');
    fab.id = 'ai-fab';
    fab.className = 'ai-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Ask Raghu');
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>Ask Raghu';

    const panel = document.createElement('section');
    panel.id = 'ai-panel';
    panel.className = 'ai-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Ask Raghu assistant');
    panel.innerHTML = `
      <div class="ai-head">
        <div class="ai-head-left">
          <div class="ai-head-icon">
            <span>RRR</span>
          </div>
          <div class="ai-title">Ask Raghu <em>Searches the full portfolio</em></div>
        </div>
        <button class="ai-close" type="button" aria-label="Close">&#10005;</button>
      </div>
      <div class="ai-body" id="ai-body"></div>
      <div class="ai-suggestions" id="ai-suggestions">
        <button class="ai-chip" type="button">Platform engineering work</button>
        <button class="ai-chip" type="button">AI systems built</button>
        <button class="ai-chip" type="button">DevSecOps experience</button>
        <button class="ai-chip" type="button">Publications &amp; research</button>
      </div>
      <div class="ai-foot">
        <input id="ai-input" class="ai-input" type="text" placeholder="Ask about projects, skills, publications\u2026" autocomplete="off" />
        <button id="ai-send" class="ai-send" type="button">Send</button>
      </div>
    `;

    document.body.appendChild(panel);
    document.body.appendChild(fab);

    const bodyEl = panel.querySelector('#ai-body');
    const inputEl = panel.querySelector('#ai-input');
    const sendBtn = panel.querySelector('#ai-send');
    const closeBtn = panel.querySelector('.ai-close');
    const suggestionsEl = panel.querySelector('#ai-suggestions');

    // Site content index: { page, title, sections: [{heading, text}] }
    const index = [];
    let indexed = false;
    let isLoading = false;

    function addMsg(text, who) {
        const div = document.createElement('div');
        div.className = `ai-msg ${who || 'bot'}`;
        div.textContent = text;
        bodyEl.appendChild(div);
        bodyEl.scrollTop = bodyEl.scrollHeight;
        return div;
    }

    function normalizePath(path) {
        return resolveSitePath(path);
    }

    function extractPageContent(html, page) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // Remove nav, footer, scripts
        doc.querySelectorAll('nav, footer, script, style, .ai-panel, .ai-fab').forEach((el) => el.remove());
        const title = (doc.querySelector('title')?.textContent || '').replace(/\|.*$/, '').trim();
        // Collect headings + following text as sections
        const sections = [];
        let currentHeading = title;
        let currentText = [];
        doc.querySelectorAll('h1, h2, h3, p, li').forEach((el) => {
            const tag = el.tagName.toLowerCase();
            const txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
            if (!txt || txt.length < 8) return;
            if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
                if (currentText.length) sections.push({ heading: currentHeading, text: currentText.join(' ') });
                currentHeading = txt;
                currentText = [];
            } else {
                currentText.push(txt);
            }
        });
        if (currentText.length) sections.push({ heading: currentHeading, text: currentText.join(' ') });
        if (!sections.length) return null;
        return { page, title, sections };
    }

    async function buildIndex() {
        if (indexed) return;
        const tasks = pagesToIndex.map(async (page) => {
            try {
                const res = await fetch(normalizePath(page), { cache: 'force-cache' });
                if (!res.ok) return;
                const html = await res.text();
                const parsed = extractPageContent(html, page);
                if (parsed) index.push(parsed);
            } catch (_) { /* cors / network */ }
        });
        await Promise.all(tasks);
        indexed = true;
    }

    // Score a doc against query terms, with heading matches weighted higher
    function scoreDoc(doc, terms) {
        let score = 0;
        for (const sec of doc.sections) {
            const hLow = sec.heading.toLowerCase();
            const tLow = sec.text.toLowerCase();
            for (const t of terms) {
                if (hLow.includes(t)) score += 3; // heading match = stronger signal
                const count = (tLow.match(new RegExp(t, 'g')) || []).length;
                score += count;
            }
        }
        return score;
    }

    // Find the most relevant sections within top docs
    function findRelevantSections(terms, topDocs) {
        const results = [];
        for (const doc of topDocs) {
            for (const sec of doc.sections) {
                const hay = (sec.heading + ' ' + sec.text).toLowerCase();
                const score = terms.reduce((s, t) => s + (hay.includes(t) ? hay.split(t).length - 1 : 0), 0);
                if (score > 0) results.push({ doc, sec, score });
            }
        }
        return results.sort((a, b) => b.score - a.score).slice(0, 4);
    }

    function answer(question) {
        const terms = question.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter((t) => t.length > 2 && !['the', 'and', 'are', 'for', 'that', 'this', 'with', 'from', 'have', 'what', 'who', 'how', 'does', 'did', 'can', 'his', 'about'].includes(t));

        if (!terms.length || !index.length) {
            return 'Ask me anything about this portfolio \u2014 work, projects, AI systems, publications, platforms, or contact.';
        }

        // Score all docs
        const scored = index
            .map((doc) => ({ doc, score: scoreDoc(doc, terms) }))
            .filter((x) => x.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 4);

        if (!scored.length) {
            return "I couldn\u2019t find that in the site content. Try keywords like: platform engineering, AI systems, DevSecOps, projects, publications, or contact.";
        }

        const topDocs = scored.map((x) => x.doc);
        const sections = findRelevantSections(terms, topDocs);

        if (!sections.length) {
            // Fallback: just return the first section of the top doc
            const fallback = topDocs[0].sections[0];
            return `${fallback.text.slice(0, 420).trim()}\n\n\u2014 ${topDocs[0].title}`;
        }

        // Build a coherent answer from the top sections
        const lines = sections.slice(0, 4).map((r) => {
            const snippet = r.sec.text.slice(0, 480).trim();
            return r.sec.heading !== r.doc.title
                ? `${r.sec.heading}:\n${snippet}`
                : snippet;
        });

        const sourceNames = [...new Set(topDocs.slice(0, 3).map((d) =>
            d.page.replace('pages/blog/', '').replace('pages/', '').replace('.html', '').replace('index', 'home')
        ))].join(', ');

        return `${lines.join('\n\n').slice(0, 900).trim()}\n\n\u2014 Sources: ${sourceNames}`;
    }

    async function onSend() {
        const q = inputEl.value.trim();
        if (!q || isLoading) return;
        addMsg(q, 'user');
        inputEl.value = '';
        if (suggestionsEl) suggestionsEl.style.display = 'none';
        isLoading = true;
        sendBtn.disabled = true;

        if (!indexed) {
            const wait = addMsg('Searching site\u2026', 'bot');
            await buildIndex();
            bodyEl.removeChild(wait);
        }

        addMsg(answer(q), 'bot');
        isLoading = false;
        sendBtn.disabled = false;
        inputEl.focus();
    }

    // Init
    addMsg("Hello! Welcome to Ask Raghu. What would you like to know about my work, projects, skills, or experience?", 'bot');
    buildIndex(); // pre-index in background silently

    fab.addEventListener('click', () => {
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) inputEl.focus();
    });
    closeBtn.addEventListener('click', () => panel.classList.remove('active'));
    sendBtn.addEventListener('click', onSend);
    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) onSend(); });

    // Suggestion chips
    if (suggestionsEl) {
        suggestionsEl.querySelectorAll('.ai-chip').forEach((chip) => {
            chip.addEventListener('click', () => {
                inputEl.value = chip.textContent;
                suggestionsEl.style.display = 'none';
                onSend();
            });
        });
    }
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function update() {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
}


// ============================================
// TYPEWRITER
// ============================================
function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const roles = [
        'Platform Engineering Lead',
        'DevSecOps Leader',
        'Enterprise Technology Leader',
        'Secure Software Delivery Expert',
        'AI-Augmented Operations Leader',
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pause = false;

    function tick() {
        const current = roles[roleIdx];

        if (pause) {
            pause = false;
            deleting = true;
            setTimeout(tick, 1400);
            return;
        }

        if (!deleting) {
            el.textContent = current.slice(0, ++charIdx);
            if (charIdx === current.length) {
                pause = true;
                setTimeout(tick, 80);
            } else {
                setTimeout(tick, 75);
            }
        } else {
            el.textContent = current.slice(0, --charIdx);
            if (charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                setTimeout(tick, 350);
            } else {
                setTimeout(tick, 42);
            }
        }
    }

    tick();
}

// ============================================
// STAT COUNTERS (evidence cards with suffix)
// ============================================
function initStatCounters() {
    const els = document.querySelectorAll('.stat-num[data-count-to]');
    if (!els.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.countTo, 10);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            let frame = 0;
            const total = 50;
            const step = setInterval(() => {
                frame++;
                const val = Math.round(target * (frame / total));
                el.textContent = prefix + val + suffix;
                if (frame >= total) {
                    el.textContent = prefix + target + suffix;
                    clearInterval(step);
                }
            }, 1600 / total);
            obs.unobserve(el);
        });
    }, { threshold: 0.4 });

    els.forEach(el => obs.observe(el));
}

// ============================================
// HERO NAME SCRAMBLE (react-bits style)
// ============================================
function initScramble() {
    const el = document.querySelector('.hero-line.line-1');
    if (!el) return;

    const finalText = el.textContent.trim();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
    const duration = 1200;
    const fps = 30;
    const totalFrames = Math.round(duration / (1000 / fps));
    let frame = 0;

    el.setAttribute('aria-label', finalText);

    const interval = setInterval(() => {
        const progress = frame / totalFrames;
        el.textContent = finalText.split('').map((char, i) => {
            if (char === ' ') return ' ';
            // each letter settles left-to-right: settled when progress > its threshold
            const threshold = (i / finalText.length) * 0.75;
            if (progress > threshold + 0.25) return char;
            return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        frame++;
        if (frame > totalFrames) {
            clearInterval(interval);
            el.textContent = finalText;
        }
    }, 1000 / fps);
}

// ============================================
// CARD 3D TILT
// ============================================
function initCardTilt() {
    const cards = document.querySelectorAll(
        '.capability-card, .system-card, .publication-card, .project-card, .ai-card, .principle-card, .education-card'
    );
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach(card => {
        card.classList.add('tilt-card');
        const glare = document.createElement('span');
        glare.className = 'rb-card-glare';
        card.appendChild(glare);

        card.addEventListener('mousemove', (e) => {
            if (prefersReducedMotion) return;
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.transform = `perspective(1200px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-10px)`;
            glare.style.opacity = '1';
            glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.22), rgba(255,255,255,0.01) 45%)`;

            // Parallax elements inside card
            const icon = card.querySelector('.card-icon, .ai-card-icon, .evidence-icon');
            const title = card.querySelector('h3');
            if (icon) icon.style.transform = `translateZ(40px) translateX(${dx * 5}px) translateY(${dy * 5}px)`;
            if (title) title.style.transform = `translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0)';
            glare.style.opacity = '0';
            const innerEls = card.querySelectorAll('.card-icon, .ai-card-icon, .evidence-icon, h3');
            innerEls.forEach(el => el.style.transform = 'translateZ(0)');
        });
    });
}

// ============================================
// REACTBITS-STYLE ADAPTATIONS (STATIC SITE)
// ============================================
function initReactBitsAdaptations() {
    initShinyText();
}

function initShinyText() {
    const targets = document.querySelectorAll('.gradient-text, .page-tag');
    if (!targets.length) return;

    targets.forEach(el => {
        if (el.dataset.rbShiny === '1') return;
        el.dataset.rbShiny = '1';
        el.classList.add('rb-shiny-text');
    });
}

function initSpotlightHover() {
    const targets = document.querySelectorAll(
        '.capability-card, .principle-card, .publication-card, .project-card, .ai-card, .about-impact-card, .timeline-content, .cert-card, .education-card, .future-card'
    );
    if (!targets.length) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    targets.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            el.style.setProperty('--mx', `${x}%`);
            el.style.setProperty('--my', `${y}%`);
        });
    });
}

// ============================================
// WAVE 5: JETON-INSPIRED NAV CHARACTER ROLL
// ============================================
function initNavCharStagger() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.charDone) return;
        link.dataset.charDone = '1';

        const text = link.textContent.trim();
        if (!text) return;

        // Preserve accessibility
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', text);
        }

        const wrap = document.createElement('span');
        wrap.className = 'nl-wrap';
        wrap.setAttribute('aria-hidden', 'true');

        const origRow = document.createElement('span');
        origRow.className = 'nl-row nl-row--orig';

        const dupeRow = document.createElement('span');
        dupeRow.className = 'nl-row nl-row--dupe';

        [...text].forEach((char, i) => {
            [origRow, dupeRow].forEach(row => {
                const s = document.createElement('span');
                s.className = 'nl-c';
                s.style.setProperty('--i', i);
                s.textContent = char === ' ' ? '\u00A0' : char;
                row.appendChild(s);
            });
        });

        wrap.appendChild(origRow);
        wrap.appendChild(dupeRow);
        link.textContent = '';
        link.appendChild(wrap);
    });
}

// ============================================
// WAVE 5: MASKED WORD REVEAL
// ============================================
function initWordReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll('.section-title, .page-title');
    if (!targets.length) return;

    const toObserve = [];

    targets.forEach(el => {
        if (el.dataset.rvDone) return;
        el.dataset.rvDone = '1';

        const nodes = Array.from(el.childNodes);
        el.innerHTML = '';
        let wordIdx = 0;

        nodes.forEach(node => {
            if (node.nodeType === 3) { // TEXT_NODE
                node.textContent.split(/(\s+)/).forEach(piece => {
                    if (!piece) return;
                    if (/^\s+$/.test(piece)) {
                        el.appendChild(document.createTextNode(piece));
                    } else {
                        el.appendChild(makeRvWord(piece, null, wordIdx++));
                    }
                });
            } else if (node.nodeType === 1) { // ELEMENT_NODE
                el.appendChild(makeRvWord(null, node.cloneNode(true), wordIdx++));
            }
        });

        toObserve.push(el);
    });

    function makeRvWord(text, childEl, idx) {
        const ww = document.createElement('span');
        ww.className = 'rv-word';
        ww.style.setProperty('--wi', idx);
        const inner = document.createElement('span');
        inner.className = 'rv-inner';
        if (childEl) inner.appendChild(childEl);
        else inner.textContent = text;
        ww.appendChild(inner);
        return ww;
    }

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-rv-visible', '1');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    toObserve.forEach(el => obs.observe(el));
}

// ============================================
// WAVE 5: CTA BUTTON TEXT ROLL
// ============================================
function initBtnRoll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.dataset.btnRollDone) return;
        btn.dataset.btnRollDone = '1';

        // Find the direct text span (not containing SVG, not inside SVG)
        const textSpan = Array.from(btn.children).find(
            c => c.tagName === 'SPAN' && c.textContent.trim() && !c.querySelector('svg')
        );
        if (!textSpan) return;

        const text = textSpan.textContent.trim();
        if (!text) return;

        // Replace span content with a roll-wrapper
        textSpan.textContent = '';
        textSpan.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-label', btn.getAttribute('aria-label') || text);

        const wrap = document.createElement('span');
        wrap.className = 'btn-inner-wrap';

        const orig = document.createElement('span');
        orig.className = 'btn-orig';
        orig.textContent = text;

        const dupe = document.createElement('span');
        dupe.className = 'btn-dupe';
        dupe.textContent = text;

        wrap.appendChild(orig);
        wrap.appendChild(dupe);
        textSpan.appendChild(wrap);
    });
}
