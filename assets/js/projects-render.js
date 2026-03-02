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
        emoji: '🏭',
        tags: ['Platform System'],
        tech: ['OpenShift', 'Helm', 'Python', 'ArgoCD', 'GitOps', 'Tekton'],
        description: 'Automated platform upgrade orchestration system handling 100+ OpenShift clusters with zero-downtime migrations, rollback capabilities, and compliance validation.',
        features: [
            'Automated pre-flight checks and compatibility analysis',
            'Staged rollout with canary deployments',
            'Integrated compliance and security scanning',
            'Automated rollback on failure detection',
            '90% reduction in upgrade cycle time — 8 hours to 45 minutes'
        ],
        impact: '90% Faster Upgrades'
    },
    {
        id: 'shield',
        title: 'Project SHIELD',
        category: ['security'],
        featured: false,
        emoji: '🛡️',
        tags: ['Security'],
        tech: ['Prisma Cloud', 'SonarQube', 'Snyk', 'OWASP ZAP', 'Python', 'Grafana'],
        description: 'Enterprise vulnerability aggregation and reporting platform consolidating findings from 15+ security tools into unified risk dashboards with automated remediation workflows.',
        features: [
            'Consolidated findings from 15+ security tools',
            'Unified risk scoring and prioritization engine',
            'Automated JIRA ticket creation for critical findings',
            '80% reduction in vulnerability remediation time'
        ],
        impact: '80% Faster Remediation'
    },
    {
        id: 'toolchain',
        title: 'Toolchain Modernization',
        category: ['platform', 'automation'],
        featured: false,
        emoji: '⚙️',
        tags: ['Governance'],
        tech: ['Docker', 'Jenkins', 'GitLab CI', 'Nexus', 'Terraform', 'Vault'],
        description: 'Enterprise developer toolchain modernization with containerized build environments, hermetic builds, and reproducible pipelines eliminating environment drift across 50+ teams.',
        features: [
            'Containerized, hermetic build environments',
            'Reproducible pipeline templates via golden paths',
            'Artifact versioning and provenance tracking',
            'Standardized toolchain for 50+ development teams'
        ],
        impact: 'Zero Environment Drift'
    },
    {
        id: 'ehr-portal',
        title: 'EHR Patient Portal',
        category: ['platform'],
        featured: false,
        emoji: '🏥',
        tags: ['Healthcare'],
        tech: ['React', 'Node.js', 'FHIR R4', 'HL7', 'PostgreSQL', 'OAuth2'],
        description: 'Full-stack EHR patient portal with FHIR-compliant API integrations, role-based access control, and HIPAA-compliant data handling for secure clinical record access.',
        features: [
            'FHIR R4-compliant API integration layer',
            'Role-based access for patients, clinicians, and staff',
            'HIPAA-compliant audit logging and encryption',
            'Real-time appointment and record management'
        ],
        impact: 'HIPAA Compliant'
    },
    {
        id: 'secure-ehr',
        title: 'Secure EHR DevSecOps Framework',
        category: ['security'],
        featured: false,
        emoji: '🔐',
        tags: ['Security'],
        tech: ['GitLab CI', 'Trivy', 'SonarQube', 'HashiCorp Vault', 'OPA', 'Falco'],
        description: 'End-to-end DevSecOps framework for healthcare systems ensuring continuous compliance with HIPAA, HITECH, and SOC 2 through automated security gates and policy enforcement.',
        features: [
            'Automated HIPAA compliance scanning in CI/CD',
            'Secrets management with HashiCorp Vault',
            'OPA policy-as-code for regulatory enforcement',
            'SBOM generation, signing, and attestation'
        ],
        impact: 'Continuous Compliance'
    },
    {
        id: 'pharmacovigilance',
        title: 'Pharmacovigilance Monitoring',
        category: ['ai'],
        featured: false,
        emoji: '🤖',
        tags: ['AI/ML'],
        tech: ['Python', 'spaCy', 'MLflow', 'FastAPI', 'PostgreSQL', 'Celery'],
        description: 'Intelligent pharmacovigilance monitoring framework using NLP and ML to detect adverse drug event signals from clinical notes, regulatory databases, and structured EHR data.',
        features: [
            'NLP-based adverse event signal detection',
            'Multi-source ingestion — FDA, EHR, regulatory feeds',
            'Automated causality assessment assistance',
            'Human-in-the-loop review workflow with audit trail'
        ],
        impact: 'Signal Detection Automation'
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
    }

    function createCard(project) {
        const techTags = project.tech.map(t => `<span>${t}</span>`).join('');
        const featureList = project.features.map(f => `<li>${f}</li>`).join('');
        const tagsHtml = project.tags.map(t => `<span>${t}</span>`).join('');
        const featuredClass = project.featured ? 'featured' : '';

        return `
            <div class="project-card ${featuredClass}" id="${project.id}">
                <div class="project-image">
                    <div class="project-placeholder">${project.emoji}</div>
                    <div class="project-impact-badge">${project.impact}</div>
                </div>
                <div class="project-content">
                    <div class="project-tags">${tagsHtml}</div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <ul class="project-features">${featureList}</ul>
                    <div class="project-tech">${techTags}</div>
                </div>
            </div>`;
    }
})();
