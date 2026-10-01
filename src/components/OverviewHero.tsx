import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Briefcase,
  Zap,
  BrainCircuit,
  Code2,
  Database,
  Flame,
  Layers,
  ArrowRight,
  Shield,
  MapPin,
  Mail,
  User,
  Pause,
  Play,
} from 'lucide-react';

type LensRole = 'ai' | 'swe' | 'data';

export const OverviewHero: React.FC = () => {
  const [activeRole, setActiveRole] = useState<LensRole>('ai');
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);

  // Automatically cycle through AI Engineer, Software Engineer, and Data Scientist
  useEffect(() => {
    if (!isAutoCycling) return;
    const roles: LensRole[] = ['ai', 'swe', 'data'];
    const timer = setInterval(() => {
      setActiveRole((prev) => {
        const nextIdx = (roles.indexOf(prev) + 1) % roles.length;
        return roles[nextIdx];
      });
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoCycling]);

  // 3D Tilt calculation for Profile Picture Card
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const roleDetails = {
    ai: {
      categoryTag: 'SPECIALIZATION 01 // ARTIFICIAL INTELLIGENCE',
      title: 'AI Engineer',
      headline: 'Autonomous Agents & Deep RL Frontiers',
      tagline: 'Reinforcement learning agents, continuous-action surge pricing & custom LLM tool-calling architectures.',
      focus: 'TD3, SAC, PPO, Multi-Agent Coordination, RAG, Vector DBs, LangChain',
      badgeColor: 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300',
      accentGrad: 'from-cyan-400 via-sky-300 to-white',
    },
    swe: {
      categoryTag: 'SPECIALIZATION 02 // DISTRIBUTED SYSTEMS',
      title: 'Software Engineer',
      headline: 'Distributed Microservices & Real-Time Engines',
      tagline: 'High-concurrency platforms, Go/WebSockets, Kafka, PostgreSQL GiST constraints & zero-trust game engines.',
      focus: 'Python/FastAPI, Go, Docker, Kafka, PostgreSQL GiST, WebSockets, Supabase',
      badgeColor: 'border-blue-500/40 bg-blue-950/40 text-blue-300',
      accentGrad: 'from-blue-400 via-indigo-300 to-white',
    },
    data: {
      categoryTag: 'SPECIALIZATION 03 // APPLIED DATA SCIENCE',
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

      {/* ======================================================== */}
      {/* OVERVIEW 2-COLUMN ROW: Overview Text (Left) & Profile Card (Right) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 sm:mb-18 items-center">
        {/* LEFT COLUMN: Overview Typography & Interactive Lens (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Automatically Rotating Dynamic Role Badge & Controls */}
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-5 flex flex-wrap items-center gap-2.5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono border backdrop-blur-md ${currentLens.badgeColor}`}
              >
                {activeRole === 'ai' && <BrainCircuit className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
                {activeRole === 'swe' && <Code2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />}
                {activeRole === 'data' && <Database className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />}
                <span className="font-semibold tracking-wider uppercase">{currentLens.categoryTag}</span>
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${isAutoCycling ? 'animate-ping opacity-75' : 'opacity-40'}`} />
              </motion.div>
            </AnimatePresence>

            {/* Subtle cycling progress indicator dots */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10">
              {(['ai', 'swe', 'data'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRole(r)}
                  title={`Switch to ${roleDetails[r].title}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    activeRole === r ? 'bg-cyan-400 scale-125' : 'bg-zinc-600 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>

            {/* Small Pause / Play Auto-cycle Button */}
            <button
              onClick={() => setIsAutoCycling((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
              title={isAutoCycling ? 'Pause automatic role rotation' : 'Resume automatic role rotation'}
            >
              {isAutoCycling ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] tracking-wider uppercase text-zinc-400">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400/20" />
                  <span className="text-[10px] tracking-wider uppercase text-emerald-400 font-semibold">Play</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Dynamic Headline & Focus Pill with Appearance Motion */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
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
                {/* 1. Main Role Title: AI Engineer / Software Engineer / Data Scientist (significantly BIGGER) */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] mb-3">
                  <span className={`bg-gradient-to-r ${currentLens.accentGrad} bg-clip-text text-transparent drop-shadow-sm`}>
                    {currentLens.title}
                  </span>
                </h1>

                {/* 2. Secondary Subhead: Engineering the ... (smaller than role title) */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 leading-snug mb-3">
                  <span className="text-zinc-400 font-normal">Engineering the </span>
                  <span className="text-white">{currentLens.headline}</span>
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



          {/* Quick Action Navigation CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
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

        {/* RIGHT COLUMN: Profile Picture Cybernetic HUD Card (5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end"
        >
          {/* Cybernetic Aura / Ambient Backglow */}
          <div className="relative group/avatar w-full max-w-[420px] mx-auto lg:mr-0">
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
      {/* TELEMETRY METRICS ROW                                    */}
      {/* ======================================================== */}
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
