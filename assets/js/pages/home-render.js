(function () {
  function resolvePath(path) {
    return '/assets/data/' + path;
  }

  function resolveHref(href) {
    const raw = String(href || '').trim();
    if (!raw) return '#';
    if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(raw)) return raw;
    return raw;
  }

  function createSvgArrow() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M5 12h14M12 5l7 7-7 7');
    svg.appendChild(path);
    return svg;
  }

  function createCTA(label, href) {
    const link = document.createElement('a');
    link.className = 'spotlight-cta';
    link.href = resolveHref(href);
    const span = document.createElement('span');
    span.textContent = label || 'Learn more';
    link.appendChild(span);
    link.appendChild(createSvgArrow());
    return link;
  }

  function createStat(value, label) {
    const stat = document.createElement('div');
    stat.className = 'sstat';

    const num = document.createElement('span');
    num.className = 'sstat-num';
    num.textContent = value || '';

    const lab = document.createElement('span');
    lab.className = 'sstat-label';
    lab.textContent = label || '';

    stat.appendChild(num);
    stat.appendChild(lab);
    return stat;
  }

  function buildPipelineVisual() {
    return `
      <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="110" width="70" height="40" rx="8" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.6)" stroke-width="1.5"/>
        <text x="55" y="135" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="monospace">Plan</text>
        <path d="M90 130 L110 130" stroke="rgba(59,130,246,0.5)" stroke-width="1.5" marker-end="url(#arr)"/>
        <rect x="110" y="110" width="70" height="40" rx="8" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.6)" stroke-width="1.5"/>
        <text x="145" y="135" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="monospace">Build</text>
        <path d="M180 130 L200 130" stroke="rgba(59,130,246,0.5)" stroke-width="1.5"/>
        <rect x="200" y="110" width="70" height="40" rx="8" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.6)" stroke-width="1.5"/>
        <text x="235" y="135" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="monospace">Test</text>
        <path d="M270 130 L290 130" stroke="rgba(167,139,250,0.5)" stroke-width="1.5"/>
        <rect x="290" y="110" width="80" height="40" rx="8" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.6)" stroke-width="1.5"/>
        <text x="330" y="135" text-anchor="middle" fill="#34d399" font-size="11" font-family="monospace">Deploy</text>
        <circle class="flow-packet" cx="90" cy="130" r="4.5" fill="#60a5fa"/>
        <circle class="flow-packet flow-packet-2" cx="90" cy="130" r="3.5" fill="#34d399"/>
        <path d="M195 60 L205 55 L215 60 L215 72 L205 78 L195 72 Z" fill="rgba(59,130,246,0.2)" stroke="#60a5fa" stroke-width="1.5"/>
        <text x="205" y="70" text-anchor="middle" fill="#60a5fa" font-size="9">SEC</text>
        <rect x="40" y="180" width="120" height="60" rx="10" fill="rgba(15,23,42,0.8)" stroke="rgba(59,130,246,0.3)" stroke-width="1"/>
        <text x="100" y="200" text-anchor="middle" fill="#94a3b8" font-size="10">MTTR</text>
        <text x="100" y="225" text-anchor="middle" fill="#34d399" font-size="20" font-weight="bold">11 min</text>
        <rect x="230" y="180" width="120" height="60" rx="10" fill="rgba(15,23,42,0.8)" stroke="rgba(167,139,250,0.3)" stroke-width="1"/>
        <text x="290" y="200" text-anchor="middle" fill="#94a3b8" font-size="10">Coverage</text>
        <text x="290" y="225" text-anchor="middle" fill="#a78bfa" font-size="20" font-weight="bold">1,000+</text>
        <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="rgba(59,130,246,0.5)"/></marker></defs>
      </svg>`;
  }

  function buildNeuralVisual() {
    return `
      <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(99,102,241,0.08)" stroke-width="1"/>
        <line x1="0" y1="140" x2="400" y2="140" stroke="rgba(99,102,241,0.08)" stroke-width="1"/>
        <line x1="0" y1="210" x2="400" y2="210" stroke="rgba(99,102,241,0.08)" stroke-width="1"/>
        <circle cx="55" cy="80" r="16" fill="rgba(59,130,246,0.25)" stroke="#60a5fa" stroke-width="2"/>
        <text x="55" y="85" text-anchor="middle" fill="#93c5fd" font-size="9">IN</text>
        <circle cx="55" cy="140" r="16" fill="rgba(59,130,246,0.25)" stroke="#60a5fa" stroke-width="2"/>
        <text x="55" y="145" text-anchor="middle" fill="#93c5fd" font-size="9">SIG</text>
        <circle cx="55" cy="200" r="16" fill="rgba(59,130,246,0.25)" stroke="#60a5fa" stroke-width="2"/>
        <text x="55" y="205" text-anchor="middle" fill="#93c5fd" font-size="9">LOG</text>
        <circle cx="155" cy="60" r="16" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" stroke-width="2"/>
        <circle cx="155" cy="110" r="16" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" stroke-width="2"/>
        <circle cx="155" cy="160" r="16" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" stroke-width="2"/>
        <circle cx="155" cy="210" r="16" fill="rgba(167,139,250,0.25)" stroke="#a78bfa" stroke-width="2"/>
        <circle cx="255" cy="100" r="16" fill="rgba(52,211,153,0.25)" stroke="#34d399" stroke-width="2"/>
        <circle cx="255" cy="160" r="16" fill="rgba(52,211,153,0.25)" stroke="#34d399" stroke-width="2"/>
        <circle cx="345" cy="130" r="22" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" stroke-width="2.5"/>
        <text x="345" y="127" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">AI</text>
        <text x="345" y="141" text-anchor="middle" fill="#fbbf24" font-size="8">OPS</text>
        <line x1="71" y1="80" x2="139" y2="60" stroke="rgba(99,102,241,0.45)" stroke-width="1.5"/>
        <line x1="71" y1="80" x2="139" y2="110" stroke="rgba(99,102,241,0.45)" stroke-width="1.5"/>
        <line x1="71" y1="140" x2="139" y2="110" stroke="rgba(99,102,241,0.45)" stroke-width="1.5"/>
        <line x1="71" y1="140" x2="139" y2="160" stroke="rgba(99,102,241,0.45)" stroke-width="1.5"/>
        <line x1="71" y1="200" x2="139" y2="160" stroke="rgba(99,102,241,0.45)" stroke-width="1.5"/>
        <line x1="71" y1="200" x2="139" y2="210" stroke="rgba(99,102,241,0.45)" stroke-width="1.5"/>
        <line x1="171" y1="60" x2="239" y2="100" stroke="rgba(167,139,250,0.45)" stroke-width="1.5"/>
        <line x1="171" y1="110" x2="239" y2="100" stroke="rgba(167,139,250,0.45)" stroke-width="1.5"/>
        <line x1="171" y1="160" x2="239" y2="160" stroke="rgba(167,139,250,0.45)" stroke-width="1.5"/>
        <line x1="171" y1="210" x2="239" y2="160" stroke="rgba(167,139,250,0.45)" stroke-width="1.5"/>
        <line x1="271" y1="100" x2="323" y2="120" stroke="rgba(52,211,153,0.6)" stroke-width="2"/>
        <line x1="271" y1="160" x2="323" y2="140" stroke="rgba(52,211,153,0.6)" stroke-width="2"/>
        <rect x="10" y="235" width="105" height="34" rx="8" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.4)" stroke-width="1"/>
        <text x="62" y="250" text-anchor="middle" fill="#94a3b8" font-size="9">Anomaly Detect</text>
        <text x="62" y="263" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="700">Active</text>
        <rect x="145" y="235" width="110" height="34" rx="8" fill="rgba(167,139,250,0.12)" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
        <text x="200" y="250" text-anchor="middle" fill="#94a3b8" font-size="9">Policy Validation</text>
        <text x="200" y="263" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="700">Auto-enforced</text>
        <rect x="275" y="235" width="115" height="34" rx="8" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.4)" stroke-width="1"/>
        <text x="332" y="250" text-anchor="middle" fill="#94a3b8" font-size="9">Remediation</text>
        <text x="332" y="263" text-anchor="middle" fill="#34d399" font-size="10" font-weight="700">AI-Assisted</text>
      </svg>`;
  }

  function buildArticlesVisual() {
    return `
      <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="30" width="200" height="130" rx="12" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.5)" stroke-width="1.5"/>
        <rect x="58" y="50" width="140" height="10" rx="5" fill="rgba(59,130,246,0.5)"/>
        <rect x="58" y="70" width="110" height="7" rx="3" fill="rgba(59,130,246,0.3)"/>
        <rect x="58" y="84" width="130" height="7" rx="3" fill="rgba(59,130,246,0.25)"/>
        <rect x="58" y="98" width="95" height="7" rx="3" fill="rgba(59,130,246,0.2)"/>
        <rect x="58" y="118" width="60" height="22" rx="6" fill="rgba(59,130,246,0.25)" stroke="rgba(59,130,246,0.6)" stroke-width="1"/>
        <text x="88" y="133" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="700">Governance</text>
        <rect x="80" y="80" width="200" height="130" rx="12" fill="rgba(167,139,250,0.1)" stroke="rgba(167,139,250,0.5)" stroke-width="1.5"/>
        <rect x="88" y="100" width="140" height="10" rx="5" fill="rgba(167,139,250,0.5)"/>
        <rect x="88" y="120" width="110" height="7" rx="3" fill="rgba(167,139,250,0.3)"/>
        <rect x="88" y="134" width="130" height="7" rx="3" fill="rgba(167,139,250,0.25)"/>
        <rect x="88" y="148" width="60" height="22" rx="6" fill="rgba(167,139,250,0.25)" stroke="rgba(167,139,250,0.6)" stroke-width="1"/>
        <text x="118" y="163" text-anchor="middle" fill="#c4b5fd" font-size="9" font-weight="700">Platform Eng</text>
        <rect x="110" y="130" width="200" height="115" rx="12" fill="rgba(52,211,153,0.1)" stroke="rgba(52,211,153,0.5)" stroke-width="1.5"/>
        <rect x="118" y="150" width="140" height="10" rx="5" fill="rgba(52,211,153,0.5)"/>
        <rect x="118" y="170" width="110" height="7" rx="3" fill="rgba(52,211,153,0.3)"/>
        <rect x="118" y="184" width="130" height="7" rx="3" fill="rgba(52,211,153,0.25)"/>
        <rect x="118" y="200" width="60" height="22" rx="6" fill="rgba(52,211,153,0.25)" stroke="rgba(52,211,153,0.6)" stroke-width="1"/>
        <text x="148" y="215" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="700">AI-OPS</text>
        <rect x="328" y="50" width="62" height="26" rx="8" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.5)" stroke-width="1"/>
        <text x="359" y="67" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="600">Research</text>
        <rect x="332" y="100" width="58" height="26" rx="8" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.5)" stroke-width="1"/>
        <text x="361" y="117" text-anchor="middle" fill="#f87171" font-size="10" font-weight="600">Recognition</text>
        <rect x="328" y="150" width="62" height="26" rx="8" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.5)" stroke-width="1"/>
        <text x="359" y="167" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="600">Open KB</text>
        <rect x="330" y="200" width="60" height="26" rx="8" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.5)" stroke-width="1"/>
        <text x="360" y="217" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="600">10+ Posts</text>
      </svg>`;
  }

  function visualFor(type) {
    switch (type) {
      case 'neural': return buildNeuralVisual();
      case 'articles': return buildArticlesVisual();
      default: return buildPipelineVisual();
    }
  }

  function attachCarouselBehavior(carousel) {
    if (!carousel) return;
    const slides = Array.from(carousel.querySelectorAll('.spotlight-slide'));
    if (!slides.length) return;

    let current = 0;
    let timer = null;

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'carousel-dots';

    const dots = slides.map((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
      dot.dataset.target = String(index);
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dotsWrap.appendChild(dot);
      return dot;
    });

    carousel.appendChild(dotsWrap);

    function goTo(next) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = (next + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function stopAuto() {
      if (timer) clearInterval(timer);
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(() => goTo(current + 1), 5200);
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        stopAuto();
        goTo(parseInt(dot.dataset.target, 10) || 0);
        startAuto();
      });
    });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('touchstart', stopAuto, { passive: true });
    carousel.addEventListener('touchend', startAuto, { passive: true });
    startAuto();
  }

  async function loadJson(path) {
    const res = await fetch(resolvePath(path), { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load ' + path);
    return res.json();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const carousel = null;
    const khPreview = document.querySelector('.kh-preview');
    const spotlightSection = document.querySelector('#featured-spotlight .section-header');
    if (!carousel && !khPreview && !spotlightSection) return;

    try {
      const [home, blogIndex] = await Promise.all([
        loadJson('home-content.json'),
        loadJson('blog-index.json')
      ]);

      if (spotlightSection && home) {
        const title = spotlightSection.querySelector('.section-title');
        const subtitle = spotlightSection.querySelector('.section-subtitle');
        if (home.featuredTitle && title) title.textContent = home.featuredTitle;
        if (home.featuredSubtitle && subtitle) subtitle.textContent = home.featuredSubtitle;
      }

      if (carousel && home && Array.isArray(home.slides)) {
        carousel.innerHTML = '';
        home.slides.forEach((slide, index) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'spotlight-slide' + (index === 0 ? ' active' : '');
          wrapper.dataset.slide = String(index);

          const content = document.createElement('div');
          content.className = 'spotlight-content';

          const badge = document.createElement('div');
          badge.className = 'spotlight-badge';
          badge.textContent = slide.badge || '';

          const title = document.createElement('h3');
          title.textContent = slide.title || '';

          const desc = document.createElement('p');
          desc.textContent = slide.description || '';

          const stats = document.createElement('div');
          stats.className = 'spotlight-stats';
          (slide.stats || []).forEach((stat) => {
            stats.appendChild(createStat(stat.value, stat.label));
          });

          content.appendChild(badge);
          content.appendChild(title);
          content.appendChild(desc);
          content.appendChild(stats);
          content.appendChild(createCTA(slide.cta?.label || 'Learn more', slide.cta?.href || '#'));

          const visual = document.createElement('div');
          visual.className = 'spotlight-visual';
          visual.innerHTML = visualFor(slide.visual);

          wrapper.appendChild(content);
          wrapper.appendChild(visual);
          carousel.appendChild(wrapper);
        });
        attachCarouselBehavior(carousel);
      }

      if (khPreview && blogIndex && Array.isArray(blogIndex.posts)) {
        const ids = home?.knowledgePreview || [];
        const items = ids.map((item) => {
          const post = blogIndex.posts.find((p) => p.id === (item.id || ''));
          return post ? { ...post, ...item } : item;
        });

        khPreview.innerHTML = '';
        items.forEach((item) => {
          const card = document.createElement('div');
          card.className = 'kh-article-preview';

          const tag = document.createElement('div');
          tag.className = 'kh-art-tag';
          tag.textContent = item.type === 'latest' ? 'Latest' : 'Research';

          const title = document.createElement('h4');
          title.textContent = item.title || '';

          const desc = document.createElement('p');
          desc.textContent = item.description || '';

          const actions = Array.isArray(item.actions) && item.actions.length
            ? item.actions
            : [{ label: item.type === 'latest' ? 'Open item' : 'Read article', url: item.href || item.url || '#' }];

          const actionRow = document.createElement('div');
          actionRow.className = 'kh-article-actions';

          actions.forEach((action, actionIndex) => {
            const link = document.createElement('a');
            link.className = 'kh-link ' + (actionIndex === 0 ? 'kh-link--primary' : 'kh-link--secondary');
            link.href = resolveHref(action.url || item.href || item.url || '#');
            link.textContent = action.label || (actionIndex === 0 ? 'Read article' : 'Open');
            actionRow.appendChild(link);
          });

          card.appendChild(tag);
          card.appendChild(title);
          card.appendChild(desc);
          card.appendChild(actionRow);
          khPreview.appendChild(card);
        });
      }
    } catch (error) {
      console.warn('Home renderer failed:', error);
    }
  });
})();

