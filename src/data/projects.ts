import type { Project } from '../types/project';

export const PROJECTS: Project[] = [
  {
    id: 'ride-hailing-rl',
    index: '01 / 06',
    title: 'DYNAMIC PRICE OPTIMIZATION',
    tagline: 'Deep Reinforcement Learning surge pricing across 242 NYC zones with weather-aware telemetry',
    category: 'Deep RL & Dynamic Systems',
    year: '2026',
    client: 'Université Saad Dahleb × Purdue (Dr. Zengxiang Lei)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#38bdf8',
    stack: ['Python', 'Go', 'Kafka', 'WebSockets', 'TD3', 'SAC', 'PPO', 'React', 'Mapbox GL', 'Docker'],
    repoUrl: 'https://github.com/isaaxk',
    caseStudy: {
      problem:
        'Standard ride-hailing pricing models fail under volatile supply-demand shocks and sudden meteorological shifts. Coarse citywide multipliers create passenger dead-zones and driver misallocations across 242 dense urban micro-zones.',
      whyThisApproach:
        'Extended Lei & Ukkusuri (2023) by architecting a high-dimensional continuous-action RL environment across 242 zones and 1,365 simulated vehicles. Benchmarked continuous policies (TD3, SAC, PPO) coupled with weather-aware observation spaces and a sub-millisecond Go + WebSocket telemetry pipeline.',
      architecture: [
        'Continuous action-space policy benchmarking across TD3, SAC, and PPO',
        'Weather-aware observation vectors capturing precipitation and temperature shocks',
        'Go + Kafka telemetry streaming pipeline feeding real-time supply-demand signals',
        'Interactive React + Mapbox GL / deck.gl geospatial heatmap dashboard with Prometheus metrics'
      ],
      metrics: [
        { label: 'Weekly Profit', value: '$240,949' },
        { label: 'Baseline Lift', value: '+18%' },
        { label: 'Weather Uplift', value: '+$71,024' },
        { label: 'NYC Micro-Zones', value: '242 Zones' }
      ],
      whatBroke:
        'High-frequency state transitions across 242 zones caused severe Python GIL contention during parallel environment rollouts. Decoupled the telemetry ingestion into a lightweight Go daemon communicating over Unix domain sockets, cutting training telemetry latency by 85%.',
      keyTakeaway:
        'In continuous-action multi-agent environments, environmental context (like weather) often produces significantly higher commercial gains than hyperparameter tuning alone.'
    }
  },
  {
    id: 'multilingual-ai-agent',
    index: '02 / 06',
    title: 'MULTILINGUAL AI AGENT PLATFORM',
    tagline: 'Modular 4-service platform for WhatsApp commerce with 4-dialect RAG intent detection',
    category: 'AI Agents & Microservices',
    year: '2024',
    client: 'Enterprise Conversational Commerce',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#2dd4bf',
    stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'WhatsApp API', 'LangChain', 'RAG'],
    repoUrl: 'https://github.com/isaaxk',
    caseStudy: {
      problem:
        'Enterprise conversational commerce in North Africa faces a severe mixed-language challenge: users fluidly alternate between Algerian Darija, Modern Standard Arabic, French, and English within a single sentence, breaking standard off-the-shelf NLP tokenizers and intent classifiers.',
      whyThisApproach:
        'Engineered an event-driven 4-service microservices architecture (FastAPI backend, Next.js portal, messaging gateway, PostgreSQL/Redis layer) with a custom semantic RAG pipeline, dynamic tool execution, conversational memory buffers, and catalog browsing.',
      architecture: [
        'Custom multi-dialect NLP/RAG pipeline with semantic vector retrieval for mixed Darija/Arabic/French',
        'Decoupled 4-service microservices synchronized in real time via secure webhook streams',
        'Stateful AI agent workflows with dynamic tool calling and conversational memory buffers',
        'Self-service merchant configuration portal with catalog management and automated order fulfillment'
      ],
      metrics: [
        { label: 'Supported Dialects', value: '4 Dialects' },
        { label: 'Microservices', value: '4 Synced' },
        { label: 'Intent Accuracy', value: '96.4%' },
        { label: 'State Sync', value: '< 25ms' }
      ],
      whatBroke:
        'Dialectal code-switching caused semantic vector drift and hallucinatory tool invocations in zero-shot prompts. Solved by injecting phonetically normalized Latin-Arabic transliteration anchors and few-shot vernacular validation guards prior to tool dispatch.',
      keyTakeaway:
        'Real-world NLP requires meeting users in their native colloquial dialects rather than forcing them into artificial textbook language boundaries.'
    }
  },
  {
    id: 'unified-booking-engine',
    index: '03 / 06',
    title: 'UNIFIED MULTI-VERTICAL BOOKING ENGINE',
    tagline: 'Dual-capacity scheduling engine with database-level PostgreSQL exclusion constraints',
    category: 'Backend Architecture & Systems',
    year: '2024',
    client: 'Multi-Vertical SaaS Platform',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#fbbf24',
    stack: ['React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Deno', 'Node.js', 'Baileys', 'TailwindCSS'],
    repoUrl: 'https://github.com/isaaxk',
    caseStudy: {
      problem:
        'Traditional scheduling platforms leak architectural assumptions between appointment-based (staff 1-on-1) and capacity-based (shared pool resources) booking models, leading to database race conditions, double-bookings, and messy application code.',
      whyThisApproach:
        'Architected a unified dual-capacity scheduling abstraction that enforces concurrency safety directly at the database layer using PostgreSQL GiST time-range exclusion constraints (EXCLUDE USING GIST), paired with self-hosted WhatsApp session handling.',
      architecture: [
        'PostgreSQL EXCLUDE USING GIST constraints making double-booking structurally impossible at DB level',
        'Dual-capacity abstraction harmonizing 1-on-1 staff slots and pooled shared-resource limits',
        'Self-hosted WhatsApp messaging gateway (Baileys) for direct automated appointment confirmations',
        'Waitlist management with automatic cancelled-slot recycling and phone-based session authentication'
      ],
      metrics: [
        { label: 'Double Bookings', value: '0 Strict' },
        { label: 'DB Safety', value: 'GiST Locks' },
        { label: 'Slot Recycling', value: '< 500ms' },
        { label: 'Auth Pipeline', value: 'Phone/OTP' }
      ],
      whatBroke:
        'Application-level optimistic locking collapsed under simultaneous flash-booking promotions, resulting in phantom appointment confirmations. Moving exclusivity verification into native PostgreSQL GiST range constraints eradicated the concurrency bug completely.',
      keyTakeaway:
        'Never rely solely on application-layer guards for critical concurrency boundaries when database engines provide mathematically rigorous structural guarantees.'
    }
  },
  {
    id: 'server-authoritative-games',
    index: '04 / 06',
    title: 'REAL-TIME GAME ENGINES (DOMINO & POKER)',
    tagline: 'Zero-trust competitive multiplayer web games with continuous 2D geometry and 7-card evaluators',
    category: 'Real-Time Systems & Zero-Trust',
    year: '2024',
    client: 'Competitive Web Gaming Suite',
    image: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#f43f5e',
    stack: ['React 19', 'TypeScript', 'Node.js', 'Socket.io', 'SQLite (WAL)', 'TailwindCSS', 'WebSockets'],
    repoUrl: 'https://github.com/isaaxk',
    caseStudy: {
      problem:
        'Commercial multiplayer game apps either lack custom home rules, suffer from client-side state cheating, or desynchronize under real-world mobile network jitter and disconnects.',
      whyThisApproach:
        'Engineered a suite of server-authoritative game engines (All-Five Domino, Royal-Flush Texas Hold’em, Bottles-n-Puzzles). Built continuous 2D physical-freedom geometry placement validators, combinatorial side-pot solvers, and crash-safe SQLite WAL persistence.',
      architecture: [
        'Physical-freedom 2D continuous placement geometry validator (non-grid angles, double-6 to double-9)',
        'Full 7-card Texas Hold’em hand evaluator for all 10 rankings with kicker edge-case resolution',
        'Combinatorial side-pot resolution algorithm handling uneven multi-player all-ins',
        'Zero-leak socket transport isolation and crash-safe SQLite Write-Ahead Logging (WAL) state checkpointing'
      ],
      metrics: [
        { label: 'Client Trust', value: '0% Zero-Trust' },
        { label: 'Sync Jitter', value: '< 15ms' },
        { label: 'Hand Rankings', value: 'All 10 Ranks' },
        { label: 'Reconnection', value: 'State Preserved' }
      ],
      whatBroke:
        'Uneven multi-way all-in side pots with complex split kickers created edge-case payout discrepancies in early game rounds. Designed a recursive combinatorial pot ledger verified against a 500-case automated unit test suite before shipping.',
      keyTakeaway:
        'Server authoritativeness and zero-trust design are the only sustainable paths to competitive multiplayer integrity.'
    }
  },
  {
    id: 'autoled-platform',
    index: '05 / 06',
    title: 'AUTOLED — BILINGUAL AUTOMOTIVE PLATFORM',
    tagline: 'Full French ⇄ Arabic bilingual e-commerce & installation booking with 58-wilaya delivery logic',
    category: 'Full-Stack & Business Platforms',
    year: '2024',
    client: 'AutoLed Automotive Lighting',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#a855f7',
    stack: ['React (Vite)', 'Node.js', 'Express', 'TailwindCSS', 'RTL / LTR', 'Render Deployment'],
    repoUrl: 'https://github.com/isaaxk',
    caseStudy: {
      problem:
        'Building a commercial platform for an Algerian automotive lighting company required addressing real business constraints: nationwide cash-on-delivery tariffs across 58 wilayas, combined product purchasing with in-shop installation booking, and full Arabic/French bilingual parity.',
      whyThisApproach:
        'Constructed a production platform featuring automatic LTR/RTL layout switching, interactive before/after lighting beam comparisons, dynamic nationwide delivery pricing tables, and a full no-code administration back-office for non-technical shop managers.',
      architecture: [
        'Seamless French ⇄ Arabic bilingual architecture with automated CSS logical properties & RTL switching',
        'Integrated product purchasing and workshop appointment scheduling workflow',
        'Dynamic nationwide delivery matrix computing shipping rates across all 58 Algerian wilayas',
        'Comprehensive admin back-office: real-time order tracking, appointments, CSV export, and sales analytics'
      ],
      metrics: [
        { label: 'Algerian Wilayas', value: '58 Covered' },
        { label: 'Bilingual Support', value: 'FR ⇄ AR (RTL)' },
        { label: 'Admin Ops', value: '100% No-Code' },
        { label: 'Interactive Demos', value: 'Before/After' }
      ],
      whatBroke:
        'Switching between Arabic (RTL) and French (LTR) caused visual layout snapping and broken carousel offsets. Re-architected all positioning using CSS logical properties (`margin-inline`, `inset-inline-start`) and direction-aware layout hooks.',
      keyTakeaway:
        'True internationalization goes far beyond translating strings; it demands full spatial, typographic, and cultural awareness in layout engineering.'
    }
  },
  {
    id: 'smart-recommendation-engine',
    index: '06 / 06',
    title: 'SMART RECOMMENDATION ENGINE & APIS',
    tagline: 'Collaborative filtering & hybrid ranking system with low-latency Redis caching and high-throughput APIs',
    category: 'Machine Learning & High-Throughput APIs',
    year: '2023',
    client: 'Client Analytics & E-Commerce',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#06b6d4',
    stack: ['Python', 'FastAPI', 'Scikit-learn', 'Redis', 'PostgreSQL', 'Docker'],
    repoUrl: 'https://github.com/isaaxk',
    caseStudy: {
      problem:
        'Growing e-commerce catalogs faced cold-start degradation and high recommendation latency. Uncached recommendation queries during peak sales spikes caused database connection exhaustion and degraded checkout conversion.',
      whyThisApproach:
        'Developed a collaborative filtering and hybrid content-ranking engine evaluated rigorously offline (Precision@K, Recall@K, MAP, NDCG). Deployed as a horizontally scalable FastAPI microservice with sub-millisecond Redis caching layers.',
      architecture: [
        'Hybrid candidate generation combining matrix factorization and content-based feature embeddings',
        'Rigorous offline evaluation pipeline computing Precision@K, Recall@K, MAP, and NDCG benchmarks',
        'High-throughput asynchronous FastAPI microservice containerized with Docker',
        'Two-tier caching strategy utilizing Redis memory stores to achieve sub-5ms P99 inference response'
      ],
      metrics: [
        { label: 'P99 Latency', value: '< 4.2ms' },
        { label: 'Shipped Systems', value: '10+ Projects' },
        { label: 'Ranking Benchmarks', value: 'NDCG / MAP' },
        { label: 'Cache Hit Rate', value: '94.8%' }
      ],
      whatBroke:
        'User cold-starts caused sparse matrix factorization to return degenerate recommendations for newly registered users. Introduced an adaptive popular-trend fallback with demographic heuristics for zero-history sessions.',
      keyTakeaway:
        'Machine learning models are only as valuable as their serving infrastructure; sub-10ms response times turn smart predictions into seamless user delight.'
    }
  }
];
