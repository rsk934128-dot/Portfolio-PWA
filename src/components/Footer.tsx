import React from 'react';
import { Smartphone, ArrowUp, Github, Linkedin, Globe, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

interface FooterProps {
  onOpenAndroidCompanion: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAndroidCompanion }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-bold text-xs text-cyan-400">
                SF
              </div>
            </div>
            <div>
              <p className="font-bold text-white text-sm">{PERSONAL_INFO.name}</p>
              <p className="text-[11px] text-slate-500 font-mono">
                {PERSONAL_INFO.pwaPackage} · PWA v1.0.0
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onOpenAndroidCompanion}
              className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>MainActivity.smali Specs</span>
            </button>
            <span>•</span>
            <a
              href={PERSONAL_INFO.startUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition"
            >
              Vercel App
            </a>
            <span>•</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-400 hover:text-white transition"
            >
              Email Me
            </a>
          </div>

          {/* Actions: Theme Toggle & Back to top */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle variant="nav" />
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer flex items-center gap-1.5"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[11px]">Back to top</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900/80 text-center text-slate-500 text-[11px]">
          Designed & built for Android WebView containerization, Chromium installability, and responsive modern web.
        </div>
      </div>
    </footer>
  );
};
