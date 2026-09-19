import React, { useState } from 'react';
import { Download, Smartphone, X, Share2, PlusSquare, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'nav' | 'hero' | 'floating';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'nav',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already running as an installed PWA, render a subtle installed badge or null
  if (isInstalled || justInstalled) {
    if (variant === 'nav') {
      return (
        <span
          id="pwa-installed-badge"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 rounded-full"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          PWA Installed
        </span>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // If browser doesn't support deferred prompt yet, show instructional modal
      setShowIOSGuide(true);
    }
  };

  const buttonContent = (
    <>
      <Download className={variant === 'hero' ? 'w-4 h-4 text-cyan-400' : 'w-3.5 h-3.5'} />
      <span>Install PWA</span>
    </>
  );

  let styleClasses = '';
  if (variant === 'nav') {
    styleClasses =
      'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg shadow-sm shadow-cyan-900/30 border border-cyan-400/30 transition-all cursor-pointer';
  } else if (variant === 'hero') {
    styleClasses =
      'inline-flex items-center justify-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl shadow-lg shadow-cyan-950/50 border border-cyan-300/30 transition-all cursor-pointer transform hover:-translate-y-0.5';
  } else {
    styleClasses =
      'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg shadow-md transition-all cursor-pointer';
  }

  return (
    <>
      <button
        id={`pwa-install-btn-${variant}`}
        onClick={handleInstallClick}
        className={`${styleClasses} ${className}`}
        title="Install this portfolio as a Progressive Web App on your phone or desktop"
      >
        {buttonContent}
      </button>

      {/* Guide Modal (for iOS or browsers without direct prompt) */}
      {showIOSGuide && (
        <div
          id="pwa-guide-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            id="pwa-guide-modal-card"
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="pwa-guide-close-btn"
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Install Portfolio PWA</h3>
                <p className="text-xs text-slate-400">Android WebView, Mobile & Desktop</p>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg shrink-0 mt-0.5">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-200">On iOS / Safari:</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tap the <strong>Share</strong> button in Safari toolbar, scroll down, and select{' '}
                    <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-200">On Chrome / Android:</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tap the 3-dots menu icon and tap <strong>Install app</strong> or <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
                <span className="font-semibold text-cyan-300">Android APK Notice:</span> This application also matches the{' '}
                <code className="bg-cyan-900/60 px-1 py-0.5 rounded text-cyan-200">com.pwa.vercel_com</code> Android WebView wrapper specs with full DOM storage and offline capability.
              </div>
            </div>

            <button
              id="pwa-guide-confirm-btn"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
