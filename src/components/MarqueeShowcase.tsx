import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  useInView,
  MotionValue,
} from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  MoveHorizontal,
  RotateCcw,
  Layers,
} from 'lucide-react';
import type { Project } from '../types/project';
import { ProjectCard } from './ProjectCard';

interface MarqueeShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  viewMode?: 'ring' | 'marquee';
  onToggleViewMode?: (mode: 'ring' | 'marquee') => void;
}

type EntrancePhase = 'spinning' | 'unfolding' | 'looping';

// Robust mathematical wrap within [min, max)
function wrapRange(min: number, max: number, v: number): number {
  const range = max - min;
  if (range <= 0) return min;
  return ((((v - min) % range) + range) % range) + min;
}

// Smooth cubic easing for unfold progress
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// Constants for 6 cards per set
const GAP = 24;
const CARD_PITCH = 354; // 330px card + 24px gap
const NUM_CARDS = 6;
const SET_STRIDE = NUM_CARDS * CARD_PITCH; // 2124px
const RING_RADIUS = 380; // Ring orbit radius in px
const INITIAL_TILT = 22; // rotateX degrees

/**
 * Dedicated Entrance Card component
 * Driven by shared MotionValues: unfoldProgress (0 -> 1), ringRotation, and entranceTime.
 * All cards interpolate in lockstep via useTransform with zero independent timers.
 */
interface EntranceCardProps {
  index: number;
  project: Project;
  unfoldProgress: MotionValue<number>;
  ringRotation: MotionValue<number>;
  entranceTime: MotionValue<number>;
  onCardClick: (project: Project) => void;
}

