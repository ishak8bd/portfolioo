import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Cpu,
  Activity,
  ShieldCheck,
  Gauge,
  Binary,
  Layers,
  Network,
  GitBranch,
} from 'lucide-react';

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.98, filter: 'blur(4px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 scroll-mt-20 relative z-10 border-t border-white/5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>System Matrix • Technical Depth</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Skills, Architecture & Depth
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-light">
          Strong mathematical and engineering fundamentals paired with practical experience shipping production AI, distributed microservices, and real-time engines.
        </p>
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Core Technology Stack (Wide 2-col) */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariant}
          whileHover={{ y: -4 }}
          className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#0b0d13] border border-white/10 relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-sky-500/20 transition-all duration-500" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Full-Pipeline Technology Stack</h3>
                <span className="text-xs text-zinc-400 font-mono">Data Science, ML & Production Backend</span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              Owning the complete path from raw data and reinforcement learning formulations to production REST APIs, distributed message queues, and responsive client dashboards.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {[
              'Python',
              'PyTorch',
              'FastAPI',
              'Docker',
              'Kafka',
              'Go',
              'React 19',
              'TypeScript',
              'PostgreSQL',
              'Redis',
              'LangChain',
              'Vector DBs (RAG)',
              'TD3 / SAC / PPO',
              'WebSockets',
              'Supabase',
              'Mapbox GL',
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 border border-white/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Card 2: Deep RL & Dynamic Pricing (1-col) */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariant}
          whileHover={{ y: -4 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#0b0d13] border border-white/10 relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

          <div>
            <div className="p-2.5 w-fit rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Deep RL & Pricing</h3>
            <span className="text-xs text-zinc-400 font-mono">Lei & Ukkusuri (2023) Extended</span>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
              Continuous-action surge pricing across 242 NYC zones and 1,365 simulated vehicles. Benchmarked TD3, SAC, and PPO with weather-aware state spaces.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Weekly Profit:</span>
            <span className="text-amber-400 font-bold">$240,949 (+18%)</span>
          </div>
        </motion.div>

        {/* Card 3: Concurrency & Data Integrity (1-col) */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariant}
          whileHover={{ y: -4 }}
          className="p-6 sm:p-8 rounded-2xl bg-[#0b0d13] border border-white/10 relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-500" />

          <div>
            <div className="p-2.5 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Data Integrity & Concurrency</h3>
            <span className="text-xs text-zinc-400 font-mono">PostgreSQL GiST & Zero-Trust</span>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
              PostgreSQL time-range exclusion constraints (EXCLUDE USING GIST) making double-booking structurally impossible. Zero-leak server-authoritative socket isolation for gaming.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Double Bookings:</span>
            <span className="text-emerald-400 font-bold">0 Structural</span>
          </div>
        </motion.div>

        {/* Card 4: Verified Metric Stat 1 (1-col) */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariant}
          whileHover={{ y: -4 }}
          className="p-6 rounded-2xl bg-[#0b0d13] border border-white/10 flex flex-col justify-center"
        >
          <div className="text-3xl sm:text-4xl font-black text-sky-400 font-mono tracking-tight">
            10+ Shipped
          </div>
          <div className="mt-1 text-xs text-zinc-300 font-bold">End-to-End AI & Software Projects</div>
          <div className="mt-0.5 text-xs text-zinc-500 font-mono">Chatbots, SaaS, APIs & Recommenders</div>
        </motion.div>

        {/* Card 5: Verified Metric Stat 2 (1-col) */}
        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariant}
          whileHover={{ y: -4 }}
          className="p-6 rounded-2xl bg-[#0b0d13] border border-white/10 flex flex-col justify-center"
        >
          <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
            +$71,024
          </div>
          <div className="mt-1 text-xs text-zinc-300 font-bold">Weekly Weather Lift (+41.8%)</div>
          <div className="mt-0.5 text-xs text-zinc-500 font-mono">576,805 simulated passengers/wk</div>
        </motion.div>

        {/* Card 6: Architectural Philosophy (Wide 2-col) */}
        <motion.div
          custom={5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariant}
          whileHover={{ y: -4 }}
          className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-[#0b0d13] border border-white/10 relative overflow-hidden flex flex-col justify-between group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Problems Beyond the Textbook</h3>
              <span className="text-xs text-zinc-400 font-mono">Turning Research into Production Reality</span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed font-light">
            &ldquo;I go looking for problems without a clean textbook answer: reinforcement learning agents competing across hundreds of micro-zones, language models that have to understand a mix of Algerian Darija, Arabic, French, and English — that&apos;s exactly where high-leverage engineering lives.&rdquo;
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Engineering Degree: Data Science Track</span>
            <span className="text-purple-400 font-semibold">Saad Dahleb University Blida 1</span>
          </div>
        </motion.div>

        {/* Card 7: Technical Depth Breakdown (Full-width / 4-col) */}
        <motion.div
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariant}
          className="md:col-span-3 lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-4">
            <Network className="w-4 h-4" />
            <span>Core Engineering Domains & Techniques</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-400 font-mono">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Distributed Systems</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                4-service microservices (FastAPI + Next.js + gateway + Postgres/Redis) kept synchronized via real-time webhooks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>NLP & Multi-Dialect RAG</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Semantic vector retrieval across Algerian Darija, Arabic, French, and English with phonetic normalization.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
                <Activity className="w-3.5 h-3.5" />
                <span>Real-Time Streaming</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Kafka + Go + WebSockets streaming pipelines with sub-second synchronization and live Mapbox telemetry.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fault Tolerance & WAL</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Crash-safe SQLite WAL checkpointing with session reconnection; zero game or transaction loss on disconnects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
