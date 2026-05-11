/* ============================================
   TERMINAL HERO ANIMATION
   index.html - floating terminal in hero visual
   ============================================ */

(function() {
    const COMMANDS = [
        {
            prompt: 'git status',
            lines: [
                { text: 'On branch main', tone: 'code' },
                { text: 'Your branch is up to date', tone: 'primary' },
                { text: 'nothing to commit, working tree clean', tone: 'success' },
            ],
        },
        {
            prompt: 'cat about.txt',
            lines: [
                { text: 'AI-Augmented Operations Lead', tone: 'accent' },
                { text: 'CICD & DevSecOps Lead', tone: 'success' },
                { text: 'Enterprise Technology Lead', tone: 'code' },
                { text: 'Platform Engineering Lead', tone: 'info' },
                { text: 'Secure Software Delivery Expert', tone: 'warn' },
            ],
        },
        {
            prompt: 'deploy status',
            lines: [
                { text: '↳ Building... [████████████████░░] 87%', tone: 'warn' },
                { text: '↳ Testing... [██████████████████] 100% ✓', tone: 'success' },
                { text: '↳ Deploying... [████████████████░░] 92%', tone: 'primary' },
                { text: '[COMPLETE] Deployment finished in 3m 24s', tone: 'success' },
            ],
        },
        {
            prompt: 'metrics',
            lines: [
                { text: 'Platform Metrics:', tone: 'code' },
                { text: '  • 5,000+ engineers enabled globally', tone: 'accent' },
                { text: '  • 100+ mission-critical clusters managed', tone: 'accent' },
                { text: '  • 80% avg remediation time reduction', tone: 'success' },
                { text: '  • Zero-downtime patterns: 100% adoption', tone: 'success' },
            ],
        },
        {
            prompt: 'ls projects/',
            lines: [
                { text: 'upgrade-factory/          (90% faster cluster upgrades)', tone: 'primary' },
                { text: 'project-shield/           (supply chain security)', tone: 'primary' },
                { text: 'cicd-rca-ai/              (AI-powered incident analysis)', tone: 'accent' },
                { text: 'toolchain-modernization/  (GitOps + policy-as-code)', tone: 'primary' },
                { text: 'copilot-governance/       (LLM safety & compliance)', tone: 'accent' },
            ],
        },
        {
            prompt: 'cat expertise.txt',
            lines: [
                { text: 'Core Areas:', tone: 'code' },
                { text: '  ▪ Platform Engineering & DevSecOps', tone: 'primary' },
                { text: '  ▪ Enterprise CI/CD & Release Automation', tone: 'primary' },
                { text: '  ▪ Kubernetes & Cloud Architecture', tone: 'accent' },
                { text: '  ▪ AI-Augmented Operations & AIOps', tone: 'success' },
                { text: '  ▪ Security Automation & Compliance', tone: 'warn' },
            ],
        },
        {
            prompt: 'echo "Ready to build great platforms"',
            lines: [
                { text: 'Ready to build great platforms', tone: 'success' },
            ],
        },
    ];

    const TYPING_SPEED = 35;   // ms per char
    const LINE_DELAY = 140;    // ms between output lines
    const CMD_PAUSE = 1400;    // ms after command output before next command
    const RESTART_DELAY = 2800; // ms before looping

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
                histLine.innerHTML = '<span class="term-ps1">raghuramreddy:~$</span> <span class="term-hist-cmd">' + cmd.prompt + '</span>';
                termBody.insertBefore(histLine, promptEl);
                promptEl.classList.add('is-hidden');
                timeoutId = setTimeout(printOutputLine, LINE_DELAY);
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
                promptEl.classList.remove('is-hidden');

                if (cmdIdx === 0) {
                    timeoutId = setTimeout(() => {
                        promptText.textContent = '';
                        promptEl.classList.remove('is-hidden');
                        termBody.scrollTop = termBody.scrollHeight;
                        timeoutId = setTimeout(typePrompt, 100);
                    }, RESTART_DELAY);
                } else {
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
