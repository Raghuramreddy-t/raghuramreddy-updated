/* ============================================
   PROJECTS RENDERER
   Renders all project cards from data with filtering
   ============================================ */

const PROJECTS_DATA = [
    {
        id: 'upgrade-factory',
        title: 'Upgrade Factory',
        category: ['platform', 'automation'],
        featured: true,
        tags: ['Platform System'],
        tech: ['enterprise container platform', 'Helm', 'Python', 'GitOps controllers', 'GitOps', 'pipeline automation'],
        description: 'Automated platform upgrade orchestration system handling 100+ enterprise container platform clusters with zero-downtime migrations, rollback capabilities, and compliance validation.',
        features: [
            'Automated pre-flight checks and compatibility analysis',
            'Staged rollout with canary deployments',
            'Integrated compliance and security scanning',
            'Automated rollback on failure detection',
            '90% reduction in upgrade cycle time - 8 hours to 45 minutes'
        ],
        impact: '90% Faster Upgrades',
        link: '#upgrade-factory-details'
    },
    {
        id: 'shield',
        title: 'Project SHIELD',
        category: ['security'],
        featured: false,
        tags: ['Security'],
        tech: ['cloud security platform', 'code quality scanner', 'dependency security scanner', 'DAST scanner', 'Python', 'Grafana'],
        description: 'Enterprise vulnerability aggregation and reporting platform consolidating findings from 15+ security tools into unified risk dashboards with automated remediation workflows.',
        features: [
            'Consolidated findings from 15+ security tools',
            'Unified risk scoring and prioritization engine',
            'Automated JIRA ticket creation for critical findings',
            '80% reduction in vulnerability remediation time'
        ],
        impact: '80% Faster Remediation',
        link: '#shield-details'
    },
    {
        id: 'toolchain',
        title: 'Toolchain Modernization',
        category: ['platform', 'automation'],
        featured: false,
        tags: ['Governance'],
        tech: ['Docker', 'legacy CI', 'CI platform', 'artifact repository', 'infrastructure as code', 'secrets manager'],
        description: 'Enterprise developer toolchain modernization with containerized build environments, hermetic builds, and reproducible pipelines eliminating environment drift across 50+ teams.',
        features: [
            'Containerized, hermetic build environments',
            'Reproducible pipeline templates via golden paths',
            'Artifact versioning and provenance tracking',
            'Standardized toolchain for 50+ development teams'
        ],
        impact: 'Zero Environment Drift',
        link: '#toolchain-details'
    },
    {
        id: 'ehr-portal',
        title: 'EHR Patient Portal',
        category: ['platform'],
        featured: false,
        tags: ['Healthcare'],
        tech: ['React', 'Node.js', 'FHIR R4', 'HL7', 'PostgreSQL', 'OAuth2'],
        description: 'Full-stack EHR patient portal with FHIR-compliant API integrations, role-based access control, and HIPAA-compliant data handling for secure clinical record access.',
        features: [
            'FHIR R4-compliant API integration layer',
            'Role-based access for patients, clinicians, and staff',
            'HIPAA-compliant audit logging and encryption',
            'Real-time appointment and record management'
        ],
        impact: 'HIPAA Compliant',
        link: '#ehr-details'
    },
    {
        id: 'secure-ehr',
        title: 'Secure EHR DevSecOps Framework',
        category: ['security'],
        featured: false,
        tags: ['Security'],
        tech: ['CI platform', 'container scanner', 'code quality scanner', 'secrets manager', 'OPA', 'runtime security monitor'],
        description: 'End-to-end DevSecOps framework for healthcare systems ensuring continuous compliance with HIPAA, HITECH, and SOC 2 through automated security gates and policy enforcement.',
        features: [
            'Automated HIPAA compliance scanning in CI/CD',
            'Secrets management with secrets manager',
            'OPA policy-as-code for regulatory enforcement',
            'SBOM generation, signing, and attestation'
        ],
        impact: 'Continuous Compliance',
        link: '#secure-ehr-details'
    },
    {
        id: 'pharmacovigilance',
        title: 'Pharmacovigilance Monitoring',
        category: ['ai'],
        featured: false,
        tags: ['AI/ML'],
        tech: ['Python', 'spaCy', 'MLflow', 'FastAPI', 'PostgreSQL', 'Celery'],
        description: 'Intelligent pharmacovigilance monitoring framework using NLP and ML to detect adverse drug event signals from clinical notes, regulatory databases, and structured EHR data.',
        features: [
            'NLP-based adverse event signal detection',
            'Multi-source ingestion - FDA, EHR, regulatory feeds',
            'Automated causality assessment assistance',
            'Human-in-the-loop review workflow with audit trail'
        ],
        impact: 'Signal Detection Automation',
        link: 'pages/blog/ai-cicd-troubleshooter.html'
    }
];

