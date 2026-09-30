import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, AlertTriangle, Lightbulb, CheckCircle2, Layers } from 'lucide-react';
import type { Project } from '../types/project';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#040507]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0c0e14] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Accent Glow behind top */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl opacity-20 pointer-events-none rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />

            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0c0e14]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  {project.index}
                </span>
                <span className="text-zinc-600">/</span>
                <span
                  className="px-2.5 py-0.5 text-xs font-medium rounded-full border border-white/10"
                  style={{
                    backgroundColor: `${project.accentColor}15`,
                    color: project.accentColor,
                    borderColor: `${project.accentColor}30`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                  {project.year}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors duration-200 border border-white/10"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 space-y-10">
              {/* Title & Tagline */}
              <div>
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                    {project.title}
                  </h2>
                  <span className="text-sm font-mono text-zinc-400">
                    for {project.client}
                  </span>
                </div>
                <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl font-light leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              {/* Hero Image Showcase */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono tracking-wider rounded-md bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {project.caseStudy.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                  >
                    <div
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                      style={{ color: project.accentColor }}
                    >
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs text-zinc-400 font-mono uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Case Study Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-4 border-t border-white/5">
                {/* Problem Statement */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>The Core Challenge</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Where Standard Approaches Failed
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </div>

                {/* Why This Approach */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-sky-400">
                    <Cpu className="w-4 h-4" />
                    <span>Engineering Decision</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Why This Architecture
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {project.caseStudy.whyThisApproach}
                  </p>
                </div>
              </div>

              {/* Architectural Highlights */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-emerald-400">
                  <Layers className="w-4 h-4" />
                  <span>Key Architectural Decisions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.caseStudy.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-lg bg-white/[0.02] border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-sm text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post-Mortem & What Broke */}
              <div className="p-6 rounded-xl bg-red-950/20 border border-red-500/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Post-Mortem: What Broke in Production</span>
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {project.caseStudy.whatBroke}
                </p>
              </div>

              {/* Key Takeaway */}
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
                <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Engineering Takeaway
                  </div>
                  <div className="text-sm sm:text-base text-zinc-200 font-medium italic">
                    "{project.caseStudy.keyTakeaway}"
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-t border-white/5 bg-[#090b10]">
              <span className="text-xs text-zinc-500 font-mono">
                Press ESC to close
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-mono uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
              >
                Close Case Study
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
