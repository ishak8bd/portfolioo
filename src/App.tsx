import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ConstellationCanvas } from './components/ConstellationCanvas';
import { OverviewHero } from './components/OverviewHero';
import { AboutSection } from './components/AboutSection';
import { RingShowcase } from './components/RingShowcase';
import { MarqueeShowcase } from './components/MarqueeShowcase';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
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

      {/* Ambient Interactive Particle Constellation Web */}
      <ConstellationCanvas />

      {/* Main Content Sections: Exact Sequential Order */}
      <main className="relative">
        {/* 1. Overview First */}
        <OverviewHero />

        {/* 2. About Me / Profile and Ethos */}
        <AboutSection />

        {/* 3. Projects Showcase (3D Ring / Marquee) */}
        <div id="projects" className="scroll-mt-20">
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
        </div>

        {/* 4. Experience Timeline & Research */}
        <ExperienceSection />

        {/* 5. Skills, Architecture & Technical Depth */}
        <SkillsSection />

        {/* 6. Contact & Direct Connection */}
        <ContactSection />
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
