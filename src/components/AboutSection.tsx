import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  MapPin,
  Mail,
  Briefcase,
  Layers,
  Sparkles,
  GitBranch,
  Flame,
  Award,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  // 3D Tilt calculation for Cybernetic Profile Card
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 scroll-mt-20 relative z-10 border-t border-white/5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Profile & Ethos • About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Turning Research Concepts into Working Production Solutions.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-light">
          Bridging continuous action reinforcement learning, empirical optimization, and high-concurrency distributed software engineering.
        </p>
      </motion.div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* LEFT COLUMN: Narrative & Ethos Pillars (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -35, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Engineering Narrative */}
          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            <p>
              I’m a final-year <strong className="text-white font-medium">Computer Science Engineering student</strong> (Data Science Track) at Université Saad Dahleb Blida 1, and an <strong className="text-white font-medium">AI & Software Engineer</strong> shipping production AI systems and distributed software.
            </p>
            <p>
              My expertise spans the entire pipeline: from continuous action Deep Reinforcement Learning formulations (TD3/SAC/PPO) and multi-dialect RAG retrieval architectures to high-concurrency Go microservices, Kafka streaming pipelines, and PostgreSQL GiST constraints.
            </p>
            <blockquote className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-cyan-400 border-white/5 font-mono text-xs sm:text-sm text-zinc-300 italic">
              &ldquo;I go looking for problems without a clean textbook answer: continuous RL agents competing across hundreds of micro-zones, language models that have to understand a mix of Algerian Darija, Arabic, French, and English — that&apos;s exactly where high-leverage engineering lives.&rdquo;
            </blockquote>
          </div>

          {/* Core Ethos Pillars (3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#090b10] border border-white/10 hover:border-cyan-500/30 transition-all space-y-2 group">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                <Award className="w-4 h-4 shrink-0" />
                <span>Empirical Rigor</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Extending academic research (Lei & Ukkusuri 2023) into scalable simulation algorithms with verified business lifts (+$71K).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090b10] border border-white/10 hover:border-blue-500/30 transition-all space-y-2 group">
              <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold">
                <GitBranch className="w-4 h-4 shrink-0" />
                <span>Concurrency</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Structural zero-conflict design via PostgreSQL GiST exclusion constraints, Go WebSockets, and sub-15ms sync.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090b10] border border-white/10 hover:border-emerald-500/30 transition-all space-y-2 group">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                <Shield className="w-4 h-4 shrink-0" />
                <span>Zero-Loss WAL</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Crash-safe SQLite WAL checkpointing with instant reconnection, zero transactional or game-state loss.
              </p>
            </div>
          </div>

          {/* Quick Section Navigation Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Explore Projects (06)</span>
            </button>

            <button
              onClick={() => scrollTo('experience')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 text-xs sm:text-sm font-medium transition-all hover:border-white/25 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Career & Research Timeline</span>
            </button>

            <button
              onClick={() => scrollTo('skills')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-zinc-300 hover:text-white border border-white/10 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Technical Skills</span>
            </button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Profile Picture Cybernetic HUD Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 35, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
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
    </section>
  );
};
