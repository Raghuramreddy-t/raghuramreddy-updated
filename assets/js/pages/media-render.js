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
    items.forEach((item, index) => {
        const card = createMediaCard(item, index);
        
        if (item.category === 'Downloads' && downloadsContainer) {
            downloadsContainer.innerHTML += card;
        } else if (item.category === 'Visuals' && visualsContainer) {
            visualsContainer.innerHTML += card;
        }
    });
}

function createMediaCard(item, index) {
    const icon = getIconForType(item.type);
    
    // Different layout for Visuals vs Downloads based on existing HTML structure
    if (item.category === 'Visuals') {
        return `
            <div class="publication-card">
                <div class="publication-icon">
                    ${icon}
                </div>
                <div class="publication-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <a href="${item.link}" class="project-link">
                        <span>View Diagram</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                    </a>
                </div>
            </div>
        `;
    } else {
        // Downloads layout
        const tagsHtml = item.tags ? 
            `<div class="card-tags">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>` : '';
            
        return `
            <div class="capability-card">
                <div class="card-icon">
                    ${icon}
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${tagsHtml}
            </div>
        `;
    }
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