(function () {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;

    const filterBtns = document.querySelectorAll('.filter-btn');
    let activeFilter = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderProjects(activeFilter);
        });
    });

    renderProjects('all');

    function renderProjects(filter) {
        const filtered = filter === 'all'
            ? PROJECTS_DATA
            : PROJECTS_DATA.filter(p => p.category.includes(filter));

        if (!filtered.length) {
            grid.innerHTML = '<p class="empty-state" style="grid-column:span 2;text-align:center;color:var(--text-muted);padding:60px 0;">No projects in this category yet.</p>';
            return;
        }

        grid.innerHTML = filtered.map(createCard).join('');

        // Staggered entrance animation
        grid.querySelectorAll('.project-card').forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 90);
        });

        bindProjectImageInteractions();
    }

    function bindProjectImageInteractions() {
        const images = grid.querySelectorAll('.project-image');
        images.forEach((img) => {
            img.addEventListener('mousemove', (e) => {
                const r = img.getBoundingClientRect();
                const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
                const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
                img.style.setProperty('--px', px.toFixed(3));
                img.style.setProperty('--py', py.toFixed(3));
            });
            img.addEventListener('mouseleave', () => {
                img.style.setProperty('--px', '0');
                img.style.setProperty('--py', '0');
            });
        });
    }

    function createCard(project) {
        const techTags = project.tech.map(t => `<span>${t}</span>`).join('');
        const featureList = project.features.slice(0, 4).map(f => `<li>${f}</li>`).join('');
        const tagsHtml = project.tags.map(t => `<span>${t}</span>`).join('');
        const featuredClass = project.featured ? 'featured' : '';
        const categoryClass = project.category[0] || 'platform';
        const flowClass = project.id === 'upgrade-factory' ? ' project-image--flow' : '';
        const isFlow = project.id === 'upgrade-factory';
        const flowMarkup = isFlow ? `
                        <div class="pv-flow-ui">
                            <span>Pre-flight</span><span>Canary</span><span>Upgrade</span><span>Validation</span>
                        </div>
                        <span class="pv-node pv-node-t">Pre-flight</span>
                        <span class="pv-node pv-node-r">Canary</span>
                        <span class="pv-node pv-node-b">Upgrade</span>
                        <span class="pv-node pv-node-l">Validation</span>` : '';

        const visualGlyph = getProjectGlyph(project.id);

        return `
            <div class="project-card ${featuredClass}" id="${project.id}">
                <div class="project-image project-image--${categoryClass}${flowClass}">
                    <div class="project-visual-bg" aria-hidden="true">
                        ${flowMarkup}
                        <span class="pv-grid"></span>
                        <span class="pv-beam"></span>
                        <span class="pv-orbit"></span>
                        <span class="pv-dot pv-dot-1"></span>
                        <span class="pv-dot pv-dot-2"></span>
                        <span class="pv-dot pv-dot-3"></span>
                    </div>
                    <div class="project-placeholder project-placeholder--animated">${visualGlyph}</div>
                    <div class="project-impact-badge">${project.impact}</div>
                </div>
                <div class="project-content">
                    <div class="project-tags">${tagsHtml}</div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <ul class="project-features">${featureList}</ul>
                    <div class="project-tech">${techTags}</div>
                    ${project.link ? `<a href="${project.link}" class="project-link"><span>Learn more</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg></a>` : ''}
                </div>
            </div>`;
    }

    function getProjectGlyph(projectId) {
        const glyphs = {
            'upgrade-factory': `
                <span class="glyph glyph-factory" aria-hidden="true">
                    <span class="g-bar g-bar-1"></span>
                    <span class="g-bar g-bar-2"></span>
                    <span class="g-bar g-bar-3"></span>
                </span>`,
            'shield': `
                <span class="glyph glyph-shield" aria-hidden="true">
                    <span class="g-core"></span>
                    <span class="g-ring"></span>
                </span>`,
            'toolchain': `
                <span class="glyph glyph-gear" aria-hidden="true">
                    <span class="g-gear"></span>
                </span>`,
            'ehr-portal': `
                <span class="glyph glyph-health" aria-hidden="true">
                    <span class="g-plus-v"></span>
                    <span class="g-plus-h"></span>
                </span>`,
            'secure-ehr': `
                <span class="glyph glyph-lock" aria-hidden="true">
                    <span class="g-lock-top"></span>
                    <span class="g-lock-body"></span>
                </span>`,
            'pharmacovigilance': `
                <span class="glyph glyph-ai" aria-hidden="true">
                    <span class="g-node g-node-1"></span>
                    <span class="g-node g-node-2"></span>
                    <span class="g-node g-node-3"></span>
                </span>`
        };

        return glyphs[projectId] || `<span class="glyph glyph-factory"><span class="g-bar g-bar-1"></span><span class="g-bar g-bar-2"></span><span class="g-bar g-bar-3"></span></span>`;
    }
})();

