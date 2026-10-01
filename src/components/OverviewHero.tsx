import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Briefcase,
  Sparkles,
  Zap,
  BrainCircuit,
  Code2,
  Database,
  Flame,
  Layers,
  ArrowRight,
  User,
} from 'lucide-react';

type LensRole = 'ai' | 'swe' | 'data';

export const OverviewHero: React.FC = () => {
  const [activeRole, setActiveRole] = useState<LensRole>('ai');

  const roleDetails = {
    ai: {
      title: 'AI Engineer',
      headline: 'Autonomous Agents & Deep RL Frontiers',
      tagline: 'Reinforcement learning agents, continuous-action surge pricing & custom LLM tool-calling architectures.',
      focus: 'TD3, SAC, PPO, Multi-Agent Coordination, RAG, Vector DBs, LangChain',
      badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300',
      accentGrad: 'from-cyan-400 via-sky-300 to-white',
    },
    swe: {
      title: 'Software Engineer',
      headline: 'Distributed Microservices & Real-Time Engines',
      tagline: 'High-concurrency platforms, Go/WebSockets, Kafka, PostgreSQL GiST constraints & zero-trust game engines.',
      focus: 'Python/FastAPI, Go, Docker, Kafka, PostgreSQL GiST, WebSockets, Supabase',
      badgeColor: 'border-blue-500/40 bg-blue-950/40 text-blue-300',
      accentGrad: 'from-blue-400 via-indigo-300 to-white',
    },
    data: {
      title: 'Data Scientist',
      headline: 'Geospatial Modeling & Empirical Optimization',
      tagline: 'Optimizing 242 NYC zones, weather lift estimation (+$71K) & time-series predictive systems.',
      focus: 'Purdue Research (Dr. Zengxiang Lei), Weather Impact Analytics, Time-Series Forecasters',
      badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300',
      accentGrad: 'from-emerald-400 via-teal-300 to-white',
    },
  };

  const currentLens = roleDetails[activeRole];

  const telemetryMetrics = [
    {
      label: 'Weekly Profit Lift',
      value: '+$71,024',
      sub: '+41.8% over baseline (576K pax/wk)',
      accent: 'text-amber-400',
    },
    {
      label: 'Multi-Agent Scale',
      value: '242 Zones',
      sub: '1,365 RL agents across NYC',
      accent: 'text-cyan-300',
    },
    {
      label: 'Shipped Platforms',
      value: '10+ Systems',
      sub: 'Production AI, SaaS & client APIs',
      accent: 'text-emerald-400',
    },
    {
      label: 'Telemetry Latency',
      value: '< 15ms',
      sub: 'Go + WebSockets real-time streaming',
      accent: 'text-violet-300',
    },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="overview" className="max-w-7xl mx-auto px-6 sm:px-8 pt-28 sm:pt-36 pb-16 sm:pb-20 scroll-mt-20 relative z-10">
      {/* Anchor for backward compatibility */}
      <div id="bento-grid" className="-mt-20 pt-20" />

      {/* Main Overview Typography & Hero Content */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16 sm:mb-20">
        {/* Availability & Motto Banner with Appearance Motion */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>OVERVIEW // ISHAK BOUDAOUD</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>Blida, DZ · UTC+1 · Open to Opportunities</span>
          </div>
        </motion.div>

        {/* Interactive Lens Selector Tabs with Appearance Motion */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-lg"
        >
          <span className="text-xs font-mono text-zinc-400 px-2 hidden sm:inline">
            Lens:
          </span>
          <button
            onClick={() => setActiveRole('ai')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeRole === 'ai'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Engineer</span>
          </button>

          <button
            onClick={() => setActiveRole('swe')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeRole === 'swe'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm shadow-blue-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Software Engineer</span>
          </button>

          <button
            onClick={() => setActiveRole('data')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeRole === 'data'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Data Scientist</span>
          </button>
        </motion.div>

        {/* Dynamic Headline & Focus Pill with Appearance Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-6 w-full"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] mb-4">
                Engineering the <br />
                <span className={`bg-gradient-to-r ${currentLens.accentGrad} bg-clip-text text-transparent`}>
                  {currentLens.headline}
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-5">
                {currentLens.tagline}
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono border ${currentLens.badgeColor} backdrop-blur-md`}>
                <Zap className="w-3.5 h-3.5" />
                <span>Core: {currentLens.focus}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Quick Action Navigation CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3"
        >
          <button
            onClick={() => scrollTo('about')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <User className="w-4 h-4 text-cyan-600" />
            <span>About Me & Ethos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollTo('projects')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs sm:text-sm font-medium transition-all hover:border-white/25 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Projects Showcase (06)</span>
          </button>

          <button
            onClick={() => scrollTo('experience')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>Experience Timeline</span>
          </button>

          <button
            onClick={() => scrollTo('skills')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4 text-violet-400" />
            <span>Skills Matrix</span>
          </button>
        </motion.div>
      </div>

      {/* Telemetry Metrics Row */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
        {telemetryMetrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{ y: -3 }}
            className="p-4 rounded-xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group bg-[#090c15]/70 shadow-lg"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                {metric.label}
              </span>
              <Activity className="w-3.5 h-3.5 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className={`text-xl sm:text-2xl font-bold font-mono ${metric.accent} transition-colors`}>
              {metric.value}
            </div>
            <div className="text-[11px] text-zinc-400 font-mono mt-0.5 truncate">
              {metric.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
