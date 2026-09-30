import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, MoveHorizontal } from 'lucide-react';
import type { Project } from '../types/project';
import { ProjectCard } from './ProjectCard';

interface MarqueeShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

// Robust mathematical wrap within [min, max)
function wrapRange(min: number, max: number, v: number): number {
  const range = max - min;
  if (range <= 0) return min;
  return ((((v - min) % range) + range) % range) + min;
}

export const MarqueeShowcase: React.FC<MarqueeShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // Motion values and state
  const x = useMotionValue(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Drag & momentum tracking
  const isPointerDownRef = useRef(false);
  const isScrubbingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const totalDragDistanceRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const wheelTimeoutRef = useRef<number | null>(null);
  const lastActiveIndexRef = useRef(0);

  // Auto-scroll configuration
  const baseSpeed = 46; // pixels per second
  const direction = -1; // -1 for scrolling left, 1 for scrolling right

  // Derived motion value for the scrollbar thumb position (range: 0% to 80%)
  const thumbLeft = useTransform(x, (val) => {
    if (singleSetWidth <= 0) return '0%';
    const normalized = ((-val % singleSetWidth) + singleSetWidth) % singleSetWidth;
    const ratio = normalized / singleSetWidth;
    return `${ratio * 80}%`;
  });

  // Measure the width of one single set of cards
  const measureWidth = useCallback(() => {
    if (firstSetRef.current) {
      const width = firstSetRef.current.offsetWidth;
      if (width > 0) {
        setSingleSetWidth(width);
      }
    }
  }, []);

  useEffect(() => {
    measureWidth();
    const handleResize = () => measureWidth();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => measureWidth());
    if (firstSetRef.current) {
      observer.observe(firstSetRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [measureWidth, projects]);

  // Frame animation loop
  useAnimationFrame((_, delta) => {
    if (singleSetWidth <= 0) return;

    const currentX = x.get();
    let nextX = currentX;

    if (isPointerDownRef.current || isScrubbingRef.current) {
      return;
    }

    // Apply residual momentum if present
    if (Math.abs(dragVelocityRef.current) > 0.05) {
      nextX += dragVelocityRef.current;
      dragVelocityRef.current *= 0.94; // friction decay
    } else {
      dragVelocityRef.current = 0;
    }

    // Continuous auto-scroll when not hovered and not wheeling/scrubbing
    if (!isHovered && !isUserActive) {
      const deltaSeconds = Math.min(delta / 1000, 0.1); // clamp delta
      const autoMove = direction * baseSpeed * deltaSeconds;
      nextX += autoMove;
    }

    // Mathematical wrap in [-singleSetWidth, 0)
    const wrapped = wrapRange(-singleSetWidth, 0, nextX);
    x.set(wrapped);

    // Update active project index efficiently (only triggers state when changed)
    const currentRatio = (((-wrapped % singleSetWidth) + singleSetWidth) % singleSetWidth) / singleSetWidth;
    const computedIndex = Math.min(Math.floor(currentRatio * projects.length), projects.length - 1);
    if (computedIndex !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = computedIndex;
      setActiveProjectIndex(computedIndex);
    }
  });

  // Pointer drag event handlers for main track
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;

    isPointerDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    totalDragDistanceRef.current = 0;
    dragVelocityRef.current = 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;

    const currentX = e.clientX;
    const dx = currentX - lastXRef.current;
    totalDragDistanceRef.current += Math.abs(dx);

    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 8);

    if (singleSetWidth > 0) {
      const nextPos = x.get() + dx;
      x.set(wrapRange(-singleSetWidth, 0, nextPos));
    } else {
      x.set(x.get() + dx);
    }

    dragVelocityRef.current = (dx / dt) * 16.6;
    lastXRef.current = currentX;
    lastTimeRef.current = now;
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
  };

  // Scrollbar Scrubbing handlers
  const handleScrubberInteraction = (clientX: number) => {
    if (!scrollTrackRef.current || singleSetWidth <= 0) return;

    const rect = scrollTrackRef.current.getBoundingClientRect();
    const usableWidth = rect.width;
    if (usableWidth <= 0) return;

    const rawOffset = clientX - rect.left;
    const clampedRatio = Math.max(0, Math.min(1, rawOffset / usableWidth));

    const targetMarqueeX = -clampedRatio * singleSetWidth;
    x.set(wrapRange(-singleSetWidth, 0, targetMarqueeX));
    dragVelocityRef.current = 0;
  };

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isScrubbingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    handleScrubberInteraction(e.clientX);
  };

  const handleTrackPointerMove = (e: React.PointerEvent) => {
    if (!isScrubbingRef.current) return;
    handleScrubberInteraction(e.clientX);
  };

  const handleTrackPointerUp = (e: React.PointerEvent) => {
    if (!isScrubbingRef.current) return;
    isScrubbingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Direct Jump Pill Click
  const jumpToProject = (targetIndex: number) => {
    if (singleSetWidth <= 0 || projects.length === 0) return;

    const targetRatio = targetIndex / projects.length;
    const targetX = -targetRatio * singleSetWidth;

    dragVelocityRef.current = 0;
    x.set(wrapRange(-singleSetWidth, 0, targetX));
    setActiveProjectIndex(targetIndex);
    lastActiveIndexRef.current = targetIndex;
  };

  // Nudge controls
  const nudge = (amount: number) => {
    if (singleSetWidth <= 0) return;
    dragVelocityRef.current = amount;
    setIsUserActive(true);
    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = window.setTimeout(() => {
      setIsUserActive(false);
    }, 600);
  };

  // Mouse wheel horizontal translation
  const handleWheel = (e: React.WheelEvent) => {
    const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(rawDelta) < 1) return;

    setIsUserActive(true);
    const scrollDelta = -rawDelta * 1.2;

    if (singleSetWidth > 0) {
      x.set(wrapRange(-singleSetWidth, 0, x.get() + scrollDelta));
    } else {
      x.set(x.get() + scrollDelta);
    }

    dragVelocityRef.current = scrollDelta * 0.25;

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = window.setTimeout(() => {
      setIsUserActive(false);
    }, 800);
  };

  // Card click with drag threshold check
  const handleCardClick = (project: Project) => {
    if (totalDragDistanceRef.current > 6) {
      return;
    }
    onSelectProject(project);
  };

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden border-y border-white/5 bg-[#060709]">
      {/* Background Radial Light Accent (Cyan/Sky palette alignment) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-sky-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header with Scroll-Triggered Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 35, filter: 'blur(5px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Curated Showcase • 05 Flagships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Engineered Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
            Hover to pause. Drag, scroll or scrub the bar below to navigate. Click any card for the architectural breakdown.
          </p>
        </div>

        {/* Status & Control Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400">
            {isHovered || isDragging || isUserActive ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span className="text-amber-300">Paused</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span className="text-zinc-300">Continuous Loop</span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400">
            <MoveHorizontal className="w-3.5 h-3.5 text-zinc-500" />
            <span>Interactive</span>
          </div>

          {/* Quick Manual Nudge Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => nudge(22)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nudge(-22)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Marquee Viewport Container with 3D Perspective Context */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ perspective: 1200 }}
        className={`relative w-full overflow-hidden select-none touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Soft edge fade masks for cinematic depth */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-r from-[#060709] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-28 bg-gradient-to-l from-[#060709] to-transparent z-20 pointer-events-none" />

        {/* Animated Infinite Strip (Outer transform: marquee loop X) */}
        <motion.div
          ref={trackRef}
          style={{ x, transformStyle: 'preserve-3d' }}
          className="flex gap-5 sm:gap-6 will-change-transform py-4"
        >
          {/* Set 1: Measured set */}
          <div ref={firstSetRef} className="flex gap-5 sm:gap-6 shrink-0" style={{ transformStyle: 'preserve-3d' }}>
            {projects.map((project, index) => (
              <motion.div
                key={`set1-${project.id}`}
                initial={{
                  rotateY: -75,
                  x: -45,
                  z: -180,
                  scale: 0.88,
                  opacity: 0,
                }}
                whileInView={{
                  rotateY: 0,
                  x: 0,
                  z: 0,
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.85,
                  delay: (index % 5) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className="relative flex-shrink-0 will-change-transform"
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              </motion.div>
            ))}
          </div>

          {/* Set 2: Duplicate for seamless loop */}
          <div className="flex gap-5 sm:gap-6 shrink-0" style={{ transformStyle: 'preserve-3d' }}>
            {projects.map((project, index) => (
              <motion.div
                key={`set2-${project.id}`}
                initial={{
                  rotateY: -75,
                  x: -45,
                  z: -180,
                  scale: 0.88,
                  opacity: 0,
                }}
                whileInView={{
                  rotateY: 0,
                  x: 0,
                  z: 0,
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.85,
                  delay: (index % 5) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className="relative flex-shrink-0 will-change-transform"
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              </motion.div>
            ))}
          </div>

          {/* Set 3: Triplicate for ultra-wide screen coverage */}
          <div className="flex gap-5 sm:gap-6 shrink-0" style={{ transformStyle: 'preserve-3d' }}>
            {projects.map((project, index) => (
              <motion.div
                key={`set3-${project.id}`}
                initial={{
                  rotateY: -75,
                  x: -45,
                  z: -180,
                  scale: 0.88,
                  opacity: 0,
                }}
                whileInView={{
                  rotateY: 0,
                  x: 0,
                  z: 0,
                  scale: 1,
                  opacity: 1,
                }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.85,
                  delay: (index % 5) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
                className="relative flex-shrink-0 will-change-transform"
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Scrollable Bar Under Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-5xl mx-auto px-6 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 select-none"
      >
        {/* Left: Active Project Indicator */}
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-zinc-500 font-semibold tracking-wider uppercase">
            Viewing:
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-bold">
            {projects[activeProjectIndex]?.index ?? '01 / 05'}
          </span>
          <span className="text-zinc-300 font-medium tracking-tight truncate max-w-[180px] sm:max-w-none">
            {projects[activeProjectIndex]?.title}
          </span>
        </div>

        {/* Center: The Interactive Scrubber Bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">01</span>

          <div
            ref={scrollTrackRef}
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerUp}
            onPointerCancel={handleTrackPointerUp}
            className="relative flex-1 sm:w-72 md:w-96 h-8 flex items-center cursor-pointer group touch-none"
            title="Click or drag to scrub through the project reel"
          >
            {/* Background Track Groove */}
            <div className="relative w-full h-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors overflow-hidden" />

            {/* 5 Project Tick Marks */}
            <div className="absolute inset-x-0 h-1.5 flex justify-between items-center pointer-events-none px-0.5">
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeProjectIndex === idx
                      ? 'bg-sky-400 scale-150 shadow-[0_0_8px_#38bdf8]'
                      : 'bg-white/25'
                  }`}
                />
              ))}
            </div>

            {/* Draggable Active Thumb Pill */}
            <motion.div
              style={{ left: thumbLeft }}
              className="absolute top-1/2 -translate-y-1/2 w-[20%] h-2.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.7)] group-hover:h-3 transition-all cursor-grab active:cursor-grabbing pointer-events-none"
            />
          </div>

          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">05</span>
        </div>

        {/* Right: Quick Jump Buttons */}
        <div className="flex items-center gap-1">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => jumpToProject(idx)}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-all border ${
                activeProjectIndex === idx
                  ? 'bg-white/15 text-white border-sky-400/40 font-bold shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                  : 'bg-white/[0.02] text-zinc-400 border-white/5 hover:text-white hover:bg-white/10'
              }`}
              title={`Jump to ${p.title}`}
            >
              {p.index.split(' ')[0]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mobile Hint */}
      <div className="max-w-7xl mx-auto px-6 mt-4 sm:hidden flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>← Swipe / scrub to explore</span>
        <span>Tap card for details →</span>
      </div>
    </section>
  );
};
