import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Filter,
  Lock,
  EyeOff,
  BellRing,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileCode,
  Sparkles,
  Layers,
  ArrowUpRight,
  X,
} from 'lucide-react';
import {
  ANDROID_SAFEGUARDS_DATA,
  AndroidSafeguard,
} from '../data/androidSafeguardsData';

interface AndroidSecuritySafeguardsProps {
  isModal?: boolean;
  onClose?: () => void;
  highlightedPattern?: string;
}

export const AndroidSecuritySafeguards: React.FC<AndroidSecuritySafeguardsProps> = ({
  isModal = false,
  onClose,
  highlightedPattern,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(highlightedPattern || '');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [manifestComparisonMode, setManifestComparisonMode] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Safeguards' },
    { id: 'access_control', label: 'Privilege & Access Control' },
    { id: 'surveillance', label: 'Anti-Surveillance & Media' },
    { id: 'storage_transparency', label: 'Storage & Data Transparency' },
    { id: 'policy_play', label: 'Play Protect & Stalkerware Policies' },
  ];

  const filteredSafeguards = ANDROID_SAFEGUARDS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.counteredPermissionOrPattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.androidVersion.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const content = (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Defensive Android Engineering
              </span>
              <span className="text-xs text-slate-400">Android 10 → Android 15 Milestones</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Modern Android Security Safeguards Compendium
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              An educational and architectural reference detailing how the Android OS, Google Play Protect, and AppOps policies evolved to counteract stealth surveillance, accessibility abuse, and clandestine background media capturing.
            </p>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="self-end sm:self-start p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Close Safeguards"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Threat Mitigation Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-800/80 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[11px] mb-1">Restricted Settings (API 33+)</span>
            <span className="font-semibold text-emerald-300">Blocks sideloaded Accessibility abuse</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[11px] mb-1">Foreground Services (API 34+)</span>
            <span className="font-semibold text-cyan-300">Non-dismissible camera/mic indicators</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block text-[11px] mb-1">Play Protect Stalkerware Policy</span>
            <span className="font-semibold text-amber-300">Mandatory icon disclosure & notice</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Category Filter & Manifest Comparison Mode */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search safeguards by permission, Android version, or keyword..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setManifestComparisonMode(!manifestComparisonMode)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              manifestComparisonMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{manifestComparisonMode ? 'Viewing Manifest Countermeasures' : 'Map to AirDroid Manifest'}</span>
          </button>
        </div>
      </div>

      {/* Manifest Mapping Legend (When Active) */}
      {manifestComparisonMode && (
        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300">AirDroid Kids Manifest Countermeasure Mapping:</span>{' '}
            <span className="text-slate-300">
              Each card below highlights how modern Android APIs neutralize the exact privileges declared in the <code className="font-mono text-amber-300">com.sand.airdroidkids</code> APK string table (e.g. Accessibility sniffing, hidden secret code dialers, and WebRTC streaming).
            </span>
          </div>
        </div>
      )}

      {/* Safeguards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSafeguards.map((item) => {
          const isExpanded = expandedCardId === item.id;

          return (
            <div
              key={item.id}
              className={`flex flex-col rounded-xl border bg-slate-950/70 transition duration-200 ${
                manifestComparisonMode
                  ? 'border-amber-500/30 hover:border-amber-500/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 space-y-2 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50">
                        {item.androidVersion}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
                        {item.apiLevel}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          item.severityMitigated === 'Critical'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : item.severityMitigated === 'High'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {item.severityMitigated} Risk Mitigation
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                  </div>
                </div>

                {/* Countered Privilege Pill */}
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800/90 text-[11px]">
                  <span className="text-slate-400 block text-[10px] uppercase font-mono tracking-wider">
                    Neutralizes Privilege / Pattern:
                  </span>
                  <code className="text-amber-300 font-mono font-medium block mt-0.5 break-all">
                    {item.counteredPermissionOrPattern}
                  </code>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">{item.summary}</p>
              </div>

              {/* Expandable Deep Dive Body */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-800/80 text-xs bg-slate-950/40">
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-200 block">OS-Level Enforcement:</span>
                    <p className="text-slate-400 leading-relaxed">{item.howItWorks}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-semibold text-slate-200 block">Manifest & Code Policy:</span>
                    <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
                      <code>{item.manifestRule}</code>
                    </pre>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-emerald-200 space-y-0.5">
                    <span className="font-semibold text-emerald-300 block text-[11px]">User Defense & Privacy Impact:</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{item.defenseImpact}</p>
                  </div>
                </div>
              )}

              {/* Toggle Footer */}
              <div className="px-4 py-2.5 border-t border-slate-800/60 bg-slate-900/40 rounded-b-xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  Category: {item.category.replace('_', ' ').toUpperCase()}
                </span>
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>{isExpanded ? 'Show Less' : 'Technical Details'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSafeguards.length === 0 && (
        <div className="p-8 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-400 text-xs space-y-2">
          <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto" />
          <p className="font-semibold text-slate-300">No security safeguards matched your query.</p>
          <p>Try resetting the category filter or clearing your search term.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div
        id="android-safeguards-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget && onClose) onClose();
        }}
      >
        <div
          id="android-safeguards-modal-container"
          className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">{content}</div>
        </div>
      </div>
    );
  }

  return content;
};
