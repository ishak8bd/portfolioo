import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleViewCaseStudy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex-shrink-0 w-[260px] sm:w-[300px] md:w-[330px] h-[360px] sm:h-[400px] md:h-[420px] cursor-pointer select-none"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Flipping Card Container */}
      <div
        className="w-full h-full relative rounded-2xl transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          boxShadow: isHovered
            ? `0 20px 45px -12px ${project.accentColor}35, 0 0 0 1px ${project.accentColor}60`
            : '0 10px 30px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* ========================================================= */}
        {/* FRONT FACE: Cinematic Artwork, Category, Client & Title */}
        {/* (Description & Technologies removed from front)          */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#0e1017] border border-white/10"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Background Image with Cinematic Filter & Zoom */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              className="w-full h-full object-cover object-center pointer-events-none transition-all duration-700 ease-out"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1.0)',
                filter: isHovered
                  ? 'brightness(1.05) contrast(1.05)'
                  : 'brightness(0.8) contrast(1.15)',
              }}
            />
            {/* Cinematic Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/60 via-transparent to-transparent opacity-80" />
          </div>

          {/* Top Metadata Bar: Category */}
          <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
            <span
              className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border transition-colors"
              style={{
                backgroundColor: isHovered ? `${project.accentColor}25` : 'rgba(0,0,0,0.5)',
                color: isHovered ? '#ffffff' : '#a1a1aa',
                borderColor: isHovered ? `${project.accentColor}60` : 'rgba(255,255,255,0.1)',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Bottom Content Area: Client & Title ONLY */}
          <div className="absolute bottom-0 inset-x-0 z-10 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
            {/* Client Tag */}
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              <span>{project.client}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BACK FACE: Description, Technologies & Case Study Button */}
        {/* Visible when flipped (rotateY 180deg)                     */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between bg-[#0a0c13] border"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderColor: `${project.accentColor}40`,
            boxShadow: `inset 0 0 50px rgba(0,0,0,0.9), 0 0 35px -10px ${project.accentColor}25`,
          }}
        >
          {/* Subtle background texture & blueprint grid */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={project.image}
              alt=""
              draggable={false}
              className="w-full h-full object-cover object-center brightness-[0.14] blur-[2px] saturate-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/95 via-[#090b10]/90 to-[#090b10]/98" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Top Header: Category */}
          <div className="relative z-10 flex items-center justify-between pointer-events-none">
            <span
              className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border backdrop-blur-md"
              style={{
                backgroundColor: `${project.accentColor}20`,
                borderColor: `${project.accentColor}50`,
                color: '#ffffff',
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Middle Body: Title, Description, and Technologies */}
          <div className="relative z-10 flex flex-col gap-2.5 my-auto pointer-events-none">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-0.5 flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span>{project.client}</span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
                {project.title}
              </h4>
            </div>

            {/* Description (Tagline) */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mb-1">
                Overview
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                {project.tagline}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 mb-1.5 flex items-center justify-between">
                <span>Technologies</span>
                <span className="text-[9px] text-zinc-600 font-normal">{project.stack.length} tools</span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-[64px] overflow-hidden">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.05] border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Footer: View Case Study Button */}
          <div className="relative z-10 pt-2.5 border-t border-white/10">
            <button
              type="button"
              onClick={handleViewCaseStudy}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-white text-black hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-lg cursor-pointer"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
