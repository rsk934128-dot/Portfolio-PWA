import React, { useState, useEffect } from 'react';
import { Smartphone, Code, Terminal, Menu, X, Wifi, WifiOff, FileText } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { ThemeToggle } from './ThemeToggle';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenAndroidCompanion: () => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAndroidCompanion, onOpenResume }) => {
  const isOnline = useOnlineStatus();
  const { isLight } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-md py-3'
            : 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center font-black text-sm tracking-wider ${
                  isLight ? 'bg-white text-cyan-700' : 'bg-slate-950 text-cyan-400'
                }`}
              >
                SF
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                Sheikh Farid
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tracking-tight leading-none">
                Portfolio PWA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Android Smali / WebView Companion Trigger */}
            <button
              id="open-android-companion-btn"
              onClick={onOpenAndroidCompanion}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100/70 dark:bg-cyan-950/40 hover:bg-cyan-200/70 dark:hover:bg-cyan-900/40 border border-cyan-400/40 dark:border-cyan-500/30 rounded-lg transition-colors cursor-pointer"
              title="Inspect Android MainActivity.smali & WebView specs"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Android Bridge</span>
            </button>

            {/* Resume / CV Modal Trigger */}
            {onOpenResume && (
              <button
                id="open-resume-nav-btn"
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors cursor-pointer"
                title="View Sheikh Farid's Curriculum Vitae"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Resume</span>
              </button>
            )}
          </nav>

          {/* Actions: Theme Toggle & PWA Install */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggler Button */}
            <ThemeToggle variant="nav" />

            {/* Online/Offline Status Indicator */}
            <div
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-medium border ${
                isOnline
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
              }`}
              title={isOnline ? 'Online - Live Network Active' : 'Offline - Serving from Service Worker Cache'}
            >
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{isOnline ? 'Live' : 'Cached'}</span>
            </div>

            {/* In-App Install Prompt */}
            <PWAInstallButton variant="nav" />
          </div>

          {/* Mobile Actions & Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle variant="compact" />
            <PWAInstallButton variant="nav" />
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className={`md:hidden mt-3 pt-3 pb-4 border-t space-y-2.5 animate-in fade-in slide-in-from-top-2 ${
              isLight ? 'border-slate-200 bg-white/95 rounded-2xl p-4 shadow-lg' : 'border-slate-800'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-cyan-600 dark:hover:text-cyan-300 transition"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAndroidCompanion();
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-cyan-700 dark:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Android Bridge & Smali Specs</span>
            </button>

            {onOpenResume && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Curriculum Vitae / Resume</span>
              </button>
            )}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <ThemeToggle variant="expanded" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
