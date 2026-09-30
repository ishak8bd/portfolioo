import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Cpu, Activity, ShieldCheck, Gauge, Binary } from 'lucide-react';

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
    <section id="bento-grid" className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
      {/* Header with Scroll-Triggered Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>System Matrix • Overview</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Skills, Stack & Philosophy
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
          Engineered for extreme performance, predictable memory models, and bespoke visual fidelity.
        </p>
      </motion.div>

      {/* Bento Grid Layout with Staggered Scroll-Triggered Reveals */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Primary Engineering Stack (Wide 2-col) */}
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
                <h3 className="text-lg font-bold text-white">Core Technology Stack</h3>
                <span className="text-xs text-zinc-400 font-mono">Modern Frontend & Graphics</span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              Bridging modern component state with bare-metal web graphics. Zero hesitation in dropping down to GLSL shaders, WebAssembly modules, or Web Workers when the main thread needs protection.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {[
              'React 19',
              'TypeScript',
              'WebGL / Three.js',
              'GLSL Shaders',
              'WebAssembly (Rust)',
              'Framer Motion',
              'Tailwind CSS',
              'OffscreenCanvas',
              'Web Workers',
              'FlatBuffers',
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

        {/* Card 2: Performance Philosophy (1-col) */}
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
            <h3 className="text-lg font-bold text-white mb-1">Sub-16ms Frame Budget</h3>
            <span className="text-xs text-zinc-400 font-mono">Uncompromising Fluidity</span>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
              Every transition, gesture, and telemetry feed is profiled for 0 jank. If a layout thrash occurs, we re-architect.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Target: 120 FPS</span>
            <span className="text-emerald-400 font-bold">100% Achieved</span>
          </div>
        </motion.div>

        {/* Card 3: Zero Memory Leaks & GC Discipline (1-col) */}
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
            <h3 className="text-lg font-bold text-white mb-1">Memory Discipline</h3>
            <span className="text-xs text-zinc-400 font-mono">Zero Heap Degradation</span>
            <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
              Strict object pool reuse and buffer disposal. Applications built to run continuously in trading rooms and operations centers for months without restart.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>GC Pauses:</span>
            <span className="text-emerald-400 font-bold">&lt; 1.2ms</span>
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
            &lt; 3.2ms
          </div>
          <div className="mt-1 text-xs text-zinc-300 font-bold">P99 Render Latency</div>
          <div className="mt-0.5 text-xs text-zinc-500 font-mono">Institutional trading orderbook</div>
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
            1,420 → 14
          </div>
          <div className="mt-1 text-xs text-zinc-300 font-bold">GPU Draw Calls Reduction</div>
          <div className="mt-0.5 text-xs text-zinc-500 font-mono">Instanced vertex shader passes</div>
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
              <h3 className="text-base sm:text-lg font-bold text-white">Cinematic Systems Thinking</h3>
              <span className="text-xs text-zinc-400 font-mono">Design Meets Systems Engineering</span>
            </div>
          </div>

          <p className="text-sm text-zinc-300 leading-relaxed">
            "Animation without performance is an annoyance. Performance without aesthetics is sterile. The sweet spot is cinema-grade motion backed by brutalist systems architecture."
          </p>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Philosophy</span>
            <span className="text-purple-400">Zero compromises</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
