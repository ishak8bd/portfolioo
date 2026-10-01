import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Briefcase,
  Layers,
  Sparkles,
  GitBranch,
  Flame,
  Award,
  GraduationCap,
  Compass,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
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

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Narrative & Ethos Pillars (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
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

        {/* RIGHT COLUMN: Academic Foundation & Research Milestones (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Card 1: Academic Degree */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Diplôme d&apos;Ingénieur d&apos;État en Informatique
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  Saad Dahleb University Blida 1 · 5th Year
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              5-year integrated Engineering Curriculum (B.S. + M.S. equivalent) specialized in Data Science & Artificial Intelligence. Rigorous foundation in probability, linear algebra, graph algorithms, and machine learning.
            </p>
          </div>

          {/* Card 2: Research Track with Purdue */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Purdue Deep RL Research Extension
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  Guided by Dr. Zengxiang Lei (Purdue Univ.)
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              Extending continuous action reinforcement learning (TD3/SAC/PPO) for surge pricing across 242 NYC zones, simulating 1,365 vehicles and demonstrating +$71K weekly weather lift.
            </p>
          </div>

          {/* Card 3: Production Engineering Standard */}
          <div className="p-6 rounded-2xl bg-[#090b10] border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  End-to-End Ownership Standard
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  10+ Production Platforms Delivered
                </span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-zinc-300 font-light">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Mathematical modeling to containerized deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>PostgreSQL GiST zero-conflict database guarantees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Sub-15ms real-time WebSockets streaming telemetry</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
