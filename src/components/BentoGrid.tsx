import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Cpu,
  Activity,
  ShieldCheck,
  Gauge,
  Binary,
  Layers,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Mail,
  Zap,
  Shield,
  BrainCircuit,
  Code2,
  Database,
  Network,
  GitBranch,
  Flame,
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

type LensRole = 'ai' | 'swe' | 'data';

export const BentoGrid: React.FC = () => {
  const [activeRole, setActiveRole] = useState<LensRole>('ai');

  // 3D Tilt calculation for Profile Card (inspired by ProfileAvatar from isaaxk/portfolio)
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

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

  return (
    <section id="overview" className="max-w-7xl mx-auto px-6 sm:px-8 pt-28 sm:pt-36 pb-20 scroll-mt-20 relative z-10">
      {/* Anchor for backward compatibility */}
      <div id="bento-grid" className="-mt-20 pt-20" />

      {/* ======================================================== */}
      {/* 1. OVERVIEW TOP ROW: About Me (Left) & Profile Card (Right) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 sm:mb-16 items-center">
        {/* LEFT COLUMN: Overview / About Me Typography & Interactive Lens (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Availability & Motto Banner with Appearance Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>OVERVIEW // ABOUT ME</span>
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
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-wrap items-center gap-2 mb-6 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-lg w-fit"
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
            initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.12] mb-3">
                  Engineering the <br className="hidden sm:inline" />
                  <span className={`bg-gradient-to-r ${currentLens.accentGrad} bg-clip-text text-transparent`}>
                    {currentLens.headline}
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed mb-4">
                  {currentLens.tagline}
                </p>
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono border ${currentLens.badgeColor} backdrop-blur-md`}>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Core: {currentLens.focus}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Condensed Bio & Engineering Philosophy with Appearance Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="space-y-2.5 text-zinc-300 text-sm sm:text-base leading-relaxed font-light my-5 pt-4 border-t border-white/10 max-w-2xl"
          >
            <p>
              Final-year <strong className="text-white font-medium">Computer Science Engineering student</strong> (Data Science track) at Université Saad Dahleb Blida 1. Focused on continuous Deep Reinforcement Learning agents, multi-dialect RAG pipelines, and high-concurrency real-time microservices.
            </p>
            <p className="italic text-zinc-400 text-xs sm:text-sm font-mono flex items-center gap-2">
              <span className="text-cyan-400 font-bold">&ldquo;</span>
              <span>Open to interesting problems — especially the ones that don&apos;t fit in a textbook.</span>
              <span className="text-cyan-400 font-bold">&rdquo;</span>
            </p>
          </motion.div>

          {/* Quick Action Buttons with Appearance Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 mb-6"
          >
            <button
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>View Experience Timeline</span>
            </button>

            <button
              onClick={() => document.getElementById('marquee-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs sm:text-sm font-medium transition-all hover:border-white/25 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Flagship Systems (06)</span>
            </button>

            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Case Studies</span>
            </button>
          </motion.div>

          {/* Academic & Engineering Footnote with Appearance Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs font-mono text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Saad Dahleb Blida 1 · 5th Year CS Eng.</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Full Pipeline: Research to Production</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Profile Picture Cybernetic HUD Card (5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: 45, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end"
        >
          {/* Cybernetic Aura / Ambient Backglow (inspired by isaaxk/portfolio ProfileAvatar) */}
          <div className="relative group/avatar w-full max-w-[420px] mx-auto">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 via-violet-600/30 to-blue-500/30 rounded-3xl blur-xl opacity-75 group-hover/avatar:opacity-100 transition duration-700 pointer-events-none" />

            {/* 3D Tilt Card Container */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full rounded-2xl glass-panel border border-cyan-500/30 p-4 shadow-2xl bg-[#090c15]/95 backdrop-blur-xl overflow-hidden"
            >
              {/* Top HUD Bar */}
              <div className="flex items-center justify-between px-2 pb-2.5 mb-3 border-b border-white/10 text-[11px] font-mono select-none">
                <div className="flex items-center gap-1.5 text-cyan-300 font-semibold tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SYS_ID // 0x7F4A</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400 font-bold">L5_ONLINE</span>
                </div>
              </div>

              {/* Picture Viewport Frame with Cybernetic Corner Brackets */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 group/img">
                {/* Cybernetic Corner Brackets */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-20" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-20" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-20" />

                {/* Profile Image */}
                <img
                  src="/profile.jpg"
                  alt="Ishak Boudaoud"
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.08] transition-transform duration-700 ease-out group-hover/img:scale-105 select-none"
                />

                {/* Moving Luminous Scanner Beam */}
                <motion.div
                  animate={{ y: ['-100%', '280%'] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none z-10"
                />

                {/* Holographic Scanline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent opacity-60 pointer-events-none" />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090c15] via-transparent to-transparent opacity-85 pointer-events-none" />

                {/* Floating Spec Badge at bottom left */}
                <div className="absolute bottom-3 left-3 z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#07080c]/90 border border-cyan-500/40 backdrop-blur-md text-[11px] font-mono text-cyan-300 shadow-md">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Deep RL & Agent Architect</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="pt-3 px-1 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-white font-bold tracking-tight text-sm">
                    Ishak Boudaoud
                  </div>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-violet-400 shrink-0" />
                    <span>Blida, Algeria · Saad Dahleb Univ.</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/10">
                  v22.0
                </div>
              </div>

              {/* Quick Interactive Actions */}
              <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-white/5">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://github.com/isaaxk"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://linkedin.com/in/ishak-boudaoud-8729ba251"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="mailto:truly.isaak@gmail.com"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-mono text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* 2. TELEMETRY METRICS ROW (Inspired by isaaxk/portfolio)   */}
      {/* ======================================================== */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20 text-left">
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

      {/* ======================================================== */}
      {/* 2. TECHNICAL DEPTH & ARCHITECTURAL MATRIX SECTION HEADER */}
      {/* ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>System Matrix • Technical Depth</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Skills, Architecture & Depth
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
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
              'Mapbox GL'
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

          <p className="text-sm text-zinc-300 leading-relaxed">
            "I go looking for problems without a clean textbook answer: reinforcement learning agents competing across hundreds of micro-zones, language models that have to understand a mix of Algerian Darija, Arabic, French, and English — that's exactly where high-leverage engineering lives."
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
              <p className="text-xs text-zinc-400 leading-relaxed">
                4-service microservices (FastAPI + Next.js + gateway + Postgres/Redis) kept synchronized via real-time webhooks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400 font-mono">
                <Layers className="w-3.5 h-3.5" />
                <span>NLP & Multi-Dialect RAG</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Semantic vector retrieval across Algerian Darija, Arabic, French, and English with phonetic normalization.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
                <Activity className="w-3.5 h-3.5" />
                <span>Real-Time Streaming</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Kafka + Go + WebSockets streaming pipelines with sub-second synchronization and live Mapbox telemetry.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fault Tolerance & WAL</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Crash-safe SQLite WAL checkpointing with session reconnection; zero game or transaction loss on disconnects.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
