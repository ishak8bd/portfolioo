import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { RingShowcase } from './components/RingShowcase';
import { MarqueeShowcase } from './components/MarqueeShowcase';
import { AboutContact } from './components/AboutContact';
import { ProjectModal } from './components/ProjectModal';
import { CompanionRobot } from './components/CompanionRobot';
import { PROJECTS } from './data/projects';
import type { Project } from './types/project';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'ring' | 'marquee'>('ring');

  return (
    <div className="min-h-screen bg-[#060709] text-zinc-100 selection:bg-sky-500 selection:text-black">
      {/* Top Floating Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Section 1: Hero with Interactive Particle Constellation */}
        <Hero />

        {/* Section 2: Bento Grid (Overview - Skills, Stack, Stats) */}
        <BentoGrid />

        {/* Section 3: 3D Ring Project Showcase (Default) with Marquee View Toggle */}
        <div id="marquee-showcase">
          {viewMode === 'ring' ? (
            <RingShowcase
              projects={PROJECTS}
              onSelectProject={(project) => setSelectedProject(project)}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
            />
          ) : (
            <MarqueeShowcase
              projects={PROJECTS}
              onSelectProject={(project) => setSelectedProject(project)}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
            />
          )}
        </div>

        {/* Section 4: About + Contact */}
        <AboutContact />
      </main>

      {/* Interactive Companion Robot that tracks cursor and flips */}
      <CompanionRobot />

      {/* Project Case Study Fullscreen Inspection Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
