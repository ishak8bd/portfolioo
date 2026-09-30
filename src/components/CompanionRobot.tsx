import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export const CompanionRobot: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction & UI State
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const robotRootRef = useRef<THREE.Group | null>(null);
  const headRef = useRef<THREE.Group | null>(null);
  const leftEyeGroupRef = useRef<THREE.Group | null>(null);
  const rightEyeGroupRef = useRef<THREE.Group | null>(null);
  const leftArmRef = useRef<THREE.Group | null>(null);
  const rightArmRef = useRef<THREE.Group | null>(null);
  const thrusterFlameRef = useRef<THREE.Mesh | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);

  // Mouse & 180 Spin references
  const mousePosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetSpinYRef = useRef(0);
  const currentSpinYRef = useRef(0);
  const isHappyRef = useRef(false);
  const dragDistanceRef = useRef(0);

  // Initialize Three.js Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 190;
    const height = 220;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 5.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // 2. High-Fidelity Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x93c5fd, 3.5);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const topFill = new THREE.DirectionalLight(0xa855f7, 1.8);
    topFill.position.set(0, 5, 0);
    scene.add(topFill);

    // 3. Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x141824,
      metalness: 0.88,
      roughness: 0.22,
    });

    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x080a0f,
      metalness: 0.9,
      roughness: 0.35,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x030508,
      metalness: 0.95,
      roughness: 0.08,
    });

    const eyeIrisMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const eyePupilGlintMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const eyeSocketMat = new THREE.MeshStandardMaterial({
      color: 0x0a101d,
      roughness: 0.5,
    });

    const coreEnergyMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    const ionFlameMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });

    // 4. Build Robot Rig
    const robotRoot = new THREE.Group();
    scene.add(robotRoot);
    robotRootRef.current = robotRoot;

    // --- A. HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.45, 0);
    robotRoot.add(headGroup);
    headRef.current = headGroup;

    // Helmet Chassis
    const helmetGeo = new THREE.CylinderGeometry(0.56, 0.52, 0.54, 32);
    const helmet = new THREE.Mesh(helmetGeo, titaniumMat);
    headGroup.add(helmet);

    // Curved Visor Screen
    const visorGeo = new THREE.CylinderGeometry(0.57, 0.53, 0.36, 32, 1, false, Math.PI * 0.72, Math.PI * 0.56);
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.rotation.y = Math.PI;
    headGroup.add(visor);

    // Antenna & Glowing Signal Orb
    const antennaStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25, 8);
    const antennaStem = new THREE.Mesh(antennaStemGeo, darkTrimMat);
    antennaStem.position.set(0, 0.4, 0);
    headGroup.add(antennaStem);

    const antennaTipGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const antennaTip = new THREE.Mesh(antennaTipGeo, eyeIrisMat);
    antennaTip.position.set(0, 0.53, 0);
    headGroup.add(antennaTip);

    // Side Cyber Ears
    const earGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16);
    const leftEar = new THREE.Mesh(earGeo, darkTrimMat);
    leftEar.position.set(-0.59, 0, 0);
    leftEar.rotation.z = Math.PI / 2;
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, darkTrimMat);
    rightEar.position.set(0.59, 0, 0);
    rightEar.rotation.z = Math.PI / 2;
    headGroup.add(rightEar);

    // --- B. PROMINENT 3D CURSOR-FOLLOWING EYES ---
    // Left Eye Group
    const leftEyeGroup = new THREE.Group();
    leftEyeGroup.position.set(-0.2, 0.02, 0.52);
    headGroup.add(leftEyeGroup);
    leftEyeGroupRef.current = leftEyeGroup;

    const socketGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 24);
    const leftSocket = new THREE.Mesh(socketGeo, eyeSocketMat);
    leftSocket.rotation.x = Math.PI / 2;
    leftEyeGroup.add(leftSocket);

    const irisGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.05, 24);
    const leftIris = new THREE.Mesh(irisGeo, eyeIrisMat);
    leftIris.rotation.x = Math.PI / 2;
    leftIris.position.z = 0.01;
    leftEyeGroup.add(leftIris);

    const glintGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const leftGlint = new THREE.Mesh(glintGeo, eyePupilGlintMat);
    leftGlint.position.set(0.02, 0.02, 0.04);
    leftEyeGroup.add(leftGlint);

    // Right Eye Group
    const rightEyeGroup = new THREE.Group();
    rightEyeGroup.position.set(0.2, 0.02, 0.52);
    headGroup.add(rightEyeGroup);
    rightEyeGroupRef.current = rightEyeGroup;

    const rightSocket = new THREE.Mesh(socketGeo, eyeSocketMat);
    rightSocket.rotation.x = Math.PI / 2;
    rightEyeGroup.add(rightSocket);

    const rightIris = new THREE.Mesh(irisGeo, eyeIrisMat);
    rightIris.rotation.x = Math.PI / 2;
    rightIris.position.z = 0.01;
    rightEyeGroup.add(rightIris);

    const rightGlint = new THREE.Mesh(glintGeo, eyePupilGlintMat);
    rightGlint.position.set(0.02, 0.02, 0.04);
    rightEyeGroup.add(rightGlint);

    // --- C. NECK JOINT ---
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.1, 16);
    const neck = new THREE.Mesh(neckGeo, darkTrimMat);
    neck.position.set(0, 0.15, 0);
    robotRoot.add(neck);

    // --- D. TORSO / CHEST ---
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -0.22, 0);
    robotRoot.add(torsoGroup);

    const chestGeo = new THREE.CylinderGeometry(0.48, 0.38, 0.6, 24);
    const chest = new THREE.Mesh(chestGeo, titaniumMat);
    torsoGroup.add(chest);

    // Chest Core Energy Arc Reactor
    const coreGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const core = new THREE.Mesh(coreGeo, coreEnergyMat);
    core.position.set(0, 0.05, 0.42);
    torsoGroup.add(core);

    const coreLight = new THREE.PointLight(0x38bdf8, 2.5, 3.5);
    coreLight.position.set(0, 0.05, 0.45);
    torsoGroup.add(coreLight);
    coreLightRef.current = coreLight;

    // Cyber Backpack & Dual Radiator Vents on Robot's Back
    const backpackGeo = new THREE.BoxGeometry(0.38, 0.36, 0.12);
    const backpack = new THREE.Mesh(backpackGeo, darkTrimMat);
    backpack.position.set(0, 0.05, -0.42);
    torsoGroup.add(backpack);

    const ventGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.28, 12);
    const topVent = new THREE.Mesh(ventGeo, eyeIrisMat);
    topVent.rotation.z = Math.PI / 2;
    topVent.position.set(0, 0.12, -0.49);
    torsoGroup.add(topVent);

    const bottomVent = new THREE.Mesh(ventGeo, eyeIrisMat);
    bottomVent.rotation.z = Math.PI / 2;
    bottomVent.position.set(0, -0.02, -0.49);
    torsoGroup.add(bottomVent);

    // --- E. ARTICULATED ARMS ---
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.54, 0.15, 0);
    torsoGroup.add(leftArmGroup);
    leftArmRef.current = leftArmGroup;

    const shoulderGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const leftShoulder = new THREE.Mesh(shoulderGeo, darkTrimMat);
    leftArmGroup.add(leftShoulder);

    const limbGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.35, 12);
    const leftLimb = new THREE.Mesh(limbGeo, titaniumMat);
    leftLimb.position.set(0, -0.2, 0);
    leftArmGroup.add(leftLimb);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.54, 0.15, 0);
    torsoGroup.add(rightArmGroup);
    rightArmRef.current = rightArmGroup;

    const rightShoulder = new THREE.Mesh(shoulderGeo, darkTrimMat);
    rightArmGroup.add(rightShoulder);

    const rightLimb = new THREE.Mesh(limbGeo, titaniumMat);
    rightLimb.position.set(0, -0.2, 0);
    rightArmGroup.add(rightLimb);

    // --- F. THRUSTER ENGINE & ION FLAME ---
    const thrusterBaseGeo = new THREE.CylinderGeometry(0.24, 0.14, 0.2, 16);
    const thrusterBase = new THREE.Mesh(thrusterBaseGeo, darkTrimMat);
    thrusterBase.position.set(0, -0.4, 0);
    torsoGroup.add(thrusterBase);

    const flameGeo = new THREE.ConeGeometry(0.14, 0.55, 16);
    const flame = new THREE.Mesh(flameGeo, ionFlameMat);
    flame.position.set(0, -0.74, 0);
    flame.rotation.x = Math.PI;
    torsoGroup.add(flame);
    thrusterFlameRef.current = flame;

    // 5. Frame Render Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Levitation sine-wave bobbing
      if (robotRootRef.current) {
        robotRootRef.current.position.y = Math.sin(elapsedTime * 2.4) * 0.07;

        // Smoothly interpolate the 180° spin angle towards target
        currentSpinYRef.current += (targetSpinYRef.current - currentSpinYRef.current) * 0.12;
      }

      // --- HEAD & EYE CURSOR TRACKING ---
      if (headRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const robotCenterX = rect.left + rect.width / 2;
        const robotCenterY = rect.top + rect.height / 2;

        const dx = mousePosRef.current.x - robotCenterX;
        const dy = mousePosRef.current.y - robotCenterY;

        // Invert horizontal yaw and pupil shift when robot is turned 180° so it always turns towards world cursor position
        const spinCos = Math.cos(currentSpinYRef.current);

        // 1. Head Yaw (turns horizontally towards cursor, up to ~55 degrees)
        const maxHeadYaw = 0.95;
        const targetHeadYaw = Math.max(-maxHeadYaw, Math.min(maxHeadYaw, dx * 0.0022)) * spinCos;

        // 2. Head Pitch (tilts vertically towards cursor, up to ~35 degrees)
        const maxHeadPitch = 0.60;
        const targetHeadPitch = Math.max(-maxHeadPitch, Math.min(maxHeadPitch, dy * 0.0022));

        headRef.current.rotation.y += (targetHeadYaw - headRef.current.rotation.y) * 0.16;
        headRef.current.rotation.x += (targetHeadPitch - headRef.current.rotation.x) * 0.16;

        // 3. Body Banking & 180 Spin applied to Torso
        if (robotRootRef.current) {
          const targetTorsoYaw = targetHeadYaw * 0.35 + currentSpinYRef.current;
          robotRootRef.current.rotation.y += (targetTorsoYaw - robotRootRef.current.rotation.y) * 0.12;

          const targetTorsoRoll = Math.max(-0.18, Math.min(0.18, dx * 0.0006)) * spinCos;
          robotRootRef.current.rotation.z += (targetTorsoRoll - robotRootRef.current.rotation.z) * 0.08;
        }

        // 4. Eye Pupils Tracking
        const pupilDx = Math.max(-0.10, Math.min(0.10, dx * 0.00035)) * spinCos;
        const pupilDy = Math.max(-0.07, Math.min(0.07, -dy * 0.00035));

        // Natural eye blinking
        const blinkCycle = elapsedTime % 3.8;
        const isBlinking = blinkCycle > 3.6 && blinkCycle < 3.74;
        const eyeScaleY = isBlinking ? 0.08 : 1.0;

        if (leftEyeGroupRef.current && rightEyeGroupRef.current) {
          leftEyeGroupRef.current.position.x += (-0.2 + pupilDx - leftEyeGroupRef.current.position.x) * 0.22;
          leftEyeGroupRef.current.position.y += (0.02 + pupilDy - leftEyeGroupRef.current.position.y) * 0.22;
          leftEyeGroupRef.current.scale.y += (eyeScaleY - leftEyeGroupRef.current.scale.y) * 0.45;

          rightEyeGroupRef.current.position.x += (0.2 + pupilDx - rightEyeGroupRef.current.position.x) * 0.22;
          rightEyeGroupRef.current.position.y += (0.02 + pupilDy - rightEyeGroupRef.current.position.y) * 0.22;
          rightEyeGroupRef.current.scale.y += (eyeScaleY - rightEyeGroupRef.current.scale.y) * 0.45;
        }
      }

      // Arms animation
      if (leftArmRef.current && rightArmRef.current) {
        if (isHappyRef.current) {
          leftArmRef.current.rotation.z = Math.PI * 0.55 + Math.sin(elapsedTime * 12) * 0.2;
          rightArmRef.current.rotation.z = -Math.PI * 0.55 - Math.sin(elapsedTime * 12) * 0.2;
        } else {
          leftArmRef.current.rotation.z = 0.15 + Math.sin(elapsedTime * 2.2) * 0.08;
          rightArmRef.current.rotation.z = -0.15 - Math.sin(elapsedTime * 2.2) * 0.08;
        }
      }

      // Thruster flame dynamics
      if (thrusterFlameRef.current) {
        const flamePulse = 0.8 + Math.sin(elapsedTime * 26) * 0.35;
        thrusterFlameRef.current.scale.set(1, flamePulse, 1);
      }

      // Core light flicker
      if (coreLightRef.current) {
        coreLightRef.current.intensity = 2.4 + Math.sin(elapsedTime * 8) * 0.6;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Track global cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Tap handler: spins 180 degrees smoothly on each tap
  const handleRobotTap = () => {
    // If the user was dragging across the screen, ignore tap
    if (dragDistanceRef.current > 8) return;

    targetSpinYRef.current += Math.PI; // 180 degrees spin
    isHappyRef.current = true;

    setTimeout(() => {
      isHappyRef.current = false;
    }, 1200);
  };

  return (
    <motion.aside
      ref={containerRef}
      drag
      dragMomentum={true}
      dragElastic={0.08}
      dragConstraints={{
        left: -window.innerWidth + 230,
        right: 0,
        top: -window.innerHeight + 260,
        bottom: 0,
      }}
      initial={{ x: 0, y: 0 }}
      onDragStart={() => {
        dragDistanceRef.current = 0;
        setIsDragging(true);
      }}
      onDrag={(_, info) => {
        dragDistanceRef.current += Math.hypot(info.delta.x, info.delta.y);
      }}
      onDragEnd={() => {
        setTimeout(() => {
          dragDistanceRef.current = 0;
        }, 100);
        setIsDragging(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="3D Interactive Companion Droid"
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
      title="Tap in the robot to spin 180° • Drag anywhere"
    >
      {/* 3D WebGL Canvas Container: Tap to Spin 180° */}
      <div
        onClick={handleRobotTap}
        className="relative w-[190px] h-[220px] flex items-center justify-center cursor-pointer will-change-transform"
      >
        {/* Holographic Projection Pedestal */}
        <div
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 rounded-[100%] border transition-all duration-300 pointer-events-none flex items-center justify-center ${
            isHovered || isDragging
              ? 'bg-sky-500/20 border-sky-400/40 shadow-[0_0_25px_rgba(56,189,248,0.5)]'
              : 'bg-sky-500/10 border-sky-400/25 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
          }`}
        >
          <div className="w-14 h-2 rounded-[100%] border border-sky-400/50 animate-ping opacity-30" />
        </div>

        {/* Real Three.js Canvas */}
        <canvas
          ref={canvasRef}
          className="w-[190px] h-[220px] pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        />
      </div>
    </motion.aside>
  );
};
