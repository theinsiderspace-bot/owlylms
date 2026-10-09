import React from 'react';
import { ExternalLink, Sparkles, GraduationCap, Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Translations } from '../translations';

interface LandingHeroProps {
  t: Translations;
  onExploreCourses: () => void;
  activeLearnersCount: number;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  t,
  onExploreCourses,
  activeLearnersCount
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 text-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Owly LMS 2026 Enterprise Edition</span>
          </div>
          <span className="text-slate-500">·</span>
          <div className="text-xs text-slate-300 font-medium">
            SOC2 Type II Certified · HRIS Bi-directional Sync · SCORM & xAPI Ready
          </div>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Enterprise Learning & <span className="bg-linear-to-r from-amber-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">Global Exam Intelligence</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              An all-in-one Learning Management System combining corporate compliance automation, interactive course delivery, and direct connectivity to specialized SAT and IELTS adaptive testing engines.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCourses}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Explore Course Delivery Hub</span>
              </button>

              <div className="flex items-center gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>99.4% Compliance Rate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-sky-400" />
                  <span>8 Global Languages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connected Exam Engines Showcase Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* SAT EXAM CARD */}
            <div className="group relative bg-linear-to-br from-slate-800 to-indigo-950/60 p-5 rounded-2xl border border-indigo-500/30 hover:border-indigo-400 transition-all shadow-xl hover:shadow-indigo-500/10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
                    🦉
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">SAT Exam Preparation</span>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-sm font-mono">Live</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">OwlySAT Adaptive Testing</h3>
                  </div>
                </div>

                <a
                  href="https://owlysat.ai.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center shrink-0 shadow-sm"
                  title="Connect to https://owlysat.ai.studio/"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-slate-300 mt-3 line-clamp-2">
                Digital SAT adaptive multi-stage test simulations, interactive Desmos calculator shortcuts, and real College Board style question banks.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Module 1 & 2 Adaptive Engine</span>
                </div>
                <a
                  href="https://owlysat.ai.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-indigo-400 group-hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Launch owlysat.ai.studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* IELTS EXAM CARD */}
            <div className="group relative bg-linear-to-br from-slate-800 to-sky-950/60 p-5 rounded-2xl border border-sky-500/30 hover:border-sky-400 transition-all shadow-xl hover:shadow-sky-500/10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
                    🎯
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-400">IELTS Exam Preparation</span>
                      <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded-sm font-mono">Live</span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-sky-200 transition-colors">OwlyIELTS Academic 8.5 Hub</h3>
                  </div>
                </div>

                <a
                  href="https://owlyielts.ai.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition-colors flex items-center justify-center shrink-0 shadow-sm"
                  title="Connect to https://owlyielts.ai.studio/"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-slate-300 mt-3 line-clamp-2">
                IELTS Academic & General Training: AI-graded Speaking Part 1-3, Task 1 & 2 writing coherence diagnostics, and timed audio listening tracks.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Band 8.5+ Rubric Standards</span>
                </div>
                <a
                  href="https://owlyielts.ai.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-sky-400 group-hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>Launch owlyielts.ai.studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-black text-white">{activeLearnersCount.toLocaleString()}</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Active Learners Enrolled</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">99.4%</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Corporate Compliance Status</div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-400">4 Connectors</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">HRIS & Payroll Active (Workday, ADP)</div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400">$14,850/mo</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Automated Admin Invoicing</div>
          </div>
        </div>

      </div>
    </div>
  );
};
