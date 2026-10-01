import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Cpu,
  Activity,
  ShieldCheck,
  Gauge,
  Binary,
  Network,
  Layers,
  GitBranch,
  MapPin,
  Briefcase,
  Award,
  GraduationCap,
  Sparkles,
  Mail,
  Zap,
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

export const BentoGrid: React.FC = () => {
  return (
    <section id="overview" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 scroll-mt-20">
      {/* Anchor for backward compatibility */}
      <div id="bento-grid" className="-mt-20 pt-20" />

      {/* ======================================================== */}
      {/* 1. OVERVIEW TOP ROW: Profile Picture (Left) & About Me (Right) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-16 sm:mb-20 items-stretch">
        {/* LEFT COLUMN: Profile Picture Card (5 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: -45, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
          whileHover={{ y: -6 }}
          className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#0b0d13] border border-white/10 hover:border-sky-500/40 relative overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500"
        >
          {/* Ambient Lighting & Glowing Backdrop */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-sky-500/20 transition-all duration-700" />
          <motion.div
            animate={{ opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-12 -left-12 w-64 h-64 bg-teal-500/15 blur-[90px] rounded-full pointer-events-none"
          />

          <div>
            {/* Top Status & Availability Header */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for High-Impact Roles</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                DZ · UTC+1
              </span>
            </div>

            {/* Profile Picture Showcase Container */}
            <div className="relative w-full aspect-[4/4.3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group-hover:border-sky-500/50 transition-all duration-500 bg-[#06070a]">
              <motion.img
                src="/profile.jpg"
                alt="Ishak Boudaoud"
                className="w-full h-full object-cover object-top filter brightness-[0.96] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-105 select-none"
              />

              {/* Luminous Animated Scanner Beam Motion */}
              <motion.div
                animate={{ y: ['-100%', '280%'] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-sky-400/15 to-transparent pointer-events-none"
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-transparent to-transparent opacity-90 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d13]/60 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Overlay Identity Badge */}
              <div className="absolute bottom-3.5 left-4 right-4 z-10 flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400 mb-0.5">
                    AI & Software Engineer
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                    Ishak Boudaoud
                  </h3>
                </div>
                <div className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-zinc-300">
                  v22.0
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer: Metadata & Interactive Social Links */}
          <div className="mt-5 space-y-3.5">
            {/* Location & Academic Affiliation */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Blida, Algeria</span>
              </div>
              <span className="text-zinc-500">Saad Dahleb Univ.</span>
            </div>

            {/* Quick Interactive Actions */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="https://github.com/isaaxk"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
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
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
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
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-xs font-mono text-sky-400 hover:text-sky-300 border border-sky-500/30 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: About Me Narrative & Highlights Card (7 cols on lg) */}
        <motion.div
          initial={{ opacity: 0, x: 45, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          whileHover={{ y: -6 }}
          className="lg:col-span-7 p-6 sm:p-8 md:p-9 rounded-3xl bg-[#0b0d13] border border-white/10 hover:border-sky-500/40 relative overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500"
        >
          {/* Ambient Lighting Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />
          <motion.div
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 right-10 w-72 h-72 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none"
          />

          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Overview • About Me</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Turning Research Concepts into Working Production Solutions.
            </h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-3 text-zinc-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              <p>
                I’m a final-year <strong className="text-white font-medium">Computer Science Engineering student</strong> (Data Science Track) at Université Saad Dahleb Blida 1, and an <strong className="text-white font-medium">AI & Software Engineer</strong> with 2+ years of practical experience shipping AI and software products.
              </p>
              <p>
                I pair strong engineering fundamentals with real expertise in <strong className="text-white font-medium">Data Science, Machine Learning, Deep Reinforcement Learning (TD3, SAC, PPO)</strong>, and <strong className="text-white font-medium">LLM/RAG systems</strong>. My work spans the full pipeline: from mathematical formulation and model training to backend engineering, distributed microservices, and production deployment across freelance projects, academic research, and personal builds.
              </p>
            </div>

            {/* Interactive Experience & Research Feature Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* Highlight A: Freelance */}
              <motion.div
                whileHover={{ scale: 1.02, x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 transition-all space-y-1"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 font-mono">
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>Freelance AI & Software Engineer</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">10+ Shipped Client Platforms</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Custom RAG chatbots, SaaS platforms, demand recommenders, and Kafka/Go pipelines.
                </p>
              </motion.div>

              {/* Highlight B: Research */}
              <motion.div
                whileHover={{ scale: 1.02, x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 transition-all space-y-1"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 font-mono">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Deep RL & Dynamic Pricing</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">Blida 1 × Purdue (Dr. Zengxiang Lei)</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Continuous-action surge pricing across 242 NYC zones (TD3/SAC/PPO), +18% lift & +$71K weather lift.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom Academic & Engineering Philosophy Footer */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Saad Dahleb Blida 1 · 5th Year Eng. Student</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400">
              <Zap className="w-3.5 h-3.5 shrink-0" />
              <span>Full Pipeline: Research to Production</span>
            </div>
          </div>
        </motion.div>
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
