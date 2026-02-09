(async function () {
  const el = document.getElementById("blog-list");
  if (!el) return;

  try {
    const res = await fetch("/assets/data/blog-index.json", { cache: "no-store" });
    const data = await res.json();

    const posts = (data.posts || []).slice().sort((a, b) => (b.published || "").localeCompare(a.published || ""));

    el.innerHTML = posts.map(p => `
      <div class="publication-card" data-aos="fade-up">
        <div class="publication-content" style="grid-column: 1 / -1;">
          <div class="project-tags" style="margin-bottom: 12px;">
            ${(p.tags || []).slice(0, 3).map(t => `<span>${t}</span>`).join("")}
          </div>
          <h3>${p.title}</h3>
          <p class="publication-meta">${p.published} • v${p.version}</p>
          <p>${p.description}</p>
          <div style="display:flex; gap:12px; margin-top:16px; flex-wrap:wrap;">
            <a href="${p.url}" class="project-link">
              <span>Read Post</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </a>
            ${p.alsoPublished?.linkedin ? `<a href="${p.alsoPublished.linkedin}" target="_blank" rel="noopener" class="project-link" style="opacity:.75; font-size:13px;">Also on LinkedIn</a>` : ""}
            ${p.alsoPublished?.medium ? `<a href="${p.alsoPublished.medium}" target="_blank" rel="noopener" class="project-link" style="opacity:.75; font-size:13px;">Also on Medium</a>` : ""}
          </div>
        </div>
      </div>
    `).join("");
  } catch (e) {
    el.innerHTML = `<div class="publication-card"><div class="publication-content">Could not load blog list.</div></div>`;
    console.warn(e);
  }
})();