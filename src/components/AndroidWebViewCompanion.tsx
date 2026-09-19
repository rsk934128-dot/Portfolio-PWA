import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  Smartphone,
  Code2,
  FileCode,
  Layers,
  Terminal,
  Play,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Shield,
  ShieldAlert,
  Search,
  Lock,
  Radio,
  Eye,
  FileText,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import {
  ANDROID_PWA_PROFILES,
  AndroidPwaProfile,
} from '../data/portfolioData';
import { AIRDROID_SECURITY_AUDIT } from '../data/airdroidDecompiledData';
import { AndroidSecuritySafeguards } from './AndroidSecuritySafeguards';

interface AndroidWebViewCompanionProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfileId?: string;
}

const RAW_AIRDROID_SAMPLE = `com.sand.airdroidkids 1.0.2.2 android.permission.BIND_DEVICE_ADMIN android.permission.BIND_ACCESSIBILITY_SERVICE android.permission.BIND_NOTIFICATION_LISTENER_SERVICE android.permission.PACKAGE_USAGE_STATS android.permission.SYSTEM_ALERT_WINDOW android.permission.CAMERA android.permission.RECORD_AUDIO android.permission.ACCESS_FINE_LOCATION android.permission.ACCESS_BACKGROUND_LOCATION android.permission.QUERY_ALL_PACKAGES android.permission.REQUEST_DELETE_PACKAGES android.permission.REQUEST_INSTALL_PACKAGES android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS android.telephony.action.SECRET_CODE android_secret_code p4105c16b44a28a5728d70e83 com.sand.airdroidkids.KidSplashActivity_ com.sand.airdroidkids.KidSplashActivity_alias com.sand.airdroidkids.ui.main.KidMainActivity com.sand.airdroidkids.ui.main.KidLimitAppActivity com.sand.airdroidkids.ui.main.KidLimitSettingActivity com.sand.airdroidkid.common.ui.base.web.SandWebActivity_ com.sand.airdroidkids.webrtc.InitWebRTCCameraActivity com.sand.airdroidkids.webrtc.InitWebRTCScreenActivity com.sand.airdroidkids.webrtc.InitAudioActivity com.sand.airdroidkids.ui.guide.KidGuideFragmentActivity_ com.sand.airdroidkids.ui.guide.KidGuideCheckListActivity com.sand.airdroidkids.ui.guide.KidHideIconActivity_ com.sand.airdroidkids.ui.guide.KidHideNotifyActivity_ com.sand.airdroidkids.ui.guide.KidBindProcessCompleteActivity com.sand.airdroidkids.ui.permission.KidPermissionGuideFragmentActivity_ com.sand.airdroidkids.components.dm.KidDeviceAdminReceiver com.sand.airdroidkids.services.AccessibilityLimitService com.sand.airdroidkids.services.NotificationService com.sand.airdroidkids.webrtc.SandWebRTCService_ com.sand.airdroidkids.services.AirDroidService com.sand.airdroidkids.services.AirDroidKeepLiveService com.sand.airdroidkids.services.CurrentLocationService com.sand.airdroidkids.services.KidFusedProviderLocationService com.sand.airdroidkids.services.KidGeofenceService com.sand.airdroidkids.KidLaunchReceiver com.sand.airdroidkids.servers.event.observers.EventReceiver com.sand.airdroidkids.servers.event.observers.PressHomeKeyBroadcastReceiver com.sand.airdroidkids.fileprovider com.sand.airdroidkids.ProtectedSandApp com.sand.airdroidkids.ProtectedAppComponentFactory`;

