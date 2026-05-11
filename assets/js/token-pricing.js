window.TOKENOPS_PRICING = {
  version: '2026-05',
  last_verified: '2026-05-10',
  display_last_verified: 'May 2026',
  providers: [
    {
      id: 'claude',
      name: 'Claude (Anthropic)',
      models: [
        {
          id: 'haiku',
          name: 'Claude Haiku 4.5',
          input_per_mtok: 1.00,
          output_per_mtok: 5.00,
          context_window_k: 1000,
          tier: 'fast',
          is_legacy: false,
          reasoning: false,
          vision: true,
          speed: 'fast',
          best_for: 'Classification, summarization, high-volume tasks',
          color: '#22c55e',
          source: 'https://docs.anthropic.com/en/docs/about-claude/pricing'
        },
        {
          id: 'sonnet',
          name: 'Claude Sonnet 4.6',
          input_per_mtok: 3.00,
          output_per_mtok: 15.00,
          context_window_k: 1000,
          tier: 'balanced',
          is_legacy: false,
          reasoning: false,
          vision: true,
          speed: 'medium',
          best_for: 'Production AI systems, reasoning + speed balance',
          color: '#3b82f6',
          source: 'https://docs.anthropic.com/en/docs/about-claude/pricing'
        },
        {
          id: 'opus',
          name: 'Claude Opus 4.7',
          input_per_mtok: 5.00,
          output_per_mtok: 25.00,
          context_window_k: 1000,
          tier: 'powerful',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'slow',
          best_for: 'Complex reasoning, research, advanced code generation',
          color: '#8b5cf6',
          source: 'https://docs.anthropic.com/en/docs/about-claude/pricing'
        }
      ]
    },
    {
      id: 'gpt',
      name: 'OpenAI GPT',
      models: [
        {
          id: 'gpt55',
          name: 'GPT-5.5',
          input_per_mtok: 5.00,
          cached_input_per_mtok: 0.50,
          output_per_mtok: 30.00,
          context_window_k: 1050,
          tier: 'balanced',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'medium',
          best_for: 'Production workloads, reasoning tasks, versatile reasoning',
          color: '#06b6d4',
          source: 'https://developers.openai.com/api/docs/models/gpt-5.5'
        },
        {
          id: 'gpt55p',
          name: 'GPT-5.5 Pro',
          input_per_mtok: 30.00,
          output_per_mtok: 180.00,
          context_window_k: 1050,
          tier: 'powerful',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'slow',
          best_for: 'Complex reasoning, research, advanced problem-solving',
          color: '#0ea5e9',
          source: 'https://developers.openai.com/api/docs/models/gpt-5.5-pro'
        }
      ]
    }
  ]
};
