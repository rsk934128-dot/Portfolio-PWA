import React, { useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Download,
  Mail,
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
  Smartphone,
  Globe,
  Code2,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
SHEIKH FARID
Lead Full-Stack & Mobile PWA Developer
Email: ${PERSONAL_INFO.email}
Location: Dhaka, Bangladesh (Available Worldwide Remote)
Portfolio: ${PERSONAL_INFO.startUrl}
Android PWA Packages: com.pwa.vercel_com | com.pwa.youtube_com

==================================================
EXECUTIVE SUMMARY
==================================================
Results-oriented Full-Stack & Mobile PWA Developer with 5+ years of production experience building high-performance web applications, offline-first Progressive Web Apps (PWAs), and native Android WebView hybrid wrappers. Expert in Dalvik/Smali bytecode optimization, hardware acceleration, service workers, and enterprise React/Node.js ecosystems.

==================================================
CORE TECHNICAL COMPETENCIES
==================================================
• Mobile & WebView: Dalvik/Smali Bytecode, Android WebView (API 21+), WebSettings (DOM Storage, JavaScript, IndexedDB, Overview Mode, Viewport), onBackPressed Navigation Trapping, APK Packaging.
• Frontend Engineering: React 19, TypeScript, Next.js, Modern Tailwind CSS, Motion Layouts, Web App Manifests, Workbox, Service Workers, Offline Caching.
• Backend & Infrastructure: Node.js, Express.js, RESTful APIs, Cloud Run, Vercel, Git CI/CD, Containerization.
• Performance & Standards: Core Web Vitals (LCP < 1.2s), Lighthouse 98+, SEO & Schema.org, WCAG AA Accessibility.

==================================================
SIGNATURE PROJECTS & ARCHITECTURES
==================================================
1. YouTube PWA Android WebView Wrapper (com.pwa.youtube_com)
   - Built custom MainActivity.smali bytecode wrapper for https://www.youtube.com/
   - Enforced hardware acceleration, DOM storage, database persistence, and back-stack history trapping.

2. Portfolio PWA & Native Android Bridge (com.pwa.vercel_com)
   - Created full offline-first PWA with Chromium installability and companion Smali disassembler.
   - 100% lighthouse compliance across performance, accessibility, and PWA metrics.

3. OmniAI Studio (Next.js, Tailwind, WebSockets, AI APIs)
   - Multi-modal generative AI workspace with streaming tokens and local cache layer.

4. ApexCommerce Enterprise PWA
   - Headless eCommerce storefront achieving sub-second catalog transitions and offline cart persistence.

==================================================
EDUCATION & CREDENTIALS
==================================================
• Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)
• Professional Certifications: Google PWA Specialist, Advanced Android Application Architecture.
`.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="resume-modal-container"
        className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">Curriculum Vitae / Resume</h2>
              <p className="text-[11px] text-slate-400">Sheikh Farid · Lead Full-Stack & Mobile Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="resume-print-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              id="resume-copy-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
              title="Copy plain text CV"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 print:p-0 print:bg-white print:text-black">
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-cyan-500/30 border border-slate-700 bg-slate-900 shrink-0">
                <img
                  src={PERSONAL_INFO.avatarUrl || '/assets/images/developer-avatar.jpg'}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white print:text-black tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-cyan-400 print:text-cyan-700 font-semibold text-sm sm:text-base mt-0.5">
                  Lead Full-Stack & Mobile PWA Developer
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 print:text-slate-600 mt-2 font-mono">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:underline">
                      {PERSONAL_INFO.email}
                    </a>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    Dhaka, Bangladesh (Remote)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <a href={PERSONAL_INFO.startUrl} target="_blank" rel="noreferrer" className="hover:underline">
                      Portfolio App
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-50 print:border-slate-200 text-xs font-mono space-y-1 shrink-0">
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Native Containers</p>
              <p className="text-cyan-300 font-semibold">com.pwa.vercel_com</p>
              <p className="text-rose-400 font-semibold">com.pwa.youtube_com</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-mono">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-300 print:text-slate-800 leading-relaxed">
              High-impact Full-Stack and Mobile PWA Engineer with extensive experience bridging the gap between web standards and native Android execution. Proven track record architecting offline-first Progressive Web Apps, authoring Smali/Dalvik bytecode WebView wrappers with hardware acceleration, and designing scalable React and Node.js RESTful backends. Passionate about sub-second load times, cross-device consistency, and clean modular code.
            </p>
          </div>

          {/* Core Skills Grid */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-mono">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200 print:text-slate-900">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile & Android WebView Bridging</span>
                </div>
                <p className="text-slate-400 print:text-slate-700 leading-relaxed">
                  Dalvik/Smali Bytecode, Android WebView (API 21+), WebSettings (DOM Storage, Database, Overview Mode, Wide Viewport), <code className="font-mono text-cyan-300">onBackPressed()</code> Back-Stack Trapping, Hardware Acceleration, APK Packaging.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200 print:text-slate-900">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <span>Progressive Web Apps & Frontend</span>
                </div>
                <p className="text-slate-400 print:text-slate-700 leading-relaxed">
                  PWA Standards, Service Workers, Workbox Caching, Web App Manifests, React 19, TypeScript, Next.js, Tailwind CSS v4, Motion Layout Animations, WCAG AA Accessibility.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200 print:text-slate-900">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>Backend & API Architecture</span>
                </div>
                <p className="text-slate-400 print:text-slate-700 leading-relaxed">
                  Node.js, Express.js, RESTful APIs, Server-Side Gemini API integrations, JSON-LD Structured Data, Express Middleware, Error Boundary systems.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 print:bg-slate-50 print:border-slate-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200 print:text-slate-900">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>DevOps & Quality Engineering</span>
                </div>
                <p className="text-slate-400 print:text-slate-700 leading-relaxed">
                  Vite Bundling, Esbuild, Docker / Cloud Run containers, Vercel deployments, Lighthouse Performance 98+, Git Version Control, CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>

          {/* Key Projects Showcase */}
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-mono">
              Key Projects & Milestones
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/70 print:bg-slate-50 print:border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    YouTube PWA Android WebView Wrapper
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400">com.pwa.youtube_com · 2026</span>
                </div>
                <p className="text-xs text-slate-300 print:text-slate-700 mt-1.5 leading-relaxed">
                  Developed customized <code className="font-mono text-cyan-300">MainActivity.smali</code> wrapper loading <code className="font-mono">https://www.youtube.com/</code> inside native Android runtime. Implemented full DOM storage, database persistence, overview mode, and seamless back-stack history trapping for native back button interactions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/70 print:bg-slate-50 print:border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    Portfolio Progressive Web App & Smali Companion
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400">com.pwa.vercel_com · 2026</span>
                </div>
                <p className="text-xs text-slate-300 print:text-slate-700 mt-1.5 leading-relaxed">
                  Constructed complete offline-first PWA featuring in-app install prompts, Service Worker caching, interactive Smali disassembly inspector, high-contrast light/dark theming, and real-time backend API dispatch.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/70 print:bg-slate-50 print:border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-sm font-bold text-white print:text-black">
                    OmniAI Studio & ApexCommerce Platform
                  </h3>
                  <span className="text-[11px] font-mono text-cyan-400">Production Enterprise · 2025</span>
                </div>
                <p className="text-xs text-slate-300 print:text-slate-700 mt-1.5 leading-relaxed">
                  Architected multi-tenant AI canvas workspace with token streaming, alongside a headless eCommerce application handling offline inventory caching and responsive checkouts.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Experience Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-800 print:border-slate-300">
            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-mono flex items-center gap-1.5 mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h2>
              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/70 print:bg-slate-50 print:border-slate-200 space-y-1">
                <p className="text-xs font-bold text-white print:text-black">
                  Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)
                </p>
                <p className="text-[11px] text-slate-400">Dhaka, Bangladesh</p>
                <p className="text-[11px] text-slate-300 print:text-slate-600 mt-1">
                  Focus: Systems Programming, Web Architectures, Mobile Application Engineering, Data Structures & Algorithms.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-mono flex items-center gap-1.5 mb-3">
                <Award className="w-4 h-4" />
                <span>Core Accolades</span>
              </h2>
              <ul className="text-xs space-y-2 text-slate-300 print:text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Specialized in Dalvik Smali bytecode decompilation & Android WebView optimization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Google PWA Best Practices 100% Score across Performance & Accessibility.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Full-Stack Architecture and Cloud Run containerization expertise.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 font-mono">
            Direct Contact:{' '}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent('Hiring Inquiry - Sheikh Farid (Lead Developer)')}`}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition inline-flex items-center gap-1.5 shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Sheikh Farid</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
