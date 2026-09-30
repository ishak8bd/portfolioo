import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowUpRight,
  Layers,
  MoveHorizontal,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import type { Project } from '../types/project';

interface RingShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  viewMode?: 'ring' | 'marquee';
  onToggleViewMode?: (mode: 'ring' | 'marquee') => void;
}

export const RingShowcase: React.FC<RingShowcaseProps> = ({
  projects,
  onSelectProject,
  viewMode = 'ring',
  onToggleViewMode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Responsive card dimensions & radius calculation
  const [dimensions, setDimensions] = useState({
    cardWidth: 275,
    cardHeight: 380,
    isMobile: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const isMob = window.innerWidth < 640;
      const isTab = window.innerWidth < 1024;
      setDimensions({
        cardWidth: isMob ? 220 : isTab ? 250 : 275,
        cardHeight: isMob ? 310 : isTab ? 350 : 380,
        isMobile: isMob,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const n = projects.length;
  const step = 360 / n;

  // Exact cylinder radius formula:
  // R = (cardWidth / 2) / tan(pi / n) + breathing room
  const R = Math.max(
    Math.round((dimensions.cardWidth / 2) / Math.tan(Math.PI / n)) + (dimensions.isMobile ? 60 : 100),
    dimensions.isMobile ? 260 : 380
  );

  // Ring rotation angle
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true); // Always moving by default like marquee
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Drag tracking refs
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const lastXRef = useRef(0);
  const totalDragRef = useRef(0);
  const autoRotateTimerRef = useRef<number | null>(null);

  // Shortest angular path navigation to card i
  const goTo = useCallback((i: number) => {
    const cur = Math.round(angle / step);
    let d = ((i - cur) % n + n) % n;
    if (d > n / 2) d -= n;
    setAngle((cur + d) * step);
  }, [angle, n, step]);

  // Snap to closest card
  const snap = useCallback(() => {
    setAngle(Math.round(angle / step) * step);
  }, [angle, step]);

  // Next / Previous navigation
  const nextCard = useCallback(() => {
    setAngle((prev) => Math.round(prev / step) * step + step);
  }, [step]);

  const prevCard = useCallback(() => {
    setAngle((prev) => Math.round(prev / step) * step - step);
  }, [step]);

  // Keyboard navigation (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        prevCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  // Continuous Auto-rotation loop (Always moving continuously like the marquee)
  useEffect(() => {
    if (!autoRotate || isDragging || isCardHovered) {
      if (autoRotateTimerRef.current) cancelAnimationFrame(autoRotateTimerRef.current);
      return;
    }

    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      // Smooth continuous drift: ~14 deg/sec
      setAngle((prev) => prev + dt * 14);
      autoRotateTimerRef.current = requestAnimationFrame(tick);
    };

    autoRotateTimerRef.current = requestAnimationFrame(tick);
    return () => {
      if (autoRotateTimerRef.current) cancelAnimationFrame(autoRotateTimerRef.current);
    };
  }, [autoRotate, isDragging, isCardHovered]);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startAngleRef.current = angle;
    totalDragRef.current = 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const currentX = e.clientX;
    const dx = currentX - startXRef.current;
    totalDragRef.current += Math.abs(currentX - lastXRef.current);
    lastXRef.current = currentX;

    // Direct proportional rotation mapping
    const sensitivity = dimensions.isMobile ? 0.42 : 0.32;
    setAngle(startAngleRef.current - dx * sensitivity);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    snap();
  };

  // Compute active card index
  const activeNormalizedIndex = ((Math.round(angle / step) % n) + n) % n;
  const activeProject = projects[activeNormalizedIndex];

  // Card click handler: if already front card, select it; if side or back card, rotate it forward
  const handleCardClick = (index: number, project: Project) => {
    if (totalDragRef.current > 8) return; // Ignore drag release

    if (index === activeNormalizedIndex) {
      onSelectProject(project);
    } else {
      goTo(index);
    }
  };

  return (
    <section
      id="marquee-showcase"
      className="relative w-full py-14 sm:py-20 md:py-24 overflow-hidden bg-[#060709] border-y border-white/5 scroll-mt-20 select-none"
    >
      {/* Background Lighting & Radial Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-sky-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] blur-[100px] rounded-full pointer-events-none transition-colors duration-1000"
        style={{
          backgroundColor: activeProject ? `${activeProject.accentColor}0d` : 'transparent',
        }}
      />

      {/* Section Header with Mode Toggle */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>3D Project Ring • 0{projects.length} Flagships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Engineered Works</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-normal">
              3D Ring
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
            Continuously rotating 360° cylindrical gallery. Click any card (front or back) to bring it to center or view its case study.
          </p>
        </div>

        {/* Top Controls: Mode Switcher, Status & Auto-Spin */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* View Mode Toggle: 3D Ring vs Marquee */}
          {onToggleViewMode && (
            <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
              <button
                onClick={() => onToggleViewMode('ring')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'ring'
                    ? 'bg-sky-500 text-black font-semibold shadow-lg shadow-sky-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Ring</span>
              </button>
              <button
                onClick={() => onToggleViewMode('marquee')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'marquee'
                    ? 'bg-sky-500 text-black font-semibold shadow-lg shadow-sky-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <MoveHorizontal className="w-3.5 h-3.5" />
                <span>Marquee</span>
              </button>
            </div>
          )}

          {/* Status Indicator (Continuous Spin / Paused / Rotating) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400">
            {isDragging ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span className="text-sky-300">Rotating</span>
              </>
            ) : isCardHovered ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span className="text-amber-300">Paused</span>
              </>
            ) : autoRotate ? (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span className="text-zinc-300">Continuous Spin</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-zinc-500" />
                <span className="text-zinc-400">Paused</span>
              </>
            )}
          </div>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={() => setAutoRotate((prev) => !prev)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all cursor-pointer ${
              autoRotate
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Toggle continuous auto-rotation"
          >
            {autoRotate ? (
              <>
                <Pause className="w-3 h-3 text-emerald-400" />
                <span>Auto-Spin: ON</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-zinc-400" />
                <span>Auto-Spin</span>
              </>
            )}
          </button>

          {/* Reset Front Card */}
          <button
            onClick={() => setAngle(0)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
            title="Reset to Project 01"
          >
            <RotateCcw className="w-3 h-3 text-sky-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* 3D Ring View Stage */}
      <div
        ref={containerRef}
        className="relative w-full h-[540px] sm:h-[600px] md:h-[650px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 45%',
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Floating Left & Right Navigation Chevrons */}
        <div className="absolute inset-x-4 sm:inset-x-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-between pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevCard();
            }}
            className="p-3 sm:p-4 rounded-full bg-[#0e1017]/80 hover:bg-[#151923] border border-white/10 hover:border-sky-500/50 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto cursor-pointer group active:scale-95"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300 group-hover:text-sky-400 transition-colors" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextCard();
            }}
            className="p-3 sm:p-4 rounded-full bg-[#0e1017]/80 hover:bg-[#151923] border border-white/10 hover:border-sky-500/50 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 pointer-events-auto cursor-pointer group active:scale-95"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-300 group-hover:text-sky-400 transition-colors" />
          </button>
        </div>

        {/* Ambient Stage Floor Reflection Horizon */}
        <div
          className="absolute bottom-4 inset-x-0 h-44 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(56, 189, 248, 0.12), transparent 70%)',
          }}
        />

        {/* The 3D Ring Anchor */}
        <div
          ref={ringRef}
          className="absolute left-1/2 top-1/2 w-0 h-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(${-R}px) rotateY(${-angle}deg)`,
            transition: isDragging ? 'none' : 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          {projects.map((project, i) => {
            const cardTheta = i * step;
            const isFront = i === activeNormalizedIndex;

            return (
              <div
                key={project.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(i, project);
                }}
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
                className="group absolute cursor-pointer select-none"
                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  left: `-${dimensions.cardWidth / 2}px`,
                  top: `-${dimensions.cardHeight / 2}px`,
                  transform: `rotateY(${cardTheta}deg) translateZ(${R}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 1. FRONT FACE (Facing Outward: visible when in front arc) */}
                <div
                  className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 ${
                    isFront
                      ? 'ring-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
                      : 'opacity-85 hover:opacity-100 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)]'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitBoxReflect:
                      'below 8px linear-gradient(transparent 65%, rgba(255, 255, 255, 0.22))',
                    backgroundColor: '#0c0e14',
                    borderColor: isFront ? project.accentColor : 'rgba(255, 255, 255, 0.14)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow: isFront
                      ? `0 20px 50px -10px ${project.accentColor}40, 0 0 0 1px ${project.accentColor}80`
                      : '0 10px 30px -10px rgba(0,0,0,0.7)',
                  }}
                >
                  {/* Project Image & Cinematic Gradient */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={project.image}
                      alt={project.title}
                      draggable={false}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
                      style={{
                        transform: isFront ? 'scale(1.04)' : 'scale(1.0)',
                        filter: isFront
                          ? 'brightness(0.95) contrast(1.1)'
                          : 'brightness(0.7) contrast(1.15)',
                      }}
                    />
                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/45 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/70 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* Top Metadata Bar */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tracking-widest text-zinc-300 font-bold px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10">
                        {project.index}
                      </span>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md border transition-colors"
                        style={{
                          backgroundColor: isFront ? `${project.accentColor}25` : 'rgba(0,0,0,0.5)',
                          color: isFront ? '#ffffff' : '#a1a1aa',
                          borderColor: isFront ? `${project.accentColor}80` : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-zinc-400 bg-black/50 px-2 py-0.5 rounded backdrop-blur-md border border-white/5">
                      {project.year}
                    </span>
                  </div>

                  {/* Center Hover / Focus Action Pill */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <div
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-2xl ${
                        isFront
                          ? 'opacity-100 scale-100 bg-white text-black'
                          : 'opacity-0 scale-90 bg-black/80 text-white'
                      }`}
                    >
                      <span>{isFront ? 'View Case Study' : 'Rotate to Center'}</span>
                      <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="absolute bottom-0 inset-x-0 z-10 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
                    {/* Client Tag */}
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: project.accentColor }}
                      />
                      <span>{project.client}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1 leading-tight">
                      {project.title}
                    </h3>

                    {/* Short Tagline */}
                    <p className="text-xs text-zinc-300/90 line-clamp-2 leading-relaxed mb-3">
                      {project.tagline}
                    </p>

                    {/* Tech Stack Mini Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-white/10">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5"
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
                </div>

                {/* 2. BACK FACE (Facing Inward: visible across the ring when in the back arc!) */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden p-5 flex flex-col justify-between transition-all duration-500 opacity-75 hover:opacity-100 hover:scale-[1.02]"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitBoxReflect:
                      'below 8px linear-gradient(transparent 70%, rgba(255, 255, 255, 0.15))',
                    backgroundColor: '#090b10',
                    borderColor: `${project.accentColor}40`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    boxShadow: `0 15px 35px -10px ${project.accentColor}25, inset 0 0 40px rgba(0,0,0,0.85)`,
                  }}
                >
                  {/* Back face background image with dark frosted blueprint tint */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={project.image}
                      alt=""
                      draggable={false}
                      className="w-full h-full object-cover object-center brightness-[0.22] blur-[1px] saturate-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/95 via-[#090b10]/85 to-[#090b10]/95" />
                    {/* Architectural grid lines */}
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                      }}
                    />
                  </div>

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] tracking-widest text-zinc-300 font-bold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                      {project.index}
                    </span>
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md"
                      style={{
                        backgroundColor: `${project.accentColor}20`,
                        borderColor: `${project.accentColor}50`,
                        color: '#ffffff',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Center Monogram / Badge & Project Title */}
                  <div className="relative z-10 flex flex-col items-center text-center my-auto px-2 pointer-events-none">
                    <div
                      className="w-13 h-13 rounded-full flex items-center justify-center mb-2.5 border backdrop-blur-md transition-transform group-hover:scale-110 shadow-lg"
                      style={{
                        borderColor: `${project.accentColor}60`,
                        backgroundColor: `${project.accentColor}15`,
                        boxShadow: `0 0 25px -5px ${project.accentColor}40`,
                      }}
                    >
                      <span
                        className="font-mono font-bold text-xs tracking-wider"
                        style={{ color: project.accentColor }}
                      >
                        {project.index.split(' ')[0]}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-white mb-1 tracking-tight line-clamp-1">
                      {project.title}
                    </h4>

                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-3 max-w-[210px]">
                      {project.tagline}
                    </p>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-zinc-300 group-hover:bg-white group-hover:text-black transition-colors">
                      <RotateCcw className="w-3 h-3 text-sky-400 group-hover:text-black" />
                      <span>Rotate to Front</span>
                    </div>
                  </div>

                  {/* Bottom Client & Year */}
                  <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-white/10 pointer-events-none">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest truncate max-w-[120px]">
                      {project.client}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint & Project Indicator Pills */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20">
        {/* Interaction Hint */}
        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2 text-center sm:text-left">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>
            {dimensions.isMobile
              ? 'Swipe to spin · Tap any card to rotate'
              : 'Continuous 360° spin · Hover to pause · Click any card (front or back) to rotate to center · Arrow keys ← →'}
          </span>
        </div>

        {/* Project Selector Pagination Pills */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
          {projects.map((proj, idx) => {
            const isActive = idx === activeNormalizedIndex;
            return (
              <button
                key={proj.id}
                onClick={() => goTo(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-white/10 border-white/30 text-white shadow-md'
                    : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/15'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full transition-transform"
                  style={{
                    backgroundColor: isActive ? proj.accentColor : '#52525b',
                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <span className="font-semibold">{proj.index.split(' ')[0]}</span>
                <span className="hidden md:inline text-zinc-400">{proj.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
