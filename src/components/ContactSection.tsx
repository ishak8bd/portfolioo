import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Check,
  ArrowUpRight,
  Phone,
  MapPin,
  Sparkles,
  Shield,
  MessageSquare,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = 'truly.isaak@gmail.com';
  const phone = '+213 552 738 007';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <footer id="contact" className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 pb-16 scroll-mt-20 relative z-10 border-t border-white/5">
      {/* Anchor for backward compatibility */}
      <div id="about-contact" className="-mt-20 pt-20" />

      {/* Main Contact Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-20">
        {/* Left Column: Vision & Message (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-7 flex flex-col justify-between space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Contact • Connection</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Let&apos;s Build Something Exceptional.
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              I am open to interesting problems, high-impact AI/software engineering roles, research collaboration, and end-to-end freelance builds. Whether you need continuous RL agents, high-concurrency real-time microservices, or custom multi-dialect RAG pipelines, let&apos;s connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Current Status</span>
              </div>
              <div className="text-sm font-semibold text-white">
                Open to Opportunities
              </div>
              <div className="text-xs text-zinc-400 font-light">
                Full-time AI / SWE roles & Research
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>Location & Timezone</span>
              </div>
              <div className="text-sm font-semibold text-white">
                Blida, Algeria (UTC+1)
              </div>
              <div className="text-xs text-zinc-400 font-light">
                Available for Remote Worldwide
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Direct Contact Panel (5 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#090b10] border border-white/10 relative overflow-hidden flex flex-col justify-between group shadow-xl"
        >
          <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

          <div>
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2 text-white font-bold">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>COMMUNICATION CHANNELS</span>
              </div>
              <span className="text-emerald-400 font-bold">24H RESPONSE</span>
            </div>

            {/* Email Address */}
            <div className="space-y-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-zinc-200 truncate">
                    {email}
                  </span>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedEmail ? (
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
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 truncate">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-zinc-200 truncate">
                    {phone}
                  </span>
                </div>
                <button
                  onClick={copyPhone}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Social Profiles & Direct Action */}
          <div className="pt-4 border-t border-white/5 space-y-3">
            <a
              href={`mailto:${email}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Direct Message</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/isaaxk"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </a>

              <a
                href="https://linkedin.com/in/ishak-boudaoud-8729ba251"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Engineering Footer */}
      <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-white/10 text-white flex items-center justify-center font-bold text-[10px]">
            IB
          </div>
          <span>Ishak Boudaoud · AI & Software Engineer</span>
        </div>

        <div>
          <span>Engineered with React 19, Three.js & Framer Motion</span>
        </div>

        <div className="text-zinc-400">
          <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
