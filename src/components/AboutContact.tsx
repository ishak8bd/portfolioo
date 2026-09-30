import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, ArrowUpRight, Globe, Shield } from 'lucide-react';

export const AboutContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'alex.vance.dev@proton.me';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="about-contact" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: About Narrative (7 cols) with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 35, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Profile & Ethos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bridging High-Throughput Engineering & Luxury Art Direction.
          </h2>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            <p>
              I am a Senior Frontend Architect and Creative Technologist specializing in mission-critical web applications, hardware-accelerated graphics (WebGL / Three.js / GLSL), and high-frequency real-time interfaces.
            </p>
            <p>
              Over the last decade, I've engineered interfaces handling 50K+ ticks/sec financial order books, 120 FPS audio-reactive particle simulations, and distributed multi-agent systems. My core thesis is simple: <strong className="text-white font-medium">performance is not an afterthought; it is the foundation of digital emotion.</strong>
            </p>
            <p>
              When an interface responds with sub-millisecond tactile immediacy and cinematic polish, users don't just use software—they feel mastery over it.
            </p>
          </div>

          {/* Core Competencies Quick Tags */}
          <div className="pt-4 flex flex-wrap gap-2">
            {[
              'Frontend System Architecture',
              'WebGL / WebGPU Graphics',
              'Performance & Profiling (V8 / DevTools)',
              'Design Systems & Motion Physics',
              'Wasm / Web Workers Concurrency',
              'State Machine Design'
            ].map((skill) => (
              <span
                key={skill}
                className="text-xs font-mono px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Contact & Direct Connection (5 cols) with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-[#0b0d13] border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Direct Inquiries
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available Q3/Q4
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Let's Build Something Exceptional.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              Available for select contract architecture roles, flagship web builds, or advisory engagements.
            </p>

            {/* Email Copy Trigger */}
            <div className="space-y-3 mb-8">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-zinc-200 truncate">
                    {email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${email}?subject=Project%20Inquiry%20%7C%20Architecture%20%26%20Design`}
                className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <span>Initiate Conversation</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono text-zinc-500">
              <Globe className="w-3.5 h-3.5" />
              <span>UTC+00:00 • Remote</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Info with Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6 }}
        className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500"
      >
        <div>
          © {new Date().getFullYear()} Senior Frontend Architect. Built with Vite + React + Framer Motion.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400/80">
            <Shield className="w-3 h-3" />
            <span>Zero Hydration Mismatch</span>
          </span>
          <span>•</span>
          <span className="text-sky-400/80">120 FPS Capable</span>
        </div>
      </motion.div>
    </section>
  );
};
