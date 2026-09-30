import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex-shrink-0 w-[290px] sm:w-[350px] md:w-[380px] h-[400px] sm:h-[440px] md:h-[460px] rounded-2xl overflow-hidden cursor-pointer select-none bg-[#0e1017] border border-white/10 transition-shadow duration-500"
      style={{
        boxShadow: isHovered
          ? `0 20px 45px -12px ${project.accentColor}30, 0 0 0 1px ${project.accentColor}50`
          : '0 10px 30px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', damping: 25, stiffness: 260 }}
    >
      {/* Background Image with Cinematic Filter & Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          draggable={false}
          className="w-full h-full object-cover object-center pointer-events-none transition-all duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
            filter: isHovered
              ? 'brightness(1.05) contrast(1.05)'
              : 'brightness(0.75) contrast(1.15)',
          }}
        />
        {/* Cinematic Vignette & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* Top Metadata Bar */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[11px] tracking-widest text-zinc-300 font-semibold px-2 py-0.5 rounded bg-black/40 backdrop-blur-md border border-white/10">
            {project.index}
          </span>
          <span
            className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10 transition-colors"
            style={{
              backgroundColor: isHovered ? `${project.accentColor}25` : 'rgba(0,0,0,0.5)',
              color: isHovered ? '#ffffff' : '#a1a1aa',
              borderColor: isHovered ? `${project.accentColor}60` : 'rgba(255,255,255,0.1)',
            }}
          >
            {project.category}
          </span>
        </div>

        <span className="font-mono text-[11px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded backdrop-blur-md border border-white/5">
          {project.year}
        </span>
      </div>

      {/* Center Hover Reveal: "Explore Case Study" Floating Pill */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 text-black text-[11px] font-mono font-bold tracking-wider uppercase shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
        >
          <span>View Case Study</span>
          <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
        </motion.div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 inset-x-0 z-10 p-5 sm:p-6 flex flex-col justify-end">
        {/* Client Tag */}
        <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-2">
          <span>{project.client}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1.5 leading-tight group-hover:text-white transition-colors">
          {project.title}
        </h3>

        {/* Short Line / Tagline */}
        <p className="text-xs text-zinc-300/90 line-clamp-2 leading-relaxed mb-3">
          {project.tagline}
        </p>

        {/* Tech Stack Mini Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
