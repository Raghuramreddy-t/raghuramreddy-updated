(function () {
  function renderEcosystem(targetId, highlightLayer = null) {
    const el = document.getElementById(targetId);
    if (!el || !window.ECOSYSTEM) return;

    const cards = window.ECOSYSTEM.map((layer, index) => {
      // Check if this layer should be highlighted
      let isHighlighted = false;
      if (highlightLayer !== null) {
          if (typeof highlightLayer === 'number' && index === highlightLayer) isHighlighted = true;
          if (typeof highlightLayer === 'string' && layer.title.toLowerCase().includes(highlightLayer.toLowerCase())) isHighlighted = true;
          if (Array.isArray(highlightLayer) && (highlightLayer.includes(index) || highlightLayer.some(h => layer.title.toLowerCase().includes(h.toLowerCase())))) isHighlighted = true;
      }

      const activeClass = isHighlighted ? 'active' : '';
      const delay = index * 100;

      return `
      <div class="eco-card ${activeClass}" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="eco-header">
          <span class="eco-icon">${layer.icon}</span>
          <h3 class="eco-title">${layer.title}</h3>
        </div>
        <ul class="eco-list">
          ${layer.items.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    `}).join("");

    el.innerHTML = `<div class="eco-grid">${cards}</div>`;
  }

  window.renderEcosystem = renderEcosystem;
})();