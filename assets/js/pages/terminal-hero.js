/* ============================================
   TERMINAL HERO ANIMATION
   index.html — floating terminal in hero visual
   ============================================ */

(function() {
    const COMMANDS = [
        {
            prompt: 'whoami',
            lines: [
                'RaghuRamReddy Thummalapalli',
                'Platform Engineering Leader · DevSecOps Leader',
                '10+ years building enterprise-scale systems',
            ],
            delay: 0,
        },
        {
            prompt: 'cat expertise.txt',
            lines: [
                'Platform Engineering  ███████████▒  94%',
                'DevSecOps             ██████████▒   91%',
                'Cloud Architecture    █████████▒    87%',
                'CI/CD Automation      ██████████    90%',
                'Applied AI Systems    ████████▒     82%',
            ],
            delay: 0,
        },
        {
            prompt: 'ls flagship-systems/',
            lines: [
                'upgrade-factory/   project-shield/   toolchain-modernization/',
                'cicd-rca-ai/       copilot-governance/',
            ],
            delay: 0,
        },
        {
            prompt: 'cat impact-summary.log',
            lines: [
                '[✓] 90% reduction in cluster upgrade time',
                '[✓] 80% faster vulnerability remediation',
                '[✓] 50+ enterprise systems influenced',
                '[✓] Zero-downtime across 100+ clusters',
            ],
            delay: 0,
        },
    ];

    const TYPING_SPEED  = 38;   // ms per char
    const LINE_DELAY    = 160;  // ms between output lines
    const CMD_PAUSE     = 1400; // ms after command output before next command
    const RESTART_DELAY = 3200; // ms before looping

    function initTerminal(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let cmdIdx    = 0;
        let lineIdx   = 0;
        let charIdx   = 0;
        let state     = 'typing-prompt';  // 'typing-prompt' | 'printing-output' | 'pausing'
        let timeoutId = null;
        let currentLine = null;

        const termBody   = container.querySelector('.term-body');
        const promptEl   = container.querySelector('.term-current-prompt');
        const promptText = container.querySelector('.term-prompt-text');

        if (!termBody || !promptEl || !promptText) return;

        function addOutputLine(text, cls) {
            const line = document.createElement('div');
            line.className = 'term-output-line' + (cls ? ' ' + cls : '');
            line.textContent = text;
            line.style.color = cls === 'success' ? '#22c55e' : 'rgba(148, 163, 184, 0.85)';
            termBody.insertBefore(line, promptEl);
            // Keep scroll at bottom
            termBody.scrollTop = termBody.scrollHeight;
        }

        function typePrompt() {
            const cmd = COMMANDS[cmdIdx];
            if (charIdx < cmd.prompt.length) {
                promptText.textContent = cmd.prompt.slice(0, ++charIdx);
                timeoutId = setTimeout(typePrompt, TYPING_SPEED);
            } else {
                // Prompt done — show output
                charIdx = 0;
                lineIdx = 0;
                state = 'printing-output';
                timeoutId = setTimeout(printOutputLine, LINE_DELAY);
            }
        }

        function printOutputLine() {
            const cmd = COMMANDS[cmdIdx];
            if (lineIdx < cmd.lines.length) {
                const cls = cmd.lines[lineIdx].startsWith('[✓]') ? 'success' : '';
                addOutputLine(cmd.lines[lineIdx], cls);
                lineIdx++;
                timeoutId = setTimeout(printOutputLine, LINE_DELAY);
            } else {
                // All output printed — move prompt to history
                const histLine = document.createElement('div');
                histLine.className = 'term-hist-line';
                histLine.innerHTML = `<span class="term-ps1" style="color:#8b5cf6">raghuramreddy:~$</span> <span class="term-hist-cmd" style="color:#e2e8f0">${COMMANDS[cmdIdx].prompt}</span>`;
                termBody.insertBefore(histLine, termBody.querySelector('.term-output-line'));

                // Clear prompt
                promptText.textContent = '';

                // Remove all current output lines (they're already in the DOM above)
                // Pause before next command
                cmdIdx = (cmdIdx + 1) % COMMANDS.length;
                charIdx = 0;
                state = 'typing-prompt';

                const pause = cmdIdx === 0 ? RESTART_DELAY : CMD_PAUSE;
                timeoutId = setTimeout(() => {
                    // Keep history to a manageable length
                    const histLines = termBody.querySelectorAll('.term-hist-line, .term-output-line');
                    if (histLines.length > 14) {
                        histLines[0].remove();
                    }
                    typePrompt();
                }, pause);
            }
        }

        // Start after a short delay
        promptEl.style.color = '#8b5cf6';
        promptText.style.color = '#e2e8f0';
        timeoutId = setTimeout(typePrompt, 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initTerminal('hero-terminal'));
    } else {
        initTerminal('hero-terminal');
    }
})();

