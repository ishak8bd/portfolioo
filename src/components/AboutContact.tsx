import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, ArrowUpRight, Globe, Shield, Phone, MapPin, GraduationCap, Briefcase, Award } from 'lucide-react';

export const AboutContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'truly.isaak@gmail.com';
  const phone = '+213 552 738 007';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="about-contact" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: About Narrative & Experience (7 cols) */}
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
            Turning Research Concepts into Working Production Solutions.
          </h2>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            <p>
              I’m a final-year <strong className="text-white font-medium">Computer Science Engineering student</strong> (Data Science Track) at Université Saad Dahleb Blida 1, and an <strong className="text-white font-medium">AI & Software Engineer</strong> with 2+ years of practical experience shipping products.
            </p>
            <p>
              I pair strong engineering fundamentals with real expertise in Data Science, Machine Learning, Deep Reinforcement Learning, and LLM/RAG systems. My work spans the full pipeline, from model formulation and training to backend engineering, distributed microservices, and production deployment across freelance client platforms, academic research, and personal builds.
            </p>
            <p>
              I go looking for problems without a clean textbook answer: continuous RL agents competing across hundreds of micro-zones, language models that have to understand a mix no off-the-shelf tool was built for (Algerian Darija, Arabic, French, English) — that's exactly where I want to be.
            </p>
          </div>

          {/* Education & Experience Highlights */}
          <div className="pt-4 space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">Freelance AI & Software Engineer</h4>
                  <span className="text-xs font-mono text-zinc-400">Nov 2023 – Present · Remote</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Delivered 10+ end-to-end AI and software projects for clients, spanning custom RAG chatbots/AI agents, SaaS platforms, recommendation systems, and real-time data pipelines.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">Student Researcher — Deep RL & Dynamic Pricing</h4>
                  <span className="text-xs font-mono text-zinc-400">May 2026 – Present · Blida 1 × Purdue</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Built continuous-action RL surge pricing across 242 NYC zones (TD3, SAC, PPO). Achieved $240K weekly profit (+18% over baseline) and +$71K weather lift; guided by Dr. Zengxiang Lei (Purdue).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white">Engineering Degree in Computer Science (Data Science)</h4>
                  <span className="text-xs font-mono text-zinc-400">5th Year Student (2022 – Present)</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Saad Dahleb University Blida 1, Algeria. Rigorous foundation in statistics, deep learning, algorithms, and distributed computing.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact & Direct Connection (5 cols) */}
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
                Direct Contact
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to Opportunities
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Let's Build Something Exceptional.
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8">
              Open to interesting problems, high-impact AI/software engineering roles, research collaboration, and freelance projects.
            </p>

            {/* Email & Phone Details */}
            <div className="space-y-3 mb-8">
              {/* Email */}
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

              {/* Phone */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="font-mono text-xs sm:text-sm text-zinc-200 hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-zinc-200">
                  Blida, Algeria (Remote & Hybrid)
                </span>
              </div>

              <a
                href={`mailto:${email}?subject=Collaboration%20Inquiry%20%7C%20AI%20%26%20Software%20Engineering`}
                className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] mt-2"
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
                href="https://github.com/isaaxk"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>github.com/isaaxk</span>
              </a>

              <a
                href="https://linkedin.com/in/ishak-boudaoud-8729ba251"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono text-zinc-500">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>Blida, DZ · UTC+1</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6 }}
        className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500"
      >
        <div>
          © {new Date().getFullYear()} Ishak Boudaoud · AI & Software Engineer · Data Scientist.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-400/80">
            <Shield className="w-3 h-3" />
            <span>Saad Dahleb University Blida 1</span>
          </span>
          <span>•</span>
          <a
            href="https://github.com/isaaxk"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400/80 hover:text-sky-300 transition-colors"
          >
            github.com/isaaxk
          </a>
        </div>
      </motion.div>
    </section>
  );
};
