/* ============================================
   MEDIA HUB RENDERER
   Fetches media.json and renders cards dynamically
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const downloadsGrid = document.getElementById('downloads-grid');
    const visualsGrid = document.getElementById('visuals-grid');

    if (!downloadsGrid && !visualsGrid) return;

    // Determine path to data based on current location
    const isPagesDir = window.location.pathname.includes('/pages/');
    const dataPath = isPagesDir ? '../assets/data/media.json' : 'assets/data/media.json';

    fetch(dataPath)
        .then(response => response.json())
        .then(data => {
            renderMedia(data, downloadsGrid, visualsGrid);
        })
        .catch(err => console.error('Error loading media data:', err));
});

function renderMedia(items, downloadsContainer, visualsContainer) {
    const downloadsFrag = document.createDocumentFragment();
    const visualsFrag = document.createDocumentFragment();

    items.forEach((item, index) => {
        const card = createMediaCard(item, index);
        if (!card) return;

        if (item.category === 'Downloads') {
            downloadsFrag.appendChild(card);
        } else if (item.category === 'Visuals') {
            visualsFrag.appendChild(card);
        }
    });

    if (downloadsContainer) downloadsContainer.appendChild(downloadsFrag);
    if (visualsContainer) visualsContainer.appendChild(visualsFrag);
}

function createMediaCard(item, index) {
    const icon = getIconForType(item.type);

    const safeHref = (href) => {
        const raw = String(href || '').trim();
        if (!raw) return '#';
        try {
            const u = new URL(raw, window.location.origin);
            const proto = (u.protocol || '').toLowerCase();
            if (proto === 'http:' || proto === 'https:') return u.href;
        } catch (_) {}
        return '#';
    };

    // Different layout for Visuals vs Downloads based on existing HTML structure.
    if (item.category === 'Visuals') {
        const card = document.createElement('div');
        card.className = 'publication-card';

        const iconWrap = document.createElement('div');
        iconWrap.className = 'publication-icon';
        // Icons are internal fixed SVG strings, not user-provided HTML.
        iconWrap.innerHTML = icon;

        const content = document.createElement('div');
        content.className = 'publication-content';

        const title = document.createElement('h3');
        title.textContent = item.title || '';

        const desc = document.createElement('p');
        desc.textContent = item.description || '';

        const link = document.createElement('a');
        link.className = 'project-link';
        link.href = safeHref(item.link);

        const linkLabel = document.createElement('span');
        linkLabel.textContent = 'View Diagram';
        link.appendChild(linkLabel);

        const arrow = document.createElement('svg');
        arrow.setAttribute('viewBox', '0 0 24 24');
        arrow.setAttribute('fill', 'none');
        arrow.setAttribute('stroke', 'currentColor');
        arrow.setAttribute('stroke-width', '2');
        arrow.setAttribute('aria-hidden', 'true');
        arrow.setAttribute('focusable', 'false');
        arrow.innerHTML = '<path d="M5 12h14M12 5l7 7-7 7"></path>';
        link.appendChild(arrow);

        content.appendChild(title);
        content.appendChild(desc);
        content.appendChild(link);

        card.appendChild(iconWrap);
        card.appendChild(content);
        return card;
    }

    // Downloads layout.
    const card = document.createElement('div');
    card.className = 'capability-card';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'card-icon';
    iconWrap.innerHTML = icon;

    const title = document.createElement('h3');
    title.textContent = item.title || '';

    const desc = document.createElement('p');
    desc.textContent = item.description || '';

    card.appendChild(iconWrap);
    card.appendChild(title);
    card.appendChild(desc);

    if (Array.isArray(item.tags) && item.tags.length) {
        const tags = document.createElement('div');
        tags.className = 'card-tags';
        item.tags.forEach((tag) => {
            const s = document.createElement('span');
            s.textContent = String(tag);
            tags.appendChild(s);
        });
        card.appendChild(tags);
    }

    return card;
}

function getIconForType(type) {
    switch(type) {
        case 'pdf':
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
        case 'template':
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`;
        case 'diagram':
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
        default:
            return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`;
    }
}
