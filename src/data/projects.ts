import type { Project } from '../types/project';

export const PROJECTS: Project[] = [
  {
    id: 'aura-synapse',
    index: '01 / 06',
    title: 'AURA SYNAPSE',
    tagline: 'Audio-reactive 120 FPS volumetric neural lattice in client browser',
    category: 'Creative Dev & WebGL',
    year: '2025',
    client: 'Neuromorphic Labs',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#38bdf8',
    stack: ['WebGL 2.0', 'GLSL Compute', 'Web Audio API', 'Web Workers', 'Three.js'],
    caseStudy: {
      problem:
        'Rendering 250,000 instanced audio-reactive particles in real-time caused heavy GC pauses and dropped frames below 28 FPS on modern laptops and mobile GPUs.',
      whyThisApproach:
        'Instead of CPU-bound Three.js scene-graph updates, we offloaded FFT audio frequency processing to a dedicated background Web Worker via SharedArrayBuffer, streaming transform matrices directly into custom GLSL instanced vertex shaders with ping-pong framebuffers.',
      architecture: [
        'SharedArrayBuffer worker pipeline for lock-free audio FFT decimation',
        'Custom GLSL vertex deformation shaders eliminating CPU-side mesh mutations',
        'Dynamic level-of-detail (LOD) particle culling based on viewport frustum',
        'Hardware-accelerated post-processing bloom pass with half-float textures'
      ],
      metrics: [
        { label: 'Sustained Framerate', value: '120 FPS' },
        { label: 'GPU Draw Calls', value: '1,420 → 14' },
        { label: 'Memory Footprint', value: '-68%' },
        { label: 'Audio Latency', value: '< 8ms' }
      ],
      whatBroke:
        'Rapid browser tab switching triggered WebGL context loss on mobile Safari because GPU buffers were not cleanly suspended when document.hidden fired. We built a context-loss lifecycle manager that snapshots buffer pointers into memory and restores them instantaneously on focus.',
      keyTakeaway:
        'Never let the JavaScript main thread do mathematics that vertex shaders can execute in parallel for zero cost.'
    }
  },
  {
    id: 'kronos-zero',
    index: '02 / 06',
    title: 'KRONOS ZERO',
    tagline: 'Sub-millisecond institutional order book & execution interface',
    category: 'Fintech Systems',
    year: '2025',
    client: 'Apex Quantitative',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#fbbf24',
    stack: ['React 19', 'WebAssembly', 'OffscreenCanvas', 'FlatBuffers', 'Tailwind'],
    caseStudy: {
      problem:
        'High-frequency market volatility events generated 50,000+ price ticks per second, causing standard React virtual DOM diffing to freeze the user interface for up to 450ms.',
      whyThisApproach:
        'We decoupled telemetry visualization entirely from React’s component tree. Telemetry feeds deserialize into pre-allocated memory arenas using WebAssembly, writing to an OffscreenCanvas with zero garbage collection overhead.',
      architecture: [
        'Binary FlatBuffers serialization over multiplexed WebSocket streams',
        'OffscreenCanvas rendering worker isolated from browser main thread',
        'Atomic RingBuffers preventing memory reallocations during market spikes',
        'Fine-grained reactive signals outside React state cascade for order routing'
      ],
      metrics: [
        { label: 'P99 UI Latency', value: '< 2.8ms' },
        { label: 'Frame Drop Rate', value: '0.01%' },
        { label: 'Data Ingestion', value: '60K ticks/s' },
        { label: 'Heap Churn', value: '0 MB/min' }
      ],
      whatBroke:
        'Calling into WebAssembly too frequently across the JS/Wasm boundary incurred high foreign function interface (FFI) call overhead. We batched 256 order ticks per Wasm invocation, dropping execution overhead by 92%.',
      keyTakeaway:
        'In high-throughput financial frontends, React should be the orchestration shell, never the high-frequency rendering loop.'
    }
  },
  {
    id: 'hyperion-os',
    index: '03 / 06',
    title: 'HYPERION OS',
    tagline: 'Autonomous multi-agent orchestration canvas with spatial DAG execution',
    category: 'AI & Distributed Systems',
    year: '2024',
    client: 'Aether Autonomous',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#a855f7',
    stack: ['TypeScript', 'CRDT / Yjs', 'Framer Motion', 'WebRTC', 'IndexedDB'],
    caseStudy: {
      problem:
        'Supervising 20+ concurrent autonomous agents generating continuous code, reasoning graphs, and multimodal artifacts caused severe cognitive overload and synchronization drift.',
      whyThisApproach:
        'Designed an infinite spatial canvas that visualizes reasoning branches as reactive Directed Acyclic Graphs (DAG) with real-time multi-user CRDT sync and instant timeline scrubbing.',
      architecture: [
        'Conflict-free Replicated Data Types (CRDTs) for collaborative state sync',
        'Signed-distance-field (SDF) instanced node rendering for smooth zoom/pan',
        'Local-first vector embedding search powered by client-side WebAssembly',
        'Bi-directional streaming agent output with zero-copy chunk rendering'
      ],
      metrics: [
        { label: 'Concurrent Agents', value: '50+ Swarm' },
        { label: 'State Sync Latency', value: '< 18ms' },
        { label: 'Triage Time', value: '-72%' },
        { label: 'Graph Node Scale', value: '10,000+ Nodes' }
      ],
      whatBroke:
        'Rendering 500+ streaming text containers with SVG foreignObject choked layout engines during simultaneous zoom gestures. We replaced foreignObject with an instanced canvas text atlas, restoring buttery 60 FPS viewport transformations.',
      keyTakeaway:
        'Complex AI reasoning workflows demand spatial clarity, deterministic rewindability, and instant tactile feedback.'
    }
  },
  {
    id: 'vortex-neural',
    index: '04 / 06',
    title: 'VORTEX NEURAL',
    tagline: 'Global edge network mesh with predictive self-healing telemetry',
    category: 'Cloud Infrastructure',
    year: '2024',
    client: 'Vortex Global Edge',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#2dd4bf',
    stack: ['Deck.gl', 'Three.js', 'ClickHouse', 'Server-Sent Events', 'Tailwind'],
    caseStudy: {
      problem:
        'Routing anomalies across 340 global edge Points of Presence (PoPs) took up to 14 minutes to detect due to fragmented tabular monitoring tools and siloed log aggregation.',
      whyThisApproach:
        'Synthesized live packet loss vectors, latency heatmaps, and autonomous DNS rerouting into an immersive 3D globe console that predicts routing degradation before SLA violations occur.',
      architecture: [
        'GPU-accelerated Deck.gl flight path and anomaly arc rendering',
        'Real-time ClickHouse time-series aggregation piped through SSE',
        'Predictive Markov-model routing recommendation engine in client browser',
        'Zero-bundle micro-frontend modules with isolated fault boundaries'
      ],
      metrics: [
        { label: 'Mean Time to Detect', value: '14m → 38s' },
        { label: 'Global PoPs Monitored', value: '340 Nodes' },
        { label: 'Daily Query Throughput', value: '4.2B Hits' },
        { label: 'SLA Reliability', value: '99.999%' }
      ],
      whatBroke:
        'Converting latitude/longitude coordinates to 3D Cartesian coordinates in JavaScript caused massive CPU bottlenecks when drawing 100,000 simultaneous routing hops. We moved coordinate reprojection entirely into vertex shaders.',
      keyTakeaway:
        'Observability is only as good as the speed of human comprehension; high-density spatial visualization turns abstract logs into immediate operational insight.'
    }
  },
  {
    id: 'echo-protocol',
    index: '05 / 06',
    title: 'ECHO PROTOCOL',
    tagline: 'Zero-knowledge biometric cryptographic identity & privacy vault',
    category: 'Security & Cryptography',
    year: '2024',
    client: 'Echo Cipher Labs',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#f43f5e',
    stack: ['Rust / Wasm', 'snarkjs ZK', 'WebAuthn', 'Framer Motion', 'Tailwind'],
    caseStudy: {
      problem:
        'Legacy digital identity verification leaks biometric and personal identifiable information (PII) to centralized verification servers, creating catastrophic honeypot risks.',
      whyThisApproach:
        'Engineered an in-browser zero-knowledge proof generation pipeline where cryptographic proofs are generated directly on the user’s device using biometric WebAuthn security enclaves without revealing underlying credentials.',
      architecture: [
        'Client-side Groth16 ZK-SNARK circuit evaluation in WebAssembly',
        'Hardware-backed WebAuthn enclave signature verification',
        'Chunked streaming prover key caching with ServiceWorker Cache Storage',
        'Brutalist obsidian UI with dynamic cryptographic proof progress telemetry'
      ],
      metrics: [
        { label: 'Data Leak Surface', value: '0 PII Stored' },
        { label: 'Proof Compute Time', value: '8.4s → 2.8s' },
        { label: 'Key Payload Size', value: '32MB → 4.1MB' },
        { label: 'Security Audits', value: '3x Passed' }
      ],
      whatBroke:
        'Initial 32MB zk-SNARK prover keys caused mobile browser tab crashes due to RAM exhaustion during initialization. We partitioned keys into compressed sparse matrices and loaded them on-demand via WebAssembly streaming instantiation.',
      keyTakeaway:
        'Privacy should not feel slow or arcane; pairing cutting-edge cryptography with fluid 60 FPS cinematic motion transforms complex security into an empowering user ritual.'
    }
  },
  {
    id: 'nebula-ray',
    index: '06 / 06',
    title: 'NEBULA RAY',
    tagline: 'Real-time hardware-accelerated WebGPU path tracer & photon irradiance field',
    category: 'Graphics & Simulation',
    year: '2025',
    client: 'Luminescent Dynamics',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    accentColor: '#06b6d4',
    stack: ['WebGPU', 'WGSL Shaders', 'BVH Acceleration', 'Compute Pipelines', 'TypeScript'],
    caseStudy: {
      problem:
        'Rendering photorealistic global illumination with complex refractive dielectrics inside standard client browser tabs exceeded 16ms frame budgets by over 300%.',
      whyThisApproach:
        'Constructed a two-level bounding volume hierarchy (BVH) traversed directly inside asynchronous WebGPU compute shaders with spatiotemporal reservoir resampling (ReSTIR) and blue-noise spatial filtering.',
      architecture: [
        'Custom WGSL wavefront path tracing compute pipeline with zero host sync',
        'Spatiotemporal reservoir resampling (ReSTIR) for multi-bounce direct lighting',
        'Memory-aligned uniform buffers mapped directly to GPU high-bandwidth VRAM',
        'Half-precision 16-bit spherical harmonic irradiance caching'
      ],
      metrics: [
        { label: 'Real-time Framerate', value: '60 FPS 4K' },
        { label: 'Convergence Rate', value: '16 samples/px' },
        { label: 'Ray Throughput', value: '120M rays/s' },
        { label: 'VRAM Footprint', value: '< 180MB' }
      ],
      whatBroke:
        'Dynamic ray divergence on mobile GPUs triggered severe SIMD warp serialization. We sorted active rays into coherent 3D Morton-code spatial bins prior to BVH traversal, recovering 78% throughput.',
      keyTakeaway:
        'The modern browser is a first-class real-time graphics workstation when shaders are aligned directly to hardware compute units.'
    }
  }
];
