import React from 'react';
import { WifiOff, AlertCircle } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      id="offline-banner"
      className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/95 text-slate-950 font-medium text-sm shadow-xl shadow-amber-950/40 border border-amber-300/40 backdrop-blur-md animate-in slide-in-from-bottom duration-300"
    >
      <div className="p-1 rounded-lg bg-amber-600/40 text-slate-950 shrink-0">
        <WifiOff className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold leading-tight">Offline Mode Active</p>
        <p className="text-[11px] text-slate-900/90 leading-tight">
          Portfolio & cached assets loaded via Service Worker precache.
        </p>
      </div>
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
      </span>
    </div>
  );
};
