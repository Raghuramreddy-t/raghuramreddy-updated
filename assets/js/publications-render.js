/* ============================================
   PUBLICATIONS RENDERER
   Reads assets/data/publications.json and
   renders all sections dynamically.

   TO ADD CONTENT: Edit publications.json only.
   No HTML changes needed.
   ============================================ */

(function () {
    const isPagesDir = window.location.pathname.includes('/pages/');
    const dataPath = isPagesDir
        ? '../assets/data/publications.json'
        : 'assets/data/publications.json';

    fetch(dataPath)
        .then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(data => {
            renderPapers(data.papers   || []);
            renderAcademic(data.academic || []);
            renderPatents(data.patents  || []);
            renderArticles(data.articles || []);
        })
        .catch(err => {
            console.error('publications-render: failed to load data', err);
        });

    /* ── SVG Icons ─────────────────────────── */
    const ICONS = {
        paper: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>
                </svg>`,
        article: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path>
                  </svg>`,
        patent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                 </svg>`,
        arrow:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                 </svg>`
    };

    /* ── Helpers ────────────────────────────── */
    function esc(s) {
        return String(s ?? '')
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function safeUrl(url) {
        const s = String(url ?? '').trim();
        return /^(https?:\/\/|#)/i.test(s) ? s : '#';
    }

    function tagsHtml(tags) {
        if (!Array.isArray(tags) || !tags.length) return '';
        return `<div class="pub-tags">${tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>`;
    }

    function linkHtml(url, label) {
        const href = safeUrl(url);
        const external = href !== '#';
        return `<a href="${href}" class="project-link"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                    <span>${label}</span>${ICONS.arrow}
                </a>`;
    }

    function setHTML(id, html) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html || '<p class="pub-empty">Nothing here yet.</p>';
    }

    /* ── Papers ─────────────────────────────── */
    function renderPapers(items) {
        if (!items.length) {
            setHTML('papers-grid', '');
            return;
        }
        const html = items.map((p, i) => `
            <div class="publication-card" data-aos="fade-up"${i ? ` data-aos-delay="${i * 100}"` : ''}>
                <div class="publication-icon">${ICONS.paper}</div>
                <div class="publication-content">
                    <p class="publication-meta">${esc(p.type)}</p>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.description)}</p>
                    ${tagsHtml(p.tags)}
                    ${linkHtml(p.link, 'Read Paper')}
                </div>
            </div>`).join('');
        setHTML('papers-grid', html);
    }

    /* ── Academic ───────────────────────────── */
    function renderAcademic(items) {
        if (!items.length) return;
        const html = items.map(a => `
            <div class="publication-card" data-aos="fade-up">
                <div class="publication-content">
                    <p class="publication-meta">${esc(a.institution)}</p>
                    <h3>${esc(a.title)}</h3>
                    <p class="pub-role">${esc(a.role)}</p>
                    <p>${esc(a.description)}</p>
                    ${tagsHtml(a.tags)}
                </div>
            </div>`).join('');
        setHTML('academic-grid', html);
    }

    /* ── Patents ────────────────────────────── */
    function renderPatents(items) {
        if (!items.length) {
            setHTML('patents-grid',
                `<div class="pub-pending">
                    <div class="pub-pending-icon">${ICONS.patent}</div>
                    <h3>Patents Coming Soon</h3>
                    <p>Patent details are being prepared and will appear here once available.</p>
                </div>`);
            return;
        }
        const html = items.map((p, i) => `
            <div class="publication-card" data-aos="fade-up"${i ? ` data-aos-delay="${i * 100}"` : ''}>
                <div class="publication-icon">${ICONS.patent}</div>
                <div class="publication-content">
                    <p class="publication-meta">Patent${p.number ? ' &bull; ' + esc(p.number) : ''}</p>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.description)}</p>
                    ${p.link && p.link !== '#' ? linkHtml(p.link, 'View Patent') : ''}
                </div>
            </div>`).join('');
        setHTML('patents-grid', html);
    }

    /* ── Articles ───────────────────────────── */
    function renderArticles(items) {
        if (!items.length) return;
        const html = items.map((a, i) => `
            <div class="publication-card" data-aos="fade-up"${i ? ` data-aos-delay="${i * 100}"` : ''}>
                <div class="publication-icon">${ICONS.article}</div>
                <div class="publication-content">
                    <p class="publication-meta">${esc(a.outlet)}</p>
                    <h3>${esc(a.title)}</h3>
                    <p>${esc(a.description)}</p>
                    ${tagsHtml(a.tags)}
                    ${linkHtml(a.link, 'Read Article')}
                </div>
            </div>`).join('');
        setHTML('articles-grid', html);
    }
})();
