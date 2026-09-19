import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ArrowRight,
  Download,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Zap,
  HardDrive,
  Layers,
  Sparkles,
  FileText,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { PWAInstallButton } from './PWAInstallButton';

interface HeroProps {
  onOpenAndroidCompanion: () => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAndroidCompanion, onOpenResume }) => {
  const [isDomStorageReady, setIsDomStorageReady] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('__sf_pwa_probe', 'active');
      localStorage.removeItem('__sf_pwa_probe');
      setIsDomStorageReady(true);
    } catch {
      setIsDomStorageReady(false);
    }

    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-900/80"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-purple-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Calls to Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Developer Avatar & Status Pill */}
            <div className="flex items-center gap-4">
              <div className="relative group shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-cyan-500/40 shadow-xl shadow-cyan-500/10 bg-slate-900">
                  <img
                    src={PERSONAL_INFO.avatarUrl || '/assets/images/developer-avatar.jpg'}
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4" title="Active & Available for contracts">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950"></span>
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-sm">
                  <span className="font-semibold text-emerald-400">Available for Work</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400 font-mono text-[11px]">{PERSONAL_INFO.pwaPackage}</span>
                </div>
                <p className="text-xs text-slate-400">
                  <span className="text-cyan-300 font-medium">{PERSONAL_INFO.title}</span>
                </p>
              </div>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Crafting High-Speed{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  PWAs & Modern Web
                </span>{' '}
                Experiences.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Hi, I'm <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>. {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                id="hero-explore-projects-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <PWAInstallButton variant="hero" />

              <button
                id="hero-android-bridge-btn"
                onClick={onOpenAndroidCompanion}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Android Smali Specs</span>
              </button>

              {onOpenResume && (
                <button
                  id="hero-view-resume-btn"
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 rounded-xl transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Curriculum Vitae</span>
                </button>
              )}
            </div>

            {/* Metrics Ribbon */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-900">
              {PERSONAL_INFO.stats.map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <p className="text-xl sm:text-2xl font-black text-cyan-400 font-mono tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Android WebView Live Architecture Card */}
          <div className="lg:col-span-5">
            <div
              id="android-runtime-card"
              className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/90 shadow-2xl p-5 sm:p-6 relative overflow-hidden"
            >
              {/* Header Bar simulating Android Phone status & package */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white font-mono leading-none">
                      com.pwa.vercel_com
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-1">MainActivity.smali Runtime</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                  WebView v1
                </span>
              </div>

              {/* PWA & WebView Architecture Visual */}
              <div className="mt-3.5 relative h-28 w-full rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 group">
                <img
                  src="/assets/images/pwa-mobile-experience.jpg"
                  alt="Android PWA WebView Architecture Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px]">
                  <span className="text-cyan-300 font-mono font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Dalvik/Smali Container
                  </span>
                  <span className="bg-slate-900/90 text-emerald-400 font-mono px-1.5 py-0.5 rounded border border-emerald-500/30">
                    Offline Ready
                  </span>
                </div>
              </div>

              {/* Start URL & Target */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">startUrl (String)</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>
                <div className="text-xs font-mono text-cyan-300 break-all bg-slate-900/70 p-2 rounded border border-slate-800/60">
                  {PERSONAL_INFO.startUrl}
                </div>
              </div>

              {/* Verified WebView Settings (reflecting MainActivity.smali) */}
              <div className="mt-4 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Configured WebSettings
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      JavaScript
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">Enabled</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                      DOM Storage
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">
                      {isDomStorageReady ? 'Verified' : 'Simulated'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      HTML5 DB
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">IndexedDB</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      Wide Viewport
                    </span>
                    <span className="text-[11px] font-mono font-bold text-cyan-300">
                      {viewportWidth}px
                    </span>
                  </div>
                </div>
              </div>

              {/* WebView Back-Stack Handler Info */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-2.5">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">onBackPressed() Trapped:</span>
                  <p className="text-slate-400 mt-0.5">
                    Internal history navigation handled via <code className="text-cyan-300">webView.goBack()</code> before native activity exit.
                  </p>
                </div>
              </div>

              {/* Inspect Smali Trigger Button */}
              <button
                id="hero-card-inspect-smali"
                onClick={onOpenAndroidCompanion}
                className="mt-4 w-full py-2 px-3 text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/30 hover:bg-cyan-950/50 border border-cyan-500/30 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Full Smali & Java Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
