import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  CheckCircle2,
  MapPin,
  Award,
  TrendingUp,
} from 'lucide-react';

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  tech: string[];
  highlight?: string;
  link?: string;
}

export const ExperienceSection: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      role: 'Freelance AI & Software Engineer',
      organization: 'Self-Employed / Global Client Engagements',
      period: 'Nov 2023 — Present',
      location: 'Remote',
      type: 'Production Engineering',
      summary:
        'Two years and 10+ shipped client projects. Owning the complete path from ambiguous business requirements and raw data to deployed APIs, intelligent agents, and reactive web applications.',
      achievements: [
        'Custom conversational AI agents & RAG pipelines with stateful tool calling, memory, and multi-dialect intent detection (Algerian Darija, Arabic, French, English).',
        'Production REST APIs and asynchronous microservices built end-to-end with Python, FastAPI, PostgreSQL, Redis, and Docker.',
        'Client-facing analytical dashboards with real-time telemetry, demand and sales forecasting, and anomaly detection engines.',
        'Unified multi-vertical booking and scheduling engine enforcing database-level concurrency protection via PostgreSQL GiST time-range constraints.',
      ],
      tech: ['Python', 'FastAPI', 'LangChain', 'RAG / Vector DBs', 'PostgreSQL', 'Redis', 'Docker', 'React 19', 'TypeScript'],
      highlight: '10+ Shipped Platforms',
    },
    {
      role: 'Student Researcher — Deep RL for Dynamic Pricing',
      organization: 'Université Saad Dahleb Blida 1 × Purdue University',
      period: 'May 2026 — Present',
      location: 'Blida, Algeria & West Lafayette, IN',
      type: 'Applied Research',
      summary:
        'Extended Lei & Ukkusuri (2023) to optimize continuous surge pricing across 242 NYC taxi zones (1,365 competing vehicles) using continuous-action RL under supervision of Dr. Zengxiang Lei (Purdue).',
      achievements: [
        'Weekly Profit Optimization: Achieved $240,949/week (~18% above published baseline) across 5 rigorous benchmark seeds.',
        'Weather-Aware Policy Lift: Demonstrated +$71,024 (+41.8%) profit increase over non-weather models across 576,805 simulated passengers.',
        'Benchmarked TD3, SAC, and PPO against each other rather than picking an arbitrary algorithm, proving deterministic policy superiority in continuous supply-demand imbalances.',
        'Telemetry Dashboard: Real-time fare and demand streaming engine built with Go, Kafka, WebSockets, React 19 & Mapbox GL.',
      ],
      tech: ['PyTorch', 'TD3', 'SAC', 'PPO', 'Go', 'Kafka', 'WebSockets', 'Mapbox GL', 'Docker', 'Python'],
      highlight: '+$71,024 Weather Lift',
    },
    {
      role: 'Real-Time & Distributed Systems Architect',
      organization: 'Open Source & Independent Systems',
      period: '2024 — Present',
      location: 'Algeria',
      type: 'Systems & Networking',
      summary:
        'Engineered high-concurrency real-time engines with strict zero-trust client architectures, sub-second synchronization, and persistent fault tolerance.',
      achievements: [
        'Royal Flush: Fully server-authoritative Texas Hold\'em engine with 7-card hand evaluators, combinatorial side-pot solvers for uneven all-ins, and session-based mid-hand reconnection.',
        'All-Five Domino: Continuous 2D non-grid placement geometry validator, generalized sets (double-6 to double-9), zero-leak socket transport isolation, and SQLite WAL crash-safe checkpoints.',
        'Bottles & Puzzles: Real-time party game engine with sub-second synchronized starts across network jitter, drift-free progress streaming, and deterministic tiebreaks.',
      ],
      tech: ['TypeScript', 'Node.js', 'Socket.io', 'WebSockets', 'SQLite WAL', 'PostgreSQL', 'TailwindCSS'],
      highlight: 'Zero-Trust Architecture',
    },
  ];

  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-6 sm:px-8 scroll-mt-20 relative z-10">
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>03 // TRAJECTORY & EXPERIENCE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Engineering Journey &{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Research Track
          </span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Detailed breakdown of production engineering engagements, reinforcement learning research with Purdue, and distributed architecture builds.
        </p>
      </div>

      {/* Main Grid: Career Timeline (7 cols) + Academic & Depth (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Timeline Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Glowing Node Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#060709] border-2 border-emerald-500 group-hover:scale-125 transition-transform duration-300 shadow-md shadow-emerald-500/40" />

                {/* Experience Card */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0b0d13] border border-white/10 group-hover:border-emerald-500/40 transition-all duration-300 shadow-xl group-hover:shadow-emerald-950/20">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30">
                        {exp.period}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/30 border border-cyan-500/20">
                        {exp.type}
                      </span>
                    </div>

                    {exp.highlight && (
                      <span className="text-[11px] font-mono font-semibold text-amber-400 flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{exp.highlight}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 mt-1 mb-3">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{exp.organization}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-500">{exp.location}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  {/* Achievements List */}
                  <ul className="space-y-2 mb-5">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 border border-white/5 hover:border-emerald-500/30 hover:text-zinc-200 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Education & Engineering Pillars (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#0b0d13] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center gap-2.5 mb-4 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>Academic Foundation</span>
            </div>

            <h4 className="text-lg font-bold text-white mb-1">
              Diplôme d'Ingénieur d'État en Informatique
            </h4>
            <div className="text-xs font-mono text-zinc-400 mb-3">
              Université Saad Dahleb de Blida 1 · Final-Year Student
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 mb-4 text-xs text-zinc-300 leading-relaxed">
              <div>
                <strong className="text-white font-medium">Track:</strong> Data Science & Artificial Intelligence
              </div>
              <div>
                <strong className="text-white font-medium">Program:</strong> 5-Year Integrated Engineering Curriculum (B.S. + M.S. equivalent)
              </div>
              <div>
                <strong className="text-white font-medium">Focus:</strong> Deep Reinforcement Learning, Autonomous Agents, High-Throughput Distributed Microservices.
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Rigorous mathematical training in probability, linear algebra, graph algorithms, and optimization paired with continuous software engineering execution.
            </p>
          </motion.div>

          {/* Research & Production Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-6 sm:p-7 rounded-2xl bg-[#0b0d13] border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl space-y-4"
          >
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Engineering Execution Standard</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-bold text-white mb-0.5">End-to-End Ownership</div>
                <div className="text-xs text-zinc-400">
                  From mathematical formulation and model training to containerized APIs, databases, and client frontends.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-bold text-white mb-0.5">Zero-Trust & Data Integrity</div>
                <div className="text-xs text-zinc-400">
                  Database-level constraints (GiST) and server-authoritative state machines to guarantee mathematical correctness.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-bold text-white mb-0.5">Real-Time Telemetry</div>
                <div className="text-xs text-zinc-400">
                  Sub-15ms streaming latency using Go and WebSockets for live model evaluation under network jitter.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