export const AndroidWebViewCompanion: React.FC<AndroidWebViewCompanionProps> = ({
  isOpen,
  onClose,
  initialProfileId = 'airdroid_kids',
}) => {
  const [selectedProfileId, setSelectedProfileId] = useState<string>(initialProfileId);
  const [activeTab, setActiveTab] = useState<'smali' | 'java' | 'manifest' | 'audit' | 'safeguards' | 'tester'>('manifest');
  const [copied, setCopied] = useState(false);

  // Raw AXML parser state
  const [rawAxmlInput, setRawAxmlInput] = useState(RAW_AIRDROID_SAMPLE);
  const [parsedTokens, setParsedTokens] = useState<{
    totalTokens: number;
    permissions: string[];
    activities: string[];
    services: string[];
    receivers: string[];
    actions: string[];
  }>({
    totalTokens: 0,
    permissions: [],
    activities: [],
    services: [],
    receivers: [],
    actions: [],
  });

  // Sync initialProfileId when modal opens
  useEffect(() => {
    if (initialProfileId) {
      setSelectedProfileId(initialProfileId);
      if (initialProfileId === 'airdroid_kids') {
        setActiveTab('audit');
      }
    }
  }, [initialProfileId, isOpen]);

  // Live tester states
  const [domStorageResult, setDomStorageResult] = useState<string | null>(null);
  const [dbStorageResult, setDbStorageResult] = useState<string | null>(null);
  const [historyResult, setHistoryResult] = useState<string | null>(null);
  const [uaDetails, setUaDetails] = useState<{ isWebView: boolean; ua: string }>({
    isWebView: false,
    ua: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent;
      const isWebView = /wv|Version\/.*Chrome/.test(ua) || (window as any).Android !== undefined;
      setUaDetails({ isWebView, ua });
    }
  }, []);

  // Parse raw AXML input
  useEffect(() => {
    if (!rawAxmlInput) return;
    const cleanTokens = rawAxmlInput
      .replace(/[^\x20-\x7E\n]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 2);

    const permissions = Array.from(
      new Set(
        cleanTokens.filter(
          (t) => t.startsWith('android.permission') || t.includes('.permission.') || t.endsWith('_STATS') || t.endsWith('_PERMISSION')
        )
      )
    );
    const activities = Array.from(
      new Set(
        cleanTokens.filter(
          (t) => t.endsWith('Activity') || t.endsWith('Activity_') || t.endsWith('Activity_alias')
        )
      )
    );
    const services = Array.from(
      new Set(cleanTokens.filter((t) => t.endsWith('Service') || t.endsWith('Service_')))
    );
    const receivers = Array.from(
      new Set(
        cleanTokens.filter(
          (t) =>
            t.endsWith('Receiver') ||
            t.endsWith('Proxy') ||
            t.includes('Receiver$') ||
            t.endsWith('ProxyReceiver')
        )
      )
    );
    const actions = Array.from(
      new Set(
        cleanTokens.filter(
          (t) => t.startsWith('android.intent.action') || t.includes('.action.') || t.includes('SECRET_CODE')
        )
      )
    );

    setParsedTokens({
      totalTokens: cleanTokens.length,
      permissions,
      activities,
      services,
      receivers,
      actions,
    });
  }, [rawAxmlInput]);

  if (!isOpen) return null;

  const currentProfile: AndroidPwaProfile =
    ANDROID_PWA_PROFILES.find((p) => p.id === selectedProfileId) || ANDROID_PWA_PROFILES[0];

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testDomStorage = () => {
    try {
      const key = '__sf_test_' + Date.now();
      const val = 'smali_setDomStorageEnabled_OK';
      localStorage.setItem(key, val);
      const read = localStorage.getItem(key);
      localStorage.removeItem(key);
      if (read === val) {
        setDomStorageResult('Success: DOM Storage read/write verified. Matches setDomStorageEnabled(true)');
      } else {
        setDomStorageResult('Failed to verify stored value');
      }
    } catch (e: any) {
      setDomStorageResult('Error: ' + e.message);
    }
  };

  const testIndexedDB = () => {
    if (!window.indexedDB) {
      setDbStorageResult('IndexedDB not supported in current environment');
      return;
    }
    const request = window.indexedDB.open('__sf_pwa_db_probe', 1);
    request.onsuccess = () => {
      setDbStorageResult('Success: HTML5 Database / IndexedDB open verified. Matches setDatabaseEnabled(true)');
      request.result.close();
    };
    request.onerror = () => {
      setDbStorageResult('Failed to initialize HTML5 database');
    };
  };

  const testHistoryBack = () => {
    const depth = window.history.length;
    setHistoryResult(`Navigation history depth: ${depth} entries. Active trap: onBackPressed() bridge.`);
  };

  return (
    <div
      id="android-companion-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="android-companion-modal-container"
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-cyan-950/40 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {currentProfile.name}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                    currentProfile.id === 'airdroid_kids'
                      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30'
                      : currentProfile.id === 'youtube_com'
                      ? 'text-rose-400 bg-rose-950/60 border-rose-500/30'
                      : 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30'
                  }`}
                >
                  {currentProfile.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Package: <code className="text-cyan-300 font-mono">{currentProfile.package}</code> · Class:{' '}
                <code className="text-slate-300 font-mono text-[11px]">{currentProfile.className}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
            {/* Profile Selection Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              {ANDROID_PWA_PROFILES.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => {
                    setSelectedProfileId(prof.id);
                    if (prof.id === 'airdroid_kids') {
                      setActiveTab('audit');
                    } else if (activeTab === 'audit') {
                      setActiveTab('manifest');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer text-xs ${
                    selectedProfileId === prof.id
                      ? prof.id === 'airdroid_kids'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                        : prof.id === 'youtube_com'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {prof.id === 'airdroid_kids'
                    ? 'AirDroid Kids APK'
                    : prof.id === 'youtube_com'
                    ? 'YouTube Wrapper'
                    : 'Portfolio PWA'}
                </button>
              ))}
            </div>

            <button
              id="android-companion-close-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 px-5 py-2.5 bg-slate-950/50 border-b border-slate-800/80 overflow-x-auto text-xs">
          {currentProfile.id === 'airdroid_kids' && (
            <button
              id="tab-audit-btn"
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span>AXML & Security Audit</span>
            </button>
          )}

          <button
            id="tab-manifest-btn"
            onClick={() => setActiveTab('manifest')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
              activeTab === 'manifest'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>AndroidManifest.xml</span>
          </button>

          <button
            id="tab-smali-btn"
            onClick={() => setActiveTab('smali')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
              activeTab === 'smali'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Smali Bytecode</span>
          </button>

          <button
            id="tab-java-btn"
            onClick={() => setActiveTab('java')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
              activeTab === 'java'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Java Source</span>
          </button>

          <button
            id="tab-safeguards-btn"
            onClick={() => setActiveTab('safeguards')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
              activeTab === 'safeguards'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Modern OS Safeguards</span>
          </button>

          <button
            id="tab-tester-btn"
            onClick={() => setActiveTab('tester')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
              activeTab === 'tester'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>WebView Runtime Probe</span>
          </button>

          <div className="ml-auto flex items-center gap-2">
            {activeTab !== 'tester' && activeTab !== 'audit' && activeTab !== 'safeguards' && (
              <button
                onClick={() => {
                  if (activeTab === 'smali') handleCopy(currentProfile.smali);
                  else if (activeTab === 'java') handleCopy(currentProfile.java);
                  else if (activeTab === 'manifest') handleCopy(currentProfile.manifest);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition font-mono text-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-xs">
          {/* Security Audit & AXML String Decompiler */}
          {activeTab === 'audit' && currentProfile.id === 'airdroid_kids' && (
            <div className="font-sans space-y-6">
              {/* Security Audit Showcase Banner */}
              <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-950 shadow-xl">
                <img
                  src="/assets/images/smali-security-showcase.jpg"
                  alt="Android Security Analysis & Smali Disassembly Showcase"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-emerald-400" />
                      AXML & Bytecode Security Lab
                    </span>
                    <p className="text-[11px] text-slate-300 hidden sm:block mt-0.5">
                      Vulnerability & telemetry inspection for com.sand.airdroidkids
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-1 rounded bg-slate-900/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                    API 33 Dual-Use Audit
                  </span>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400">Target Application</span>
                  <p className="text-sm font-bold text-white mt-1">{AIRDROID_SECURITY_AUDIT.packageName}</p>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5">{AIRDROID_SECURITY_AUDIT.version}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-xs text-slate-400">Target Platform</span>
                  <p className="text-sm font-bold text-white mt-1">{AIRDROID_SECURITY_AUDIT.targetSdk}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{AIRDROID_SECURITY_AUDIT.vendor}</p>
                </div>
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40">
                  <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Security Privilege Assessment
                  </span>
                  <p className="text-xs font-semibold text-slate-200 mt-1">{AIRDROID_SECURITY_AUDIT.riskScore}</p>
                </div>
              </div>

              {/* Ethical Threat Modeling & Dual-Use Context */}
              {AIRDROID_SECURITY_AUDIT.threatModeling && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      {AIRDROID_SECURITY_AUDIT.threatModeling.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {AIRDROID_SECURITY_AUDIT.threatModeling.context}
                  </p>

                  {/* Dual-Use Risk Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    {AIRDROID_SECURITY_AUDIT.threatModeling.risks.map((risk, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-amber-500/20 text-xs">
                        <span className="font-semibold text-amber-300 block mb-1">{risk.title}</span>
                        <span className="text-slate-400 text-[11px] leading-relaxed">{risk.description}</span>
                      </div>
                    ))}
                  </div>

                  {/* Defensive Android Countermeasures */}
                  <div className="pt-2 border-t border-amber-500/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                        Modern Android OS Countermeasures & Policy Controls
                      </span>
                      <button
                        onClick={() => setActiveTab('safeguards')}
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-emerald-200 font-medium underline cursor-pointer"
                      >
                        <span>Open Full Safeguards Compendium</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      {AIRDROID_SECURITY_AUDIT.threatModeling.countermeasures.map((cm, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-slate-900/90 border border-emerald-500/20">
                          <span className="font-semibold text-emerald-300 block mb-0.5">{cm.platform}</span>
                          <span className="text-slate-400">{cm.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Categorized Findings */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  Decompiled Capability Audit & Vulnerability Map
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {AIRDROID_SECURITY_AUDIT.findings.map((f, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border bg-slate-950/60 ${
                        f.level === 'Critical'
                          ? 'border-red-500/30'
                          : f.level === 'High'
                          ? 'border-amber-500/30'
                          : 'border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-100">{f.category}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                            f.level === 'Critical'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : f.level === 'High'
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}
                        >
                          {f.level}
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {f.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-1 font-mono text-[10px]">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Raw AXML String Table Parser */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-2">
                      <Search className="w-4 h-4 text-cyan-400" />
                      Live APK Manifest String Pool & Component Extractor
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Paste any raw AXML binary string dump or AndroidManifest token list to parse components automatically.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRawAxmlInput(RAW_AIRDROID_SAMPLE)}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition cursor-pointer"
                    >
                      Reset AirDroid Dump
                    </button>
                    <button
                      onClick={() => setRawAxmlInput('')}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800/60 hover:bg-slate-800 text-slate-400 font-medium transition cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <textarea
                  value={rawAxmlInput}
                  onChange={(e) => setRawAxmlInput(e.target.value)}
                  placeholder="Paste AXML string pool or binary manifest dump here..."
                  rows={4}
                  className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition resize-y"
                />

                {/* Parsed Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Total Tokens</span>
                    <span className="font-mono font-bold text-white text-sm">{parsedTokens.totalTokens}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Permissions</span>
                    <span className="font-mono font-bold text-red-400 text-sm">{parsedTokens.permissions.length}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Activities</span>
                    <span className="font-mono font-bold text-cyan-400 text-sm">{parsedTokens.activities.length}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Services</span>
                    <span className="font-mono font-bold text-purple-400 text-sm">{parsedTokens.services.length}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Receivers</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{parsedTokens.receivers.length}</span>
                  </div>
                </div>

                {/* Extracted Component Badges */}
                <div className="space-y-3 pt-2 text-xs">
                  {parsedTokens.permissions.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-300 block mb-1.5">Detected Permissions:</span>
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                        {parsedTokens.permissions.map((p, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                              p.includes('DEVICE_ADMIN') || p.includes('ACCESSIBILITY') || p.includes('NOTIFICATION')
                                ? 'bg-red-950/60 text-red-300 border-red-800/60'
                                : p.includes('CAMERA') || p.includes('AUDIO') || p.includes('LOCATION')
                                ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {parsedTokens.activities.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-300 block mb-1.5">Detected Activities:</span>
                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-cyan-300">
                        {parsedTokens.activities.map((a, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {parsedTokens.services.length > 0 && (
                    <div>
                      <span className="font-semibold text-slate-300 block mb-1.5">Detected Services:</span>
                      <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-lg bg-slate-900/80 border border-slate-800 font-mono text-[11px] text-purple-300">
                        {parsedTokens.services.map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-purple-950/40 border border-purple-800/40">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* AndroidManifest.xml Tab */}
          {activeTab === 'manifest' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-800/30 text-slate-300 font-sans text-xs">
                <span className="font-semibold text-purple-300">
                  {currentProfile.id === 'airdroid_kids'
                    ? 'Reconstructed AndroidManifest.xml (from AXML binary tables):'
                    : 'AndroidManifest.xml Configuration:'}
                </span>{' '}
                {currentProfile.id === 'airdroid_kids'
                  ? 'Decompiled and formatted from the provided raw binary string pool. Fully includes DeviceAdmin, Accessibility, WebRTC, and Telephony secret codes.'
                  : `Permissions and Activity declaration for fullscreen PWA display and internet access for ${currentProfile.package}.`}
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-purple-200 overflow-x-auto leading-relaxed">
                <code>{currentProfile.manifest}</code>
              </pre>
            </div>
          )}

          {/* Smali Tab */}
          {activeTab === 'smali' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-slate-300 font-sans text-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-cyan-300">Dalvik/Smali Bytecode Disassembly:</span> Defines{' '}
                  <code className="bg-cyan-950/60 px-1 py-0.5 rounded text-cyan-200">{currentProfile.className}</code>.
                  {currentProfile.id === 'airdroid_kids'
                    ? ' Disassembles KidDeviceAdminReceiver.smali, handling onEnabled, onDisableRequested, and deterrent warning popups.'
                    : ' Configures Android WebView with JavaScript, DOM storage, and onBackPressed() back-stack handler.'}
                </div>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 overflow-x-auto leading-relaxed">
                <code>{currentProfile.smali}</code>
              </pre>
            </div>
          )}

          {/* Java Source Tab */}
          {activeTab === 'java' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-800/30 text-slate-300 font-sans text-xs">
                <span className="font-semibold text-blue-300">Reconstructed Java Source:</span> The direct Java equivalent corresponding to the decompiled Android Smali register allocations for{' '}
                <code className="text-cyan-300">{currentProfile.package}</code>.
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-200 overflow-x-auto leading-relaxed">
                <code>{currentProfile.java}</code>
              </pre>
            </div>
          )}

          {/* Modern Android Security Safeguards Tab */}
          {activeTab === 'safeguards' && (
            <div className="font-sans">
              <AndroidSecuritySafeguards
                highlightedPattern={currentProfile.id === 'airdroid_kids' ? 'AirDroid' : ''}
              />
            </div>
          )}

          {/* Runtime Tester Tab */}
          {activeTab === 'tester' && (
            <div className="font-sans space-y-6">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  Client Environment Probe
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Detected User-Agent:</span>
                    <span className="font-mono text-slate-200 break-all">{uaDetails.ua || 'Browser default'}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <span className="text-slate-400 block mb-1">Container Mode:</span>
                    <span className="font-semibold text-cyan-300">
                      {uaDetails.isWebView ? 'Android WebView Runtime' : 'Standard Web / PWA Standalone'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Tests */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Smali Capability Assertions
                </h4>

                {/* DOM Storage Test */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      1. DOM Storage (<code className="text-cyan-300">setDomStorageEnabled(true)</code>)
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Tests localStorage & sessionStorage read/write access.
                    </p>
                    {domStorageResult && (
                      <p className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {domStorageResult}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={testDomStorage}
                    className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-semibold shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Probe</span>
                  </button>
                </div>

                {/* HTML5 Database Test */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      2. HTML5 Database (<code className="text-purple-300">setDatabaseEnabled(true)</code>)
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Verifies IndexedDB storage capabilities for offline caching.
                    </p>
                    {dbStorageResult && (
                      <p className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {dbStorageResult}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={testIndexedDB}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Probe</span>
                  </button>
                </div>

                {/* Back Stack Test */}
                <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      3. Back-Stack Trapping (<code className="text-amber-300">onBackPressed()</code>)
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Inspects current navigation stack depth to test <code className="text-white">canGoBack() -&gt; goBack()</code>.
                    </p>
                    {historyResult && (
                      <p className="text-xs font-mono text-amber-300 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {historyResult}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={testHistoryBack}
                    className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Check History</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">
            {currentProfile.package} · {currentProfile.id === 'airdroid_kids' ? 'Android 13 API 33' : 'Android 5.0+ API 21+'}
          </span>
          <div className="flex items-center gap-2">
            {currentProfile.id !== 'airdroid_kids' && (
              <a
                href={currentProfile.startUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/50 font-medium transition inline-flex items-center gap-1"
              >
                <span>Launch PWA</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
