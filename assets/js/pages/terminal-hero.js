/* ============================================
   TERMINAL HERO ANIMATION
   index.html - floating terminal in hero visual
   ============================================ */

(function() {
    const COMMANDS = [
        {
            prompt: 'whoami',
            lines: [
                { text: 'RaghuRamReddy Thummalapalli', tone: 'code' },
                { text: 'AI-Augmented Operations Lead · CICD & DevSecOps Lead', tone: 'primary' },
                { text: '10+ years building enterprise-scale systems', tone: 'code' },
            ],
        },
        {
            prompt: 'cat roles.txt',
            lines: [
                { text: 'AI-Augmented Operations Lead', tone: 'accent' },
                { text: 'CICD & DevSecOps Lead', tone: 'success' },
                { text: 'Enterprise Technology Lead', tone: 'code' },
                { text: 'Platform Engineering Lead', tone: 'info' },
                { text: 'Secure Software Delivery Expert', tone: 'warn' },
            ],
        },
        {
            prompt: 'ls flagship-systems/',
            lines: [
                { text: 'upgrade-factory/   project-shield/   toolchain-modernization/', tone: 'code' },
                { text: 'cicd-rca-ai/       copilot-governance/', tone: 'code' },
            ],
        },
        {
            prompt: 'cat impact-summary.log',
            lines: [
                { text: '[✓] 90% reduction in cluster upgrade time', tone: 'success' },
                { text: '[✓] 80% faster vulnerability remediation', tone: 'success' },
                { text: '[✓] 50+ enterprise systems influenced', tone: 'success' },
                { text: '[✓] Zero-downtime across 100+ clusters', tone: 'success' },
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
