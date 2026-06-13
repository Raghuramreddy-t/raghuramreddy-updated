window.TOKENOPS_PRICING = {
  version: '2026-05-23',
  last_verified: '2026-05-23',
  display_last_verified: 'May 2026',
  providers: [
    {
      id: 'claude',
      name: 'Claude (Anthropic)',
      models: [
        {
          id: 'haiku35',
          name: 'Claude Haiku 3.5',
          release_date: '2024-10-22',
          input_per_mtok: 0.80,
          output_per_mtok: 4.00,
          context_window_k: 200,
          tier: 'fast',
          is_legacy: false,
          reasoning: false,
          vision: true,
          speed: 'fast',
          best_for: 'Classification, summarization, high-volume tasks',
          color: '#22c55e',
          source: 'https://docs.anthropic.com/en/docs/about-claude/models/overview'
        },
        {
          id: 'sonnet4',
          name: 'Claude Sonnet 4',
          release_date: '2025-05-22',
          input_per_mtok: 3.00,
          output_per_mtok: 15.00,
          context_window_k: 200,
          tier: 'balanced',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'medium',
          best_for: 'Production AI systems, reasoning + speed balance',
          color: '#3b82f6',
          source: 'https://docs.anthropic.com/en/docs/about-claude/models/overview'
        },
        {
          id: 'opus41',
          name: 'Claude Opus 4.1',
          release_date: '2025-08-05',
          input_per_mtok: 15.00,
          output_per_mtok: 75.00,
          context_window_k: 200,
          tier: 'powerful',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'slow',
          best_for: 'Complex reasoning, research, advanced code generation',
          color: '#8b5cf6',
          source: 'https://docs.anthropic.com/en/docs/about-claude/models/overview'
        }
      ]
    },
    {
      id: 'gpt',
      name: 'OpenAI GPT / ChatGPT',
      models: [
        {
          id: 'gpt55',
          name: 'GPT-5.5',
          release_date: '2026-04-23',
          deprecation_date: null,
          input_per_mtok: 5.00,
          cached_input_per_mtok: 0.50,
          output_per_mtok: 30.00,
          context_window_k: 1050,
          tier: 'powerful',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'slow',
          best_for: 'Professional work, coding, and long-running workflows',
          color: '#0f766e',
          source: 'https://openai.com/api/pricing/'
        },
        {
          id: 'gpt52',
          name: 'GPT-5.2',
          release_date: '2025-12-11',
          deprecation_date: null,
          input_per_mtok: 1.75,
          cached_input_per_mtok: 0.175,
          output_per_mtok: 14.00,
          context_window_k: 400,
          tier: 'balanced',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'medium',
          best_for: 'Production workloads, reasoning tasks, versatile reasoning',
          color: '#06b6d4',
          source: 'https://platform.openai.com/docs/pricing/'
        },
        {
          id: 'gpt5mini',
          name: 'GPT-5 mini',
          release_date: '2025-08-07',
          deprecation_date: null,
          input_per_mtok: 0.25,
          cached_input_per_mtok: 0.025,
          output_per_mtok: 2.00,
          context_window_k: 400,
          tier: 'fast',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'fast',
          best_for: 'High-volume tasks, summarization, classification, low-cost agent routing',
          color: '#60a5fa',
          source: 'https://platform.openai.com/docs/pricing/'
        },
        {
          id: 'gpt41',
          name: 'GPT-4.1',
          release_date: '2025-04-14',
          deprecation_date: '2026-02-13',
          deprecation_scope: 'ChatGPT',
          input_per_mtok: 2.00,
          cached_input_per_mtok: 0.50,
          output_per_mtok: 8.00,
          context_window_k: 1048,
          tier: 'balanced',
          is_legacy: true,
          reasoning: false,
          vision: true,
          speed: 'medium',
          best_for: 'Instruction following, tool calling, broad knowledge across domains',
          color: '#0891b2',
          source: 'https://platform.openai.com/docs/pricing/'
        }
      ]
    },
    {
      id: 'gemini',
      name: 'Gemini (Google)',
      models: [
        {
          id: 'gemini31pro',
          name: 'Gemini 3.1 Pro',
          release_date: '2026-02-19',
          deprecation_date: null,
          input_per_mtok: 2.00,
          cached_input_per_mtok: 0.20,
          output_per_mtok: 12.00,
          context_window_k: 1000,
          tier: 'balanced',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'medium',
          best_for: 'Complex reasoning, long-context analysis, codebases, and documents',
          color: '#a855f7',
          source: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/'
        },
        {
          id: 'gemini31flashlite',
          name: 'Gemini 3.1 Flash-Lite',
          release_date: '2026-03-03',
          deprecation_date: null,
          input_per_mtok: 0.25,
          output_per_mtok: 1.50,
          context_window_k: 1000,
          tier: 'fast',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'fast',
          best_for: 'High-throughput multimodal workflows, routing, and agent steps',
          color: '#8b5cf6',
          source: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite/'
        }
      ]
    },
    {
      id: 'grok',
      name: 'Grok (xAI)',
      models: [
        {
          id: 'grok43',
          name: 'Grok 4.3',
          release_date: '2026-05-09',
          deprecation_date: null,
          input_per_mtok: 1.25,
          cached_input_per_mtok: 0.20,
          output_per_mtok: 2.50,
          context_window_k: 1000,
          tier: 'balanced',
          is_legacy: false,
          reasoning: true,
          vision: true,
          speed: 'medium',
          best_for: 'Agentic tool use, broad reasoning, and multimodal workflows',
          color: '#f59e0b',
          source: 'https://docs.x.ai/developers/pricing'
        }
      ]
    }
  ]
};