const EntranceCard: React.FC<EntranceCardProps> = ({
  index,
  project,
  unfoldProgress,
  ringRotation,
  entranceTime,
  onCardClick,
}) => {
  // Base angular position on the 6-card ring (60 deg intervals)
  const baseAngleDeg = index * 60;

  // Row coordinate relative to Set 1 center (midpoint between card 2 and 3 = index 2.5 * 404)
  const rowX = (index - 2.5) * CARD_PITCH;

  // Stagger entry threshold (~0.28s each)
  const entryTime = index * 0.28;

  // 1. Transform: position, tilt, rotation, and scale derived in lockstep
  const cardTransform = useTransform(
    [unfoldProgress, ringRotation, entranceTime],
    (values: (string | number)[]) => {
      const p = Number(values[0]);
      const rot = Number(values[1]);
      const t = Number(values[2]);

      // If already in looping marquee, return exact flat row layout
      if (p >= 1) {
        return 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)';
      }

      // Phase 1 Entrance Stagger scale
      let entryScale = 1;
      if (t < entryTime) {
        entryScale = 0.5;
      } else if (t < entryTime + 0.35) {
        const entryProgress = Math.min((t - entryTime) / 0.35, 1);
        entryScale = 0.6 + 0.4 * entryProgress;
      }

      // Ring 3D Orbit coordinates
      const currentAngleDeg = baseAngleDeg + rot;
      const angleRad = (currentAngleDeg * Math.PI) / 180;

      // Un-tilted orbit position in X-Z plane
      const ringX = RING_RADIUS * Math.sin(angleRad);
      const ringZ = RING_RADIUS * Math.cos(angleRad);

      // Current tilt angle relaxes from 22deg to 0deg
      const currentTiltDeg = INITIAL_TILT * (1 - p);
      const tiltRad = (currentTiltDeg * Math.PI) / 180;

      // Tilted ring projection: nearer cards (ringZ > 0) are lower on screen and closer
      const ringY = ringZ * Math.sin(tiltRad);
      const ringZProjected = ringZ * Math.cos(tiltRad);

      // Card facing angle on the ring
      const ringRotY = -currentAngleDeg * 0.55;

      // Perspective depth scaling: nearer cards larger, farther cards smaller
      const depthScaleFactor = 1 + ringZProjected / 1400;

      // Interpolate from ring position to final row position (x = rowX, y = 0, z = 0, rot = 0)
      const currentX = (1 - p) * ringX + p * rowX;
      const currentY = (1 - p) * ringY;
      const currentZ = (1 - p) * ringZProjected;
      const currentRotY = (1 - p) * ringRotY;
      const currentRotX = (1 - p) * currentTiltDeg;
      const currentScale = entryScale * ((1 - p) * depthScaleFactor + p * 1.0);

      // Relative delta from natural flex layout position in Set 1
      const deltaX = currentX - rowX;
      const deltaY = currentY;
      const deltaZ = currentZ;

      return `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, ${deltaZ.toFixed(2)}px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
    }
  );

  // 2. Opacity: staggered entry in Phase 1, full opacity afterwards
  const cardOpacity = useTransform(
    [unfoldProgress, entranceTime],
    (values: (string | number)[]) => {
      const p = Number(values[0]);
      const t = Number(values[1]);
      if (p >= 1) return 1;
      if (t < entryTime) return 0;
      if (t < entryTime + 0.35) return Math.min((t - entryTime) / 0.35, 1);
      return 1;
    }
  );

  // 3. Shadow / Glow: edge accent glow during ring phase, normal shadow in row phase
  const cardBoxShadow = useTransform(unfoldProgress, (p: number) => {
    if (p >= 0.95) {
      return '0 10px 30px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.07)';
    }
    const glowAlpha = Math.round((1 - p) * 45);
    const glowHex = glowAlpha > 0 ? glowAlpha.toString(16).padStart(2, '0') : '00';
    return `0 15px 35px -10px ${project.accentColor}${glowHex}, 0 0 0 1px ${project.accentColor}50`;
  });

  return (
    <motion.div
      style={{
        transform: cardTransform,
        opacity: cardOpacity,
        boxShadow: cardBoxShadow,
        transformStyle: 'preserve-3d',
        borderRadius: '1rem',
        willChange: 'transform, opacity',
      }}
      className="relative flex-shrink-0 transition-shadow duration-300"
    >
      <ProjectCard project={project} onClick={() => onCardClick(project)} />
    </motion.div>
  );
};

export const MarqueeShowcase: React.FC<MarqueeShowcaseProps> = ({
  projects,
  onSelectProject,
  viewMode = 'marquee',
  onToggleViewMode,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  // In-view detection
  const isInView = useInView(sectionRef, { once: true, margin: '-60px 0px' });
  const [phase, setPhase] = useState<EntrancePhase>('looping');
  const [entranceKey, setEntranceKey] = useState(0);
  const hasTriggeredEntrance = useRef(false);

  // Motion values for the entrance sequence
  const unfoldProgress = useMotionValue(1); // 0 during ring, 0 -> 1 during unfold, 1 in looping
  const ringRotation = useMotionValue(0);
  const entranceTime = useMotionValue(0);
  const entranceStartTimeRef = useRef<number | null>(null);

  // Marquee track motion value
  const x = useMotionValue(0);
  const [singleSetWidth, setSingleSetWidth] = useState(SET_STRIDE);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);

  // Drag & momentum tracking
  const isPointerDownRef = useRef(false);
  const isScrubbingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const totalDragDistanceRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const wheelTimeoutRef = useRef<number | null>(null);

  // Auto-scroll configuration: 46 px/sec constant drift LEFT
  const baseSpeed = 46;
  const direction = -1;

  // Center alignment helper: centers the 6-card row in the viewport
  const getCenteredX = useCallback(() => {
    if (!containerRef.current) return -SET_STRIDE / 2;
    const viewportWidth = containerRef.current.offsetWidth;
    const setMidpoint = SET_STRIDE / 2; // 1212px
    return wrapRange(-SET_STRIDE, 0, viewportWidth / 2 - setMidpoint);
  }, []);

  // Launch the unified continuous 3-phase entrance
  const startEntranceSequence = useCallback(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      unfoldProgress.set(1);
      ringRotation.set(0);
      entranceTime.set(10);
      setPhase('looping');
      x.set(getCenteredX());
      return;
    }

    setEntranceKey((k) => k + 1);
    setPhase('spinning');
    unfoldProgress.set(0);
    ringRotation.set(0);
    entranceTime.set(0);
    entranceStartTimeRef.current = performance.now();

    // Initialize track position to exact centered alignment
    x.set(getCenteredX());
  }, [getCenteredX, unfoldProgress, ringRotation, entranceTime, x]);

  // Center immediately on mount
  useEffect(() => {
    x.set(getCenteredX());
  }, [getCenteredX, x]);

  // Trigger when scrolled into view
  useEffect(() => {
    if (isInView && !hasTriggeredEntrance.current) {
      hasTriggeredEntrance.current = true;
      startEntranceSequence();
    }
  }, [isInView, startEntranceSequence]);

  // Replay entrance handler
  const replayEntrance = () => {
    startEntranceSequence();
  };

  // Measure single set width accurately
  const measureWidth = useCallback(() => {
    if (firstSetRef.current) {
      const width = firstSetRef.current.offsetWidth;
      if (width > 0) {
        setSingleSetWidth(width + GAP);
      }
    }
  }, []);

  useEffect(() => {
    measureWidth();
    const ro = new ResizeObserver(() => measureWidth());
    if (firstSetRef.current) ro.observe(firstSetRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measureWidth]);

  // Single unified Game Loop for Entrance and Marquee Auto-Scroll
  useAnimationFrame((_time, delta) => {
    const dt = Math.min(delta / 1000, 0.1);

    // ==========================================
    // ENTRANCE SEQUENCE (Phase 1 & 2)
    // ==========================================
    if (phase !== 'looping' && entranceStartTimeRef.current !== null) {
      const elapsed = (performance.now() - entranceStartTimeRef.current) / 1000;
      entranceTime.set(elapsed);

      // Phase 1 (0.0s - 2.4s): Ring forms and spins counter-clockwise
      if (elapsed < 2.4) {
        // Continuous counter-clockwise rotation (~190 deg/s)
        const rotSpeed = 190;
        ringRotation.set(elapsed * rotSpeed);
        unfoldProgress.set(0);
      }
      // Phase 2 (2.4s - 4.4s): Simultaneous approach, ring tilt flattening, and unfold into row
      else if (elapsed < 4.4) {
        if (phase !== 'unfolding') {
          setPhase('unfolding');
        }

        const unfoldDuration = 2.0; // 2.4s to 4.4s
        const rawProgress = (elapsed - 2.4) / unfoldDuration;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
        const easedP = easeInOutCubic(clampedProgress);

        unfoldProgress.set(easedP);

        // Smooth rotation deceleration handing off into horizontal orientation
        const initialSpin = 2.4 * 190; // 456 degrees
        const finalAlignmentTurn = 104; // brings cards into clean horizontal alignment
        const deceleratedTurn = finalAlignmentTurn * (1 - Math.pow(1 - clampedProgress, 2));
        ringRotation.set(initialSpin + deceleratedTurn);
      }
      // Phase 3 (4.4s+): Seamless Handoff to Marquee
      else {
        unfoldProgress.set(1);
        setPhase('looping');
        entranceStartTimeRef.current = null;
        x.set(getCenteredX());
      }
      return;
    }

    // ==========================================
    // CONTINUOUS MARQUEE ENGINE (Phase 3)
    // ==========================================
    if (isDragging || isScrubbingRef.current) return;

    // Apply inertia velocity decay when released
    if (Math.abs(dragVelocityRef.current) > 0.05) {
      const nextPos = x.get() + dragVelocityRef.current;
      x.set(wrapRange(-singleSetWidth, 0, nextPos));
      dragVelocityRef.current *= 0.92;
      return;
    }

    // Constant auto-scroll drifting LEFT
    if (!isHovered && !isUserActive) {
      const currentX = x.get();
      const nextX = currentX + baseSpeed * direction * dt;
      x.set(wrapRange(-singleSetWidth, 0, nextX));
    }
  });

  // Pointer drag event handlers for main track
  const handlePointerDown = (e: React.PointerEvent) => {
    if (phase !== 'looping') return;
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

  // Scrubber handlers
  const handleScrubberInteraction = (clientX: number) => {
    if (!scrollTrackRef.current || singleSetWidth <= 0) return;

    const rect = scrollTrackRef.current.getBoundingClientRect();
    const usableWidth = rect.width;
    if (usableWidth <= 0) return;

    const rawOffset = clientX - rect.left;
    const clampedOffset = Math.max(0, Math.min(rawOffset, usableWidth));
    const ratio = clampedOffset / usableWidth;

    const targetPos = -ratio * singleSetWidth;
    x.set(wrapRange(-singleSetWidth, 0, targetPos));
    dragVelocityRef.current = 0;
  };

  const handleScrubberPointerDown = (e: React.PointerEvent) => {
    if (phase !== 'looping') return;
    isScrubbingRef.current = true;
    setIsUserActive(true);
    handleScrubberInteraction(e.clientX);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleScrubberPointerMove = (e: React.PointerEvent) => {
    if (!isScrubbingRef.current) return;
    handleScrubberInteraction(e.clientX);
  };

  const handleScrubberPointerUp = (e: React.PointerEvent) => {
    if (!isScrubbingRef.current) return;
    isScrubbingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
    setTimeout(() => {
      setIsUserActive(false);
    }, 600);
  };

  // Wheel horizontal translation
  const handleWheel = (e: React.WheelEvent) => {
    if (phase !== 'looping') return;
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
    if (totalDragDistanceRef.current > 6) return;
    onSelectProject(project);
  };

  // Chevron manual nudge
  const nudge = (amountPercent: number) => {
    if (!containerRef.current || phase !== 'looping') return;
    const nudgePx = (containerRef.current.offsetWidth * (amountPercent / 100));
    const nextPos = x.get() + nudgePx;
    x.set(wrapRange(-singleSetWidth, 0, nextPos));
    dragVelocityRef.current = nudgePx * 0.08;
    setIsUserActive(true);
    setTimeout(() => setIsUserActive(false), 800);
  };

  // Scrubber thumb position derived from wrap position
  const thumbLeft = useTransform(x, (val) => {
    if (singleSetWidth <= 0) return '0%';
    const normalized = ((-val % singleSetWidth) + singleSetWidth) % singleSetWidth;
    const ratio = normalized / singleSetWidth;
    return `${ratio * 80}%`;
  });

  // Soft diagonal light streak opacity during entrance
  const streakOpacity = useTransform(unfoldProgress, [0, 0.4, 1], [0.75, 0.4, 0]);

  // Ring parent approach translation: moves closer (translateZ: -160px -> 0px) and scale 0.88 -> 1.0
  const ringScale = useTransform(unfoldProgress, [0, 1], [0.88, 1.0]);

  return (
    <section
      ref={sectionRef}
      id="marquee-showcase"
      className="relative w-full py-16 md:py-24 overflow-hidden border-y border-white/5 bg-[#060709] scroll-mt-20 select-none"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-sky-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Soft Diagonal Accent Light Streak (fades in during ring phase, eases out as row settles) */}
      <motion.div
        style={{
          opacity: streakOpacity,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[280px] bg-gradient-to-r from-transparent via-sky-400/[0.08] to-transparent blur-[90px] rotate-[-20deg] pointer-events-none will-change-transform"
      />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Curated Showcase • 06 Flagships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Engineered Works</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-normal">
              Marquee
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
            {phase !== 'looping'
              ? 'Synchronized 3D ring orbit unfolding into continuous horizontal stream...'
              : 'Hover to pause. Drag, scroll or scrub the bar below to navigate. Click any card for the architectural breakdown.'}
          </p>
        </div>

        {/* Status & Control Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Switcher */}
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

          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400">
            {phase === 'spinning' ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                <span className="text-sky-300">Ring Orbit</span>
              </>
            ) : phase === 'unfolding' ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-indigo-300">Unfolding</span>
              </>
            ) : isHovered || isDragging || isUserActive ? (
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

          {/* Replay Entrance Button */}
          <button
            onClick={replayEntrance}
            disabled={phase !== 'looping'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
              phase !== 'looping'
                ? 'bg-white/[0.01] border-white/5 text-zinc-600 cursor-not-allowed'
                : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-zinc-300 hover:text-white cursor-pointer'
            }`}
            title="Replay synchronized 3D ring unfold entrance"
          >
            <RotateCcw className={`w-3 h-3 ${phase !== 'looping' ? 'animate-spin text-sky-400' : 'text-sky-400'}`} />
            <span>{phase === 'looping' ? 'Replay Entrance' : 'Assembling...'}</span>
          </button>

          {/* Nudge Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => nudge(22)}
              disabled={phase !== 'looping'}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => nudge(-22)}
              disabled={phase !== 'looping'}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Marquee Viewport with 3D Perspective Context */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ perspective: 1400, perspectiveOrigin: '50% 48%' }}
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
          className="flex gap-6 will-change-transform py-6"
        >
          {/* Set 1: SHARED GROUP (Ring Formation -> 3D Unfold into Row) */}
          <motion.div
            key={`ring-group-${entranceKey}`}
            ref={firstSetRef}
            style={{
              transformStyle: 'preserve-3d',
              scale: ringScale,
              transformOrigin: 'center center',
              willChange: 'transform',
            }}
            className="flex gap-6 shrink-0 will-change-transform"
          >
            {projects.slice(0, NUM_CARDS).map((project, index) => (
              <EntranceCard
                key={`entrance-card-${project.id}-${entranceKey}`}
                index={index}
                project={project}
                unfoldProgress={unfoldProgress}
                ringRotation={ringRotation}
                entranceTime={entranceTime}
                onCardClick={handleCardClick}
              />
            ))}
          </motion.div>

          {/* Set 2: Duplicate for seamless infinite loop (fades in when row settles) */}
          <motion.div
            animate={{ opacity: phase === 'looping' ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-6 shrink-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {projects.slice(0, NUM_CARDS).map((project) => (
              <div key={`set2-${project.id}`} className="relative flex-shrink-0">
                <ProjectCard
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              </div>
            ))}
          </motion.div>

          {/* Set 3: Triplicate for ultra-wide monitors */}
          <motion.div
            animate={{ opacity: phase === 'looping' ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-6 shrink-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {projects.slice(0, NUM_CARDS).map((project) => (
              <div key={`set3-${project.id}`} className="relative flex-shrink-0">
                <ProjectCard
                  project={project}
                  onClick={() => handleCardClick(project)}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline Scrubbing Track */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 border-t border-white/5 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400">Navigation Timeline</span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            <span className="text-zinc-500">
              {phase === 'looping'
                ? 'Drag timeline to scrub · Click card to inspect'
                : 'Assembling sequence...'}
            </span>
          </div>

          {/* Timeline Scrubber Bar */}
          <div
            ref={scrollTrackRef}
            onPointerDown={handleScrubberPointerDown}
            onPointerMove={handleScrubberPointerMove}
            onPointerUp={handleScrubberPointerUp}
            onPointerCancel={handleScrubberPointerUp}
            className={`relative w-full sm:w-72 h-3.5 flex items-center cursor-pointer select-none group touch-none ${
              phase !== 'looping' ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
            }`}
          >
            {/* Scrubber Background Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full group-hover:h-1.5 transition-all overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-sky-400/30 to-sky-500/20" />
            </div>

            {/* Glowing Draggable Thumb */}
            <motion.div
              style={{ left: thumbLeft }}
              className="absolute top-1/2 -translate-y-1/2 w-8 h-2.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)] cursor-grab active:cursor-grabbing border border-sky-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
