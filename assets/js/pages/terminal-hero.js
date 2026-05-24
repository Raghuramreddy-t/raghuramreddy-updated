/* ============================================
   ULTIMATE POWERSHELL TERMINAL - Premium Edition
   index.html - floating terminal in hero visual
   ============================================ */

(function() {
    const COMMANDS = [
        {
            prompt: 'Get-Engineer',
            lines: [
                { text: '╔═══════════════════════════════════════════════════╗', tone: 'primary' },
                { text: '║  Raghuramreddy Thummalapalli                     ║', tone: 'primary' },
                { text: '║  Intelligent Infrastructure Ecosystems Architect       ║', tone: 'primary' },
                { text: '║  Operational Intelligence | 10+ Years             ║', tone: 'primary' },
                { text: '╚═══════════════════════════════════════════════════╝', tone: 'primary' },
            ],
        },
        {
            prompt: 'Get-Specializations',
            lines: [
                { text: '→ Intelligent Infrastructure [████████████████████] 100%', tone: 'success' },
                { text: '→ Lifecycle Governance       [████████████████████] 100%', tone: 'success' },
                { text: '→ Cloud-Native Architecture  [███████████████████░] 95%', tone: 'accent' },
                { text: '→ Kubernetes & Orchestration [███████████████████░] 95%', tone: 'accent' },
                { text: '→ Infrastructure Cognition   [████████████████████] 100%', tone: 'success' },
                { text: '→ Secure Software Delivery   [███████████████████░] 98%', tone: 'warn' },
            ],
        },
        {
            prompt: 'Get-FlagshipProjects',
            lines: [
                { text: '✓ upgrade-factory             90% faster Kubernetes upgrades', tone: 'success' },
                { text: '✓ project-shield              End-to-end supply chain security', tone: 'success' },
                { text: '✓ cicd-rca-ai                 Intelligent incident root cause analysis', tone: 'primary' },
                { text: '✓ toolchain-modernization     GitOps-driven infrastructure automation', tone: 'accent' },
                { text: '✓ copilot-governance          LLM safety & compliance framework', tone: 'success' },
                { text: '✓ observability-stack         Unified metrics, logs, traces platform', tone: 'accent' },
            ],
        },
        {
            prompt: 'Get-PlatformMetrics',
            lines: [
                { text: 'Developers Served        │ [████████████░░] 1,000+', tone: 'primary' },
                { text: 'Enterprise Clients       │ [████████████░░] 8+', tone: 'success' },
                { text: 'Mission-Critical Systems │ [████████████░░] 100+', tone: 'accent' },
                { text: 'Automated Deployments    │ [████████████░░] 50,000+', tone: 'success' },
                { text: 'Zero-Downtime Patterns   │ [████████████░░] 35+', tone: 'primary' },
                { text: 'System Uptime Avg        │ [████████████░░] 99.99%', tone: 'success' },
            ],
        },
        {
            prompt: 'Get-ImpactMetrics',
            lines: [
                { text: '⚡ 90% faster cluster upgrades  │ 8h → 45min', tone: 'success' },
                { text: '⚡ 80% faster vulnerability fix │ 2d → 5h', tone: 'success' },
                { text: '⚡ 70% reduced deployment risk  │ manual → automated', tone: 'primary' },
                { text: '⚡ 100% audit compliance        │ supply chain secured', tone: 'accent' },
                { text: '⚡ 50+ systems influenced       │ across multiple orgs', tone: 'success' },
                { text: '⚡ Zero incidents in prod       │ proven reliability', tone: 'success' },
            ],
        },
        {
            prompt: 'Get-TechnologyStack',
            lines: [
                { text: 'Platforms   │ Kubernetes, OpenShift, AWS, Azure, GCP', tone: 'code' },
                { text: 'CICD        │ Bamboo, Jenkins, GitLab CI, Argo CD', tone: 'code' },
                { text: 'Security    │ SonarQube, SBOM, OPA, JFrog Xray', tone: 'code' },
                { text: 'Observ.     │ Dynatrace, Splunk, Grafana, Prometheus', tone: 'code' },
                { text: 'AI/LLM      │ RAG Systems, pgvector, LLMOps, Governance', tone: 'code' },
                { text: 'IaC         │ Terraform, Helm, CloudFormation, Ansible', tone: 'code' },
            ],
        },
        {
            prompt: 'Test-SystemStatus',
            lines: [
                { text: '[✓] Intelligent Infrastructure Ready    Status: HEALTHY', tone: 'success' },
                { text: '[✓] Lifecycle Governance Ready          Status: OPTIMAL', tone: 'success' },
                { text: '[✓] Enterprise Scale Readiness         Status: PROVEN', tone: 'success' },
                { text: '[✓] Infrastructure Cognition Ready      Status: ADVANCED', tone: 'primary' },
                { text: '[✓] Security & Compliance Framework    Status: CERTIFIED', tone: 'accent' },
                { text: '[✓] Open for Strategic Collaboration   Status: AVAILABLE', tone: 'success' },
            ],
        },
        {
            prompt: 'Invoke-ProfessionalProfile',
            lines: [
                { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', tone: 'primary' },
                { text: 'EXPERTISE AREAS: Intelligent Infrastructure,', tone: 'primary' },
                { text: 'Lifecycle Governance, Infrastructure Cognition,', tone: 'primary' },
                { text: '', tone: 'primary' },
                { text: 'FOCUS: Building ecosystems teams trust, with', tone: 'primary' },
                { text: 'resilience and governance built-in by design.', tone: 'primary' },
                { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', tone: 'primary' },
            ],
        },
    ];

    const TYPING_SPEED = 35;   // ms per char - ultra-snappy feel
    const LINE_DELAY = 100;    // ms between output lines
    const CMD_PAUSE = 1200;    // ms after command output before next command
    const RESTART_DELAY = 2500; // ms before looping

    function initTerminal(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let cmdIdx = 0;
        let lineIdx = 0;
        let charIdx = 0;
        let timeoutId = null;

        const termBody = container.querySelector('.term-body');
        const promptEl = container.querySelector('.term-current-prompt');
        const promptText = container.querySelector('.term-prompt-text');

        if (!termBody || !promptEl || !promptText) return;

        function addOutputLine(text, tone) {
            const line = document.createElement('div');
            line.className = 'term-output-line' + (tone ? ` tone-${tone}` : '');
            line.textContent = text;
            termBody.insertBefore(line, promptEl);
            termBody.scrollTop = termBody.scrollHeight;
        }

        function typePrompt() {
            const cmd = COMMANDS[cmdIdx];
            const full = cmd.prompt;

            promptEl.classList.remove('is-hidden');
            if (charIdx < full.length) {
                promptText.textContent = full.slice(0, ++charIdx);
                timeoutId = setTimeout(typePrompt, TYPING_SPEED);
            } else {
                charIdx = 0;
                lineIdx = 0;
                const histLine = document.createElement('div');
                histLine.className = 'term-hist-line';
                histLine.innerHTML = '<span class="term-ps1">PS</span> <span class="term-hist-cmd">' + cmd.prompt + '</span>';
                termBody.insertBefore(histLine, promptEl);
                promptEl.classList.add('is-hidden');
                timeoutId = setTimeout(printOutputLine, 300);
            }
        }

        function printOutputLine() {
            const cmd = COMMANDS[cmdIdx];
            if (lineIdx < cmd.lines.length) {
                const entry = cmd.lines[lineIdx];
                addOutputLine(entry.text, entry.tone);
                lineIdx++;
                timeoutId = setTimeout(printOutputLine, LINE_DELAY);
            } else {
                promptText.textContent = '';
                cmdIdx = (cmdIdx + 1) % COMMANDS.length;

                if (cmdIdx === 0) {
                    // Clear and restart
                    timeoutId = setTimeout(() => {
                        const outputLines = termBody.querySelectorAll('.term-output-line, .term-hist-line');
                        outputLines.forEach(line => {
                            if (line.parentNode) {
                                line.remove();
                            }
                        });
                        promptEl.classList.remove('is-hidden');
                        promptText.textContent = '';
                        termBody.scrollTop = termBody.scrollHeight;
                        timeoutId = setTimeout(typePrompt, 100);
                    }, RESTART_DELAY);
                } else {
                    promptEl.classList.remove('is-hidden');
                    timeoutId = setTimeout(typePrompt, CMD_PAUSE);
                }
            }
        }

        typePrompt();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initTerminal('hero-terminal'));
    } else {
        initTerminal('hero-terminal');
    }
})();



