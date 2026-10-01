import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
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
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);

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
        setFlippedCardIndex(null);
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        setFlippedCardIndex(null);
        prevCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextCard, prevCard]);

  // Continuous Auto-rotation loop (Always moving continuously like the marquee)
  useEffect(() => {
    if (!autoRotate || isDragging || isCardHovered || flippedCardIndex !== null) {
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
  }, [autoRotate, isDragging, isCardHovered, flippedCardIndex]);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startAngleRef.current = angle;
    totalDragRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const currentX = e.clientX;
    const dx = currentX - startXRef.current;
    totalDragRef.current += Math.abs(currentX - lastXRef.current);
    lastXRef.current = currentX;

    if (totalDragRef.current > 6) {
      if (!isDragging) {
        setIsDragging(true);
        setFlippedCardIndex(null);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          // Ignored
        }
      }
      // Direct proportional rotation mapping
      const sensitivity = dimensions.isMobile ? 0.42 : 0.32;
      setAngle(startAngleRef.current - dx * sensitivity);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    const wasDragging = isDragging;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }

    if (wasDragging) {
      snap();
    }
  };

  // Compute active card index
  const activeNormalizedIndex = ((Math.round(angle / step) % n) + n) % n;
  const activeProject = projects[activeNormalizedIndex];

  // Card click/tap handler:
  // - Tap on a card flips it to the back to reveal description and technologies.
  // - Tapping on it again flips it back to the front.
  // - Tapping on another card brings that card to center and flips it.
  const handleCardClick = (index: number) => {
    if (totalDragRef.current > 6) return; // Ignore drag release

    // If this card is already flipped, tapping it flips it back to front
    if (flippedCardIndex === index) {
      setFlippedCardIndex(null);
      return;
    }

    if (index === activeNormalizedIndex) {
      setFlippedCardIndex(index);
    } else {
      goTo(index);
      setFlippedCardIndex(null);
      setTimeout(() => {
        setFlippedCardIndex(index);
      }, 550);
    }
  };

  return (
    <section
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
                onClick={() => {
                  setFlippedCardIndex(null);
                  onToggleViewMode('ring');
                }}
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
                onClick={() => {
                  setFlippedCardIndex(null);
                  onToggleViewMode('marquee');
                }}
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
            onClick={() => {
              setAngle(0);
              setFlippedCardIndex(null);
            }}
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
        onClick={(e) => {
          if (totalDragRef.current > 6) return;
          if (e.target === containerRef.current) {
            setFlippedCardIndex(null);
          }
        }}
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
            const isFlipped = flippedCardIndex === i;

            return (
              <div
                key={project.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(i);
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
                {/* 3D Flipping Card Container */}
                <div
                  className="relative w-full h-full rounded-2xl transition-transform duration-700 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* 1. FRONT FACE (Facing Outward: visible when in front arc & not flipped) */}
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
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md border transition-colors"
                        style={{
                          backgroundColor: isFront ? `${project.accentColor}25` : 'rgba(0,0,0,0.5)',
                          color: isFront ? '#ffffff' : '#a1a1aa',
                          borderColor: isFront ? `${project.accentColor}80` : 'rgba(255,255,255,0.1)',
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Bottom Content Area: Client & Title ONLY */}
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
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* 2. BACK FACE: Description, Technologies & Case Study Button */}
                  <div
                    className="absolute inset-0 rounded-2xl overflow-hidden p-5 sm:p-6 flex flex-col justify-between transition-all duration-500"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      WebkitBoxReflect:
                        'below 8px linear-gradient(transparent 70%, rgba(255, 255, 255, 0.15))',
                      backgroundColor: '#090b10',
                      borderColor: `${project.accentColor}50`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      boxShadow: isFlipped
                        ? `0 20px 50px -10px ${project.accentColor}40, inset 0 0 40px rgba(0,0,0,0.85)`
                        : `0 15px 35px -10px ${project.accentColor}25, inset 0 0 40px rgba(0,0,0,0.85)`,
                    }}
                  >
                    {/* Back face background image with dark frosted blueprint tint */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        src={project.image}
                        alt=""
                        draggable={false}
                        className="w-full h-full object-cover object-center brightness-[0.16] blur-[2px] saturate-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-[#090b10]/95 via-[#090b10]/90 to-[#090b10]/98" />
                      {/* Architectural grid lines */}
                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
                          backgroundSize: '24px 24px',
                        }}
                      />
                    </div>

                    {/* Top Bar: Category */}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
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
              ? 'Swipe to spin · Tap any card to flip and view details'
              : 'Continuous 360° spin · Tap any card to flip and view details · Drag or arrow keys to rotate'}
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
                <span className="text-zinc-300 font-medium">{proj.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
