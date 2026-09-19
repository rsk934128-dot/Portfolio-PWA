import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  isLight: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = 'theme';
const LEGACY_STORAGE_KEY = 'sf_portfolio_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
      // Also check documentElement attribute if pre-rendered
      const docAttr = document.documentElement.getAttribute('data-theme');
      if (docAttr === 'light' || docAttr === 'dark') {
        return docAttr;
      }
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const applyTheme = (mode: ThemeMode) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-theme', mode);
    root.dataset.theme = mode;

    if (mode === 'light') {
      root.classList.add('light-theme');
      if (body) {
        body.classList.add('light-theme');
        body.setAttribute('data-theme', 'light');
      }
    } else {
      root.classList.remove('light-theme');
      if (body) {
        body.classList.remove('light-theme');
        body.setAttribute('data-theme', 'dark');
      }
    }

    // Synchronize PWA meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', mode === 'light' ? '#f8fafc' : '#020617');
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen to external storage events (e.g. multi-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === THEME_STORAGE_KEY || e.key === LEGACY_STORAGE_KEY) && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
      localStorage.setItem(LEGACY_STORAGE_KEY, mode);
    } catch (err) {
      console.warn('Unable to persist theme to localStorage:', err);
    }
  };

  const toggleTheme = () => {
    const nextMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isLight: theme === 'light',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
