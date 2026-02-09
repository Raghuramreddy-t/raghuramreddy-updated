(async function () {
  // 1) Load blog index
  async function loadBlogIndex() {
    try {
      const res = await fetch("/assets/data/blog-index.json", { cache: "no-store" });
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

    const path = window.location.pathname;
    const post = (index.posts || []).find(p => p.url === path);

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

  // 3) Build AI search index (blog + future media)
  function buildSearchIndexFromBlog(index) {
    if (!index) return [];

    return (index.posts || []).map(p => ({
      title: p.title,
      type: "Blog Post",
      url: p.url,
      tags: (p.tags || []).join(", "),
      text: `${p.title} ${p.description} ${(p.aiIndexText || "")} ${(p.tags || []).join(" ")}`
    }));
  }

  // 4) Hook into your AI Assistant (if present)
  function attachToAIAssistant(searchItems) {
    // If your AIAssistant class exists, add a new method it can call.
    if (!window.AIAssistant) return;

    // Patch: add lightweight search ability to the assistant instance.
    const originalBuild = window.AIAssistant.prototype.buildKnowledgeBase;

    window.AIAssistant.prototype.buildKnowledgeBase = function () {
      const kb = originalBuild.call(this);

      kb.search = {
        keywords: ["search", "find", "article", "blog", "post", "read", "xops", "devops", "platform"],
        response: "" // dynamic
      };

      // Add dynamic responder
      const originalGetResponse = window.AIAssistant.prototype.getResponse;

      window.AIAssistant.prototype.getResponse = function (query) {
        const q = query.toLowerCase();

        // If user seems to be searching, return top matches
        const wantsSearch =
          q.startsWith("search ") || q.startsWith("find ") || q.includes("show me") || q.includes("read ");

        if (wantsSearch) {
          const hits = searchItems
            .map(item => {
              const score =
                (item.text.toLowerCase().includes(q) ? 3 : 0) +
                (item.title.toLowerCase().includes(q) ? 5 : 0) +
                (item.tags.toLowerCase().includes(q) ? 2 : 0);
              return { item, score };
            })
            .filter(x => x.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

          if (hits.length === 0) {
            return `I didn’t find an exact match. Try keywords like: *XOps*, *Platform Engineering*, *DevSecOps*, *AI-assisted Operations*, or *Upgrade Factory*.`;
          }

          const lines = hits.map(h => `• **${h.item.title}** (${h.item.type}) — <a href="${h.item.url}">open</a>`);
          return `Here are the closest matches:\n\n${lines.join("\n")}`;
        }

        return originalGetResponse.call(this, query);
      };

      return kb;
    };
  }

  // Run
  const index = await loadBlogIndex();
  await renderChangelogIfPresent(index);

  const searchItems = buildSearchIndexFromBlog(index);
  attachToAIAssistant(searchItems);

})();