import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#060709]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo / Monogram */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center font-mono font-bold text-xs tracking-tighter border border-white/10 transition-all duration-300">
            AV
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-sky-400 transition-colors">
              ALEX VANCE
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Frontend Architect
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-zinc-400">
          <button
            onClick={() => scrollTo('marquee-showcase')}
            className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Showcase (05)</span>
          </button>
          <button
            onClick={() => scrollTo('bento-grid')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Stack & Specs
          </button>
          <button
            onClick={() => scrollTo('about-contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Philosophy
          </button>
        </nav>

        {/* Action Button */}
        <button
          onClick={() => scrollTo('about-contact')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono uppercase tracking-wider transition-all hover:border-white/20"
        >
          <span>Connect</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
        </button>
      </div>
    </motion.header>
  );
};
