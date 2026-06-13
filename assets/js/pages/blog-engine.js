(async function () {
  // 1) Load blog index
  async function loadBlogIndex() {
    try {
      const res = await fetch('/assets/data/blog-index.json', { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load blog index");
      return await res.json();
    } catch (e) {
      console.warn("Blog index not available:", e);
      return null;
    }
  }

  // 2) Render changelog for article pages
  async function renderChangelogIfPresent(index) {
    const changelogContainer = document.getElementById("changelog");
    if (!changelogContainer || !index) return;

    const currentPath = window.location.pathname.replace(/\/index\.html$/, '');
    const post = (index.posts || []).find(p => p.url === currentPath);

    if (!post || !post.changelog) {
      changelogContainer.innerHTML = "<p style='opacity:.7;'>No changelog available.</p>";
      return;
    }

    changelogContainer.innerHTML = post.changelog.map(entry => `
      <div class="changelog-entry" style="margin:14px 0; padding:14px; border:1px solid rgba(255,255,255,.08); border-radius:14px; background: rgba(255,255,255,.03);">
        <div style="display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap;">
          <strong>v${entry.version}</strong>
          <span style="opacity:.75;">${entry.date}</span>
        </div>
        <ul style="margin:10px 0 0; padding-left:18px;">
          ${entry.changes.map(c => `<li style="margin:6px 0; opacity:.9;">${c}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  // Run
  const index = await loadBlogIndex();
  await renderChangelogIfPresent(index);

})();
