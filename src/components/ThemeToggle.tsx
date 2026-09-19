import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface ThemeToggleProps {
  variant?: 'nav' | 'compact' | 'expanded';
  className?: string;
  id?: string;
  onThemeChange?: (theme: 'dark' | 'light') => void;
}

/**
 * Fallback hook if ThemeToggle is rendered without ThemeProvider
 */
function useSafeTheme() {
  try {
    return useTheme();
  } catch {
    // Standalone fallback using document.documentElement and localStorage directly
    const [standaloneTheme, setStandaloneTheme] = useState<'dark' | 'light'>(() => {
      if (typeof window === 'undefined') return 'dark';
      const stored = localStorage.getItem('theme') || localStorage.getItem('sf_portfolio_theme');
      if (stored === 'light' || stored === 'dark') return stored;
      const attr = document.documentElement.getAttribute('data-theme');
      return attr === 'light' ? 'light' : 'dark';
    });

    const toggleTheme = () => {
      const next = standaloneTheme === 'dark' ? 'light' : 'dark';
      setStandaloneTheme(next);
      document.documentElement.setAttribute('data-theme', next);
      document.documentElement.dataset.theme = next;
      if (next === 'light') {
        document.documentElement.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
      }
      try {
        localStorage.setItem('theme', next);
        localStorage.setItem('sf_portfolio_theme', next);
      } catch (e) {
        console.warn('Failed to save theme in localStorage', e);
      }
    };

    return {
      theme: standaloneTheme,
      isLight: standaloneTheme === 'light',
      toggleTheme,
      setTheme: (mode: 'dark' | 'light') => {
        setStandaloneTheme(mode);
        document.documentElement.setAttribute('data-theme', mode);
        document.documentElement.dataset.theme = mode;
        try {
          localStorage.setItem('theme', mode);
          localStorage.setItem('sf_portfolio_theme', mode);
        } catch (e) {}
      },
    };
  }
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'nav',
  className = '',
  id,
  onThemeChange,
}) => {
  const { theme, isLight, toggleTheme } = useSafeTheme();

  const handleToggle = () => {
    toggleTheme();
    // Ensure document.documentElement data-theme attribute is explicitly set immediately
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem('theme', nextTheme);
      localStorage.setItem('sf_portfolio_theme', nextTheme);
    } catch (e) {}
    if (onThemeChange) {
      onThemeChange(nextTheme);
    }
  };

  const nextThemeLabel = isLight ? 'Dark Mode' : 'High-Contrast Light';

  if (variant === 'expanded') {
    return (
      <button
        id={id || 'theme-toggle-expanded'}
        onClick={handleToggle}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
          isLight
            ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
            : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800'
        } ${className}`}
        title={`Current: ${isLight ? 'High-Contrast Light' : 'Dark Mode'}. Click to switch to ${nextThemeLabel}`}
        aria-label={`Toggle theme between dark and light modes. Current: ${theme}`}
        data-active-theme={theme}
      >
        <div className="flex items-center gap-2">
          {isLight ? (
            <Sun className="w-4 h-4 text-amber-600" />
          ) : (
            <Moon className="w-4 h-4 text-cyan-400" />
          )}
          <span>Theme: {isLight ? 'High-Contrast Light' : 'Dark Mode'}</span>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
          {isLight ? 'LIGHT' : 'DARK'}
        </span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        id={id || 'theme-toggle-compact'}
        onClick={handleToggle}
        className={`p-2 rounded-xl border transition-all cursor-pointer ${
          isLight
            ? 'bg-white border-slate-300 text-amber-700 hover:bg-slate-100 shadow-sm'
            : 'bg-slate-900 border-slate-800 text-cyan-400 hover:bg-slate-800'
        } ${className}`}
        title={`Current: ${isLight ? 'High-Contrast Light' : 'Dark'}. Switch to ${nextThemeLabel}`}
        aria-label={`Switch to ${nextThemeLabel}`}
        data-active-theme={theme}
      >
        {isLight ? <Sun className="w-4 h-4 text-amber-600" /> : <Moon className="w-4 h-4 text-cyan-400" />}
      </button>
    );
  }

  // Default 'nav' variant: button with icon, label, and mode tag
  return (
    <button
      id={id || 'theme-toggle-nav-btn'}
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
        isLight
          ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
          : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800 shadow-sm'
      } ${className}`}
      title={`Switch to ${nextThemeLabel} (Saved in localStorage)`}
      aria-label={`Theme toggler: currently ${theme}. Click to activate ${nextThemeLabel}`}
      data-active-theme={theme}
    >
      <div className="relative flex items-center justify-center">
        {isLight ? (
          <Sun className="w-3.5 h-3.5 text-amber-600 animate-in spin-in-45 duration-200" />
        ) : (
          <Moon className="w-3.5 h-3.5 text-cyan-400 animate-in spin-in-12 duration-200" />
        )}
      </div>
      <span className="hidden lg:inline text-[11px] font-semibold tracking-tight">
        {isLight ? 'Light' : 'Dark'}
      </span>
      <span
        className={`text-[9px] font-mono px-1 py-0.2 rounded font-bold uppercase tracking-wider ${
          isLight
            ? 'bg-amber-100 text-amber-900 border border-amber-300'
            : 'bg-cyan-950 text-cyan-300 border border-cyan-800/60'
        }`}
      >
        {isLight ? 'HC' : 'PRO'}
      </span>
    </button>
  );
};

export default ThemeToggle;
