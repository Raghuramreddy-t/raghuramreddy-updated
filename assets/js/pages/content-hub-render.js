(function () {
  function resolveDataPath(fileName) {
    return window.location.pathname.includes('/pages/') ? '../assets/data/' + fileName : 'assets/data/' + fileName;
  }

  function isExternalHref(href) {
    return /^https?:\/\//i.test(String(href || '').trim());
  }

  function safeHref(href) {
    const raw = String(href || '').trim();
    if (!raw) return '#';
    if (raw.toLowerCase().startsWith('javascript:')) return '#';
    return raw;
  }

  function dedupePosts(posts) {
    const seen = new Set();
    return (posts || []).filter((post) => {
      const key = [
        String(post && post.id ? post.id : '').trim().toLowerCase(),
        String(post && post.url ? post.url : '').trim().toLowerCase(),
        String(post && post.title ? post.title : '').trim().toLowerCase(),
      ].find(Boolean);

      if (!key) return true;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function sortPostsByPublished(posts) {
    return [...(posts || [])].sort((a, b) => {
      const aHasDate = Boolean(a && a.published);
      const bHasDate = Boolean(b && b.published);
      if (aHasDate !== bHasDate) return aHasDate ? -1 : 1;

      const aTime = aHasDate ? new Date(String(a.published) + 'T00:00:00Z').getTime() : Number.NaN;
      const bTime = bHasDate ? new Date(String(b.published) + 'T00:00:00Z').getTime() : Number.NaN;
      const aSafe = Number.isNaN(aTime) ? Number.NEGATIVE_INFINITY : aTime;
      const bSafe = Number.isNaN(bTime) ? Number.NEGATIVE_INFINITY : bTime;
      if (aSafe !== bSafe) return bSafe - aSafe;
      return String(a && a.title ? a.title : '').localeCompare(String(b && b.title ? b.title : ''));
    });
  }

  function clearAndAppend(container, nodes) {
    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    nodes.forEach((node) => frag.appendChild(node));
    container.appendChild(frag);
  }

  function readLimit(container) {
    const raw = Number.parseInt(container && container.dataset ? container.dataset.limit : '', 10);
    return Number.isFinite(raw) && raw > 0 ? raw : null;
  }

  function isInsidePageHeader(node) {
    return Boolean(node && typeof node.closest === 'function' && node.closest('.page-header'));
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

  function createActionLink(action, fallbackLabel) {
    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = safeHref(action.url);
    if (action.target) link.target = action.target;
    if (action.target === '_blank' || isExternalHref(action.url)) link.rel = 'noopener';

    const label = document.createElement('span');
    label.textContent = action.label || fallbackLabel;
    link.appendChild(label);
    link.appendChild(createSvgArrow());
    return link;
  }

  function formatPublishedDate(published) {
    if (!published) return '';
    const parsed = new Date(String(published) + 'T00:00:00Z');
    if (Number.isNaN(parsed.getTime())) return String(published);
    return parsed.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    });
  }

  function renderBlogCards(container, posts) {
    const hidePublishedMeta = window.location.pathname.includes('/pages/recognition.html');
    const limit = readLimit(container);
    const articleVariants = [
      { slug: 'focus', label: 'Article Focus', color: '#3b82f6' },
      { slug: 'lab', label: 'Research Lab', color: '#8b5cf6' },
      { slug: 'guide', label: 'Guide', color: '#14b8a6' },
      { slug: 'brief', label: 'Brief', color: '#f59e0b' },
      { slug: 'essay', label: 'Essay', color: '#f43f5e' },
      { slug: 'study', label: 'Case Study', color: '#10b981' },
    ];

    const cards = dedupePosts(sortPostsByPublished(posts)).slice(0, limit || undefined).map((post, index) => {
      const card = document.createElement('div');
      card.className = 'publication-card';
      card.classList.add('writing-article-card');
      const variant = articleVariants[index % articleVariants.length];
      card.classList.add('writing-article-card--' + variant.slug);
      card.style.setProperty('--article-accent', variant.color);
      card.dataset.postId = post.id || '';
      card.dataset.variant = variant.slug;

      const content = document.createElement('div');
      content.className = 'publication-content blog-card-content';

      const tags = document.createElement('div');
      tags.className = 'project-tags blog-card-tags';
      (post.tags || []).forEach((tag) => {
        const chip = document.createElement('span');
        chip.textContent = String(tag);
        tags.appendChild(chip);
      });

      const title = document.createElement('h3');
      title.textContent = post.title || '';

      const published = document.createElement('p');
      published.className = 'publication-meta';
      published.textContent = formatPublishedDate(post.published);

      const description = document.createElement('p');
      description.textContent = post.description || '';

      const actions = document.createElement('div');
      actions.className = 'blog-card-actions writing-article-actions';
      const links = Array.isArray(post.actions) && post.actions.length
        ? post.actions
        : [{ label: 'Read Article', url: post.url || '#' }];

      links.forEach((action) => {
        const link = createActionLink(action, action.label || 'Read Article');
        link.classList.add('writing-article-cta');
        actions.appendChild(link);
      });

      const ribbon = document.createElement('div');
      ribbon.className = 'writing-article-ribbon';
      ribbon.textContent = variant.label;

      card.appendChild(ribbon);
      content.appendChild(tags);
      content.appendChild(title);
      if (!hidePublishedMeta && published.textContent) {
        content.appendChild(published);
      }
      content.appendChild(description);
      content.appendChild(actions);
      card.appendChild(content);
      return card;
    });

    clearAndAppend(container, cards);
  }

  function renderPublications(grid, papers) {
    const limit = readLimit(grid);
    const cards = dedupePosts(sortPostsByPublished(papers)).slice(0, limit || undefined).map((paper, index) => {
      const card = document.createElement('div');
      card.className = 'publication-card';
      card.dataset.paperId = paper.id || '';
      if (index < 3) {
        card.setAttribute('data-aos', 'fade-up');
        if (index) card.setAttribute('data-aos-delay', String(index * 100));
      }

      const icon = document.createElement('div');
      icon.className = 'publication-icon';
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path></svg>';

      const content = document.createElement('div');
      content.className = 'publication-content';

      const title = document.createElement('h3');
      title.textContent = paper.title || '';

      const meta = document.createElement('p');
      meta.className = 'publication-meta';
      meta.textContent = paper.type || '';

      const description = document.createElement('p');
      description.textContent = paper.description || '';

      const link = document.createElement('a');
      link.className = 'project-link';
      link.href = safeHref(paper.link || '#');
      if (isExternalHref(paper.link)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }

      const label = document.createElement('span');
      label.textContent = paper.link && paper.link !== '#' ? (isExternalHref(paper.link) ? 'Open Link' : 'Request Paper') : 'Request Paper';
      link.appendChild(label);
      link.appendChild(createSvgArrow());

      content.appendChild(title);
      content.appendChild(meta);
      content.appendChild(description);
      content.appendChild(link);
      card.appendChild(icon);
      card.appendChild(content);
      return card;
    });

    clearAndAppend(grid, cards);
  }

  function renderAcademic(grid, academicEntries) {
    const limit = readLimit(grid);
    const cards = dedupePosts(sortPostsByPublished(academicEntries)).slice(0, limit || undefined).map((entry, index) => {
      const card = document.createElement('div');
      card.className = 'publication-card';
      card.dataset.academicId = entry.id || '';
      if (index < 3) {
        card.setAttribute('data-aos', 'fade-up');
        if (index) card.setAttribute('data-aos-delay', String(index * 100));
      }

      const icon = document.createElement('div');
      icon.className = 'publication-icon';
      icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path></svg>';

      const content = document.createElement('div');
      content.className = 'publication-content';

      const title = document.createElement('h3');
      title.textContent = entry.title || '';

      const meta = document.createElement('p');
      meta.className = 'publication-meta';
      meta.textContent = [entry.institution, entry.role].filter(Boolean).join(' | ');

      const description = document.createElement('p');
      description.textContent = entry.description || '';

      const tags = document.createElement('div');
      tags.className = 'project-tags blog-card-tags';
      (entry.tags || []).forEach((tag) => {
        const chip = document.createElement('span');
        chip.textContent = String(tag);
        tags.appendChild(chip);
      });

      const link = document.createElement('a');
      link.className = 'project-link';
      link.href = safeHref(entry.link || 'contact.html');
      if (isExternalHref(entry.link)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }

      const label = document.createElement('span');
      label.textContent = entry.link && entry.link !== '#' ? (isExternalHref(entry.link) ? 'Open Source' : 'Open Details') : 'Discuss';
      link.appendChild(label);
      link.appendChild(createSvgArrow());

      content.appendChild(title);
      content.appendChild(meta);
      content.appendChild(description);
      content.appendChild(tags);
      content.appendChild(link);
      card.appendChild(icon);
      card.appendChild(content);
      return card;
    });

    clearAndAppend(grid, cards);
  }

  async function loadJson(fileName) {
    const response = await fetch(resolveDataPath(fileName), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to load ' + fileName);
    return response.json();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const blogContainers = Array.from(document.querySelectorAll('[data-blog-posts]')).filter((node) => !isInsidePageHeader(node));
    const publicationsGrids = Array.from(document.querySelectorAll('[data-publications-grid]')).filter((node) => !isInsidePageHeader(node));
    const academicGrids = Array.from(document.querySelectorAll('[data-academic-grid]')).filter((node) => !isInsidePageHeader(node));
    if (!blogContainers.length && !publicationsGrids.length && !academicGrids.length) return;

    try {
      const [blogIndex, publications] = await Promise.all([
        blogContainers.length ? loadJson('blog-index.json') : Promise.resolve(null),
        (publicationsGrids.length || academicGrids.length) ? loadJson('publications.json') : Promise.resolve(null),
      ]);

      if (blogIndex && Array.isArray(blogIndex.posts)) {
        blogContainers.forEach((blogContainer) => renderBlogCards(blogContainer, blogIndex.posts));
      }

      if (publications && Array.isArray(publications.papers)) {
        publicationsGrids.forEach((publicationsGrid) => renderPublications(publicationsGrid, publications.papers));
      }

      if (publications && Array.isArray(publications.academic)) {
        academicGrids.forEach((academicGrid) => renderAcademic(academicGrid, publications.academic));
      }
    } catch (error) {
      console.warn('Content hub render failed:', error);
    }
  });
})();
