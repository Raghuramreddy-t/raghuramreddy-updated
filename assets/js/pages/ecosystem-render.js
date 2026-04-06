(function () {
  function getLayerKey(title) {
    const t = (title || '').toLowerCase();
    if (t.includes('delivery')) return 'delivery';
    if (t.includes('devsec')) return 'devsecops';
    if (t.includes('observability')) return 'observability';
    if (t.includes('automation')) return 'automation';
    if (t.includes('ai-augmented') || t.includes('ai augmented')) return 'ai';
    return 'platform';
  }

  function bindEcoInteractions(root) {
    const cards = root.querySelectorAll('.eco-card');
    cards.forEach((card) => {
      let doneTimer = null;
      card.addEventListener('mouseenter', () => {
        card.classList.remove('eco-live-done');
        card.classList.add('eco-live');
        if (doneTimer) clearTimeout(doneTimer);
        doneTimer = setTimeout(() => {
          card.classList.add('eco-live-done');
        }, 900);
      });
      card.addEventListener('mouseleave', () => {
        card.classList.remove('eco-live', 'eco-live-done');
        if (doneTimer) clearTimeout(doneTimer);
      });
    });
  }

  function renderEcosystem(targetId, highlightLayer = null) {
    const el = document.getElementById(targetId);
    if (!el || !window.ECOSYSTEM) return;

    const cards = window.ECOSYSTEM.map((layer, index) => {
      // Check if this layer should be highlighted
      let isHighlighted = false;
      if (highlightLayer !== null) {
          if (typeof highlightLayer === 'number' && index === highlightLayer) isHighlighted = true;
          if (typeof highlightLayer === 'string' && layer.title.toLowerCase().includes(highlightLayer.toLowerCase())) isHighlighted = true;
          if (Array.isArray(highlightLayer)) {
              const hasIndexMatch = highlightLayer.some(h => typeof h === 'number' && h === index);
              const hasTitleMatch = highlightLayer.some(
                h => typeof h === 'string' && layer.title.toLowerCase().includes(h.toLowerCase())
              );
              isHighlighted = hasIndexMatch || hasTitleMatch;
          }
      }

      const activeClass = isHighlighted ? 'active' : '';
      const delay = index * 100;
      const layerKey = getLayerKey(layer.title);

      const iconHtml = (layer.icon && String(layer.icon).startsWith('http'))
        ? `<img class="eco-icon-img" src="${layer.icon}" alt="${layer.title} icon" loading="lazy" decoding="async" onerror="this.replaceWith(document.createTextNode('${layer.title.split(' ').map(w => w[0]).slice(0,3).join('').toUpperCase()}'));">`
        : `${layer.icon || ''}`;

      return `
      <div class="eco-card ${activeClass}" data-layer="${layerKey}" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="eco-header">
          <span class="eco-icon">${iconHtml}</span>
          <h3 class="eco-title">${layer.title}</h3>
          <span class="eco-live-badge">Success</span>
        </div>
        <ul class="eco-list">
          ${layer.items.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    `}).join("");

    el.innerHTML = `<div class="eco-grid">${cards}</div>`;
    bindEcoInteractions(el);
  }

  window.renderEcosystem = renderEcosystem;
})();
