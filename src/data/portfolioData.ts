import { Project, SkillCategory, ExperienceItem } from '../types';
import {
  AIRDROID_MANIFEST_XML,
  AIRDROID_SMALI_CODE,
  AIRDROID_JAVA_CODE,
} from './airdroidDecompiledData';

export const PERSONAL_INFO = {
  name: 'Sheikh Farid',
  title: 'Full-Stack Engineer & Mobile PWA Specialist',
  headline: 'Architecting high-performance Web Apps, Progressive Web Apps (PWAs), and Android WebView bridges.',
  email: 'sheikhfaridvisa164@gmail.com',
  avatarUrl: '/assets/images/developer-avatar.jpg',
  location: 'Dhaka, Bangladesh (Available Globally)',
  availability: 'Open to full-time roles & high-impact contracts',
  pwaPackage: 'com.pwa.vercel_com',
  startUrl: 'https://vercel.com/portfolio-b9415115',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  vercel: 'https://vercel.com/portfolio-b9415115',
  bio: 'Specializing in reactive web applications, hybrid Android integrations (WebViews, PWABuilder, TWAs), and responsive cloud systems. Dedicated to sub-second load times, offline reliability, and intuitive UX.',
  stats: [
    { label: 'Years Experience', value: '4+' },
    { label: 'Completed Projects', value: '35+' },
    { label: 'PWA Lighthouse Score', value: '100%' },
    { label: 'Offline Ready', value: '100%' },
  ],
};

export const SMALI_CODE_SNIPPET = `.class public Lcom/pwa/vercel_com/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"

# Fields
.field private webView:Landroid/webkit/WebView;
.field private progressBar:Landroid/widget/ProgressBar;
.field private final startUrl:Ljava/lang/String; = "https://vercel.com/portfolio-b9415115"

# Direct Methods
.method public constructor <init>()V
    .registers 2
    .prologue
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V
    return-void
.end method

# Virtual Methods
.method protected onCreate(Landroid/os/Bundle;)V
    .registers 6
    .param p1, "savedInstanceState"

    .prologue
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    # Instantiate Android WebView
    new-instance v0, Landroid/webkit/WebView;
    invoke-direct {v0, p0}, Landroid/webkit/WebView;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;

    # Configure WebSettings for PWA features
    iget-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v1

    # Enable JavaScript
    const/4 v2, 0x1
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V

    # Enable DOM Storage (localStorage / sessionStorage)
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V

    # Enable HTML5 Database Storage
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDatabaseEnabled(Z)V

    # Enable viewport & responsive scale
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setUseWideViewPort(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setLoadWithOverviewMode(Z)V

    # Attach WebViewClient for in-app navigation
    new-instance v2, Lcom/pwa/vercel_com/PwaClient;
    invoke-direct {v2, p0}, Lcom/pwa/vercel_com/PwaClient;-><init>(Lcom/pwa/vercel_com/MainActivity;)V
    iget-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0, v2}, Landroid/webkit/WebView;->setWebViewClient(Landroid/webkit/WebViewClient;)V

    # Set content view to Webview
    iget-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {p0, v0}, Lcom/pwa/vercel_com/MainActivity;->setContentView(Landroid/view/View;)V

    # Load PWA Start URL
    const-string v3, "https://vercel.com/portfolio-b9415115"
    iget-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0, v3}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V
    return-void
.end method

.method public onBackPressed()V
    .registers 2
    .prologue
    # Handle back-stack navigation inside PWA WebView
    iget-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;
    if-eqz v0, :cond_native_back

    iget-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0}, Landroid/webkit/WebView;->canGoBack()Z
    move-result v0
    if-eqz v0, :cond_native_back

    iget-object v0, p0, Lcom/pwa/vercel_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0}, Landroid/webkit/WebView;->goBack()V
    return-void

:cond_native_back
    invoke-super {p0}, Landroid/app/Activity;->onBackPressed()V
    return-void
.end method`;

export const JAVA_CODE_EQUIVALENT = `package com.pwa.vercel_com;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.ProgressBar;

public class MainActivity extends Activity {
    private WebView webView;
    private ProgressBar progressBar;
    private final String startUrl = "https://vercel.com/portfolio-b9415115";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Instantiate and configure Android WebView
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();

        // Enable essential PWA capabilities
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);     // localStorage & sessionStorage
        settings.setDatabaseEnabled(true);       // HTML5 Web SQL & IndexedDB
        settings.setUseWideViewPort(true);       // Viewport meta support
        settings.setLoadWithOverviewMode(true);  // Fit content to screen

        // Attach custom WebViewClient to trap internal links
        webView.setWebViewClient(new PwaClient(this));

        // Mount WebView as full-screen content
        setContentView(webView);

        // Launch Progressive Web App start URL
        webView.loadUrl(startUrl);
    }

    @Override
    public void onBackPressed() {
        // Intercept native Android back button to navigate WebView history
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}`;

export const MANIFEST_XML_EQUIVALENT = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pwa.vercel_com">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="SF Portfolio"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen"
        android:hardwareAccelerated="true">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>
</manifest>`;

export const YOUTUBE_SMALI_CODE_SNIPPET = `.class public Lcom/pwa/youtube_com/MainActivity;
.super Landroid/app/Activity;
.source "MainActivity.java"

# Fields
.field private webView:Landroid/webkit/WebView;
.field private progressBar:Landroid/widget/ProgressBar;
.field private final startUrl:Ljava/lang/String; = "https://www.youtube.com/"

# Direct Methods
.method public constructor <init>()V
    .registers 2

    .prologue
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V
    return-void
.end method

# Virtual Methods
.method protected onCreate(Landroid/os/Bundle;)V
    .registers 6
    .param p1, "savedInstanceState"    # Landroid/os/Bundle;

    .prologue
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    # Instantiate Android WebView
    new-instance v0, Landroid/webkit/WebView;
    invoke-direct {v0, p0}, Landroid/webkit/WebView;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;

    # Configure WebSettings for PWA features
    iget-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v1

    # Enable JavaScript
    const/4 v2, 0x1
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V

    # Enable DOM Storage (localStorage / sessionStorage)
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V

    # Enable HTML5 Database Storage
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDatabaseEnabled(Z)V

    # Enable viewport & responsive scale
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setUseWideViewPort(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setLoadWithOverviewMode(Z)V

    # Attach WebViewClient for in-app navigation
    new-instance v2, Lcom/pwa/youtube_com/PwaClient;
    invoke-direct {v2, p0}, Lcom/pwa/youtube_com/PwaClient;-><init>(Lcom/pwa/youtube_com/MainActivity;)V
    iget-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0, v2}, Landroid/webkit/WebView;->setWebViewClient(Landroid/webkit/WebViewClient;)V

    # Set content view to Webview
    iget-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {p0, v0}, Lcom/pwa/youtube_com/MainActivity;->setContentView(Landroid/view/View;)V

    # Load PWA Start URL
    const-string v3, "https://www.youtube.com/"
    iget-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0, v3}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V

    return-void
.end method

.method public onBackPressed()V
    .registers 2

    .prologue
    # Handle back-stack navigation inside PWA WebView
    iget-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;
    if-eqz v0, :cond_native_back

    iget-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0}, Landroid/webkit/WebView;->canGoBack()Z
    move-result v0
    if-eqz v0, :cond_native_back

    iget-object v0, p0, Lcom/pwa/youtube_com/MainActivity;->webView:Landroid/webkit/WebView;
    invoke-virtual {v0}, Landroid/webkit/WebView;->goBack()V
    return-void

:cond_native_back
    invoke-super {p0}, Landroid/app/Activity;->onBackPressed()V
    return-void
.end method`;

export const YOUTUBE_JAVA_CODE_EQUIVALENT = `package com.pwa.youtube_com;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.ProgressBar;

public class MainActivity extends Activity {
    private WebView webView;
    private ProgressBar progressBar;
    private final String startUrl = "https://www.youtube.com/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Instantiate Android WebView
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();

        // Configure WebSettings for PWA features
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);       // Enable localStorage / sessionStorage
        settings.setDatabaseEnabled(true);         // Enable HTML5 Database Storage
        settings.setUseWideViewPort(true);         // Enable viewport & responsive scale
        settings.setLoadWithOverviewMode(true);

        // Attach WebViewClient for in-app navigation
        webView.setWebViewClient(new PwaClient(this));

        // Set content view to WebView
        setContentView(webView);

        // Load YouTube PWA Start URL
        webView.loadUrl(startUrl);
    }

    @Override
    public void onBackPressed() {
        // Handle back-stack navigation inside PWA WebView
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}`;

export const YOUTUBE_MANIFEST_XML_EQUIVALENT = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.pwa.youtube_com">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="YouTube PWA"
        android:theme="@android:style/Theme.NoTitleBar.Fullscreen"
        android:hardwareAccelerated="true">

        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>
</manifest>`;

export interface AndroidPwaProfile {
  id: string;
  name: string;
  package: string;
  className: string;
  startUrl: string;
  badge: string;
  color: string;
  smali: string;
  java: string;
  manifest: string;
}

export const ANDROID_PWA_PROFILES: AndroidPwaProfile[] = [
  {
    id: 'airdroid_kids',
    name: 'AirDroid Kids Security Analysis',
    package: 'com.sand.airdroidkids',
    className: 'Lcom/sand/airdroidkids/components/dm/KidDeviceAdminReceiver;',
    startUrl: 'https://www.airdroid.com/kid_activate',
    badge: 'Decompiled & Reconstructed',
    color: 'emerald',
    smali: AIRDROID_SMALI_CODE,
    java: AIRDROID_JAVA_CODE,
    manifest: AIRDROID_MANIFEST_XML,
  },
  {
    id: 'youtube_com',
    name: 'YouTube PWA Container',
    package: 'com.pwa.youtube_com',
    className: 'Lcom/pwa/youtube_com/MainActivity;',
    startUrl: 'https://www.youtube.com/',
    badge: 'YouTube Wrapper',
    color: 'rose',
    smali: YOUTUBE_SMALI_CODE_SNIPPET,
    java: YOUTUBE_JAVA_CODE_EQUIVALENT,
    manifest: YOUTUBE_MANIFEST_XML_EQUIVALENT,
  },
  {
    id: 'vercel_com',
    name: 'Portfolio PWA Container',
    package: 'com.pwa.vercel_com',
    className: 'Lcom/pwa/vercel_com/MainActivity;',
    startUrl: 'https://vercel.com/portfolio-b9415115',
    badge: 'Portfolio Flagship',
    color: 'cyan',
    smali: SMALI_CODE_SNIPPET,
    java: JAVA_CODE_EQUIVALENT,
    manifest: MANIFEST_XML_EQUIVALENT,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'airdroid-kids-security-disassembly',
    title: 'AirDroid Kids Android APK Security & AXML Deconstruction',
    summary: 'Binary XML deconstruction, Smali bytecode disassembly, and permission vulnerability audit for com.sand.airdroidkids.',
    description: 'In-depth security reverse engineering of the com.sand.airdroidkids Android APK extracted from compiled AXML binary tables and Dalvik bytecode. Audits BIND_DEVICE_ADMIN, AccessibilityService surveillance hooks, NotificationListener telemetry, WebRTC camera/audio background streaming, and secret code dialer triggers.',
    category: 'mobile_pwa',
    tags: ['Android Security', 'Smali Disassembly', 'AXML Decompilation', 'Device Admin', 'Accessibility Service', 'WebRTC'],
    featured: true,
    metrics: 'API 33 · DeviceAdmin + Accessibility Hooks Audited',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    iconName: 'Shield',
    gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    imageUrl: '/assets/images/smali-security-showcase.jpg',
    features: [
      'Reconstruction of raw AXML binary string pool into clean W3C-valid AndroidManifest.xml',
      'Disassembly of KidDeviceAdminReceiver.smali with onDisableRequested deterrence policies',
      'Audit of BIND_ACCESSIBILITY_SERVICE & BIND_NOTIFICATION_LISTENER_SERVICE permissions',
      'Inspection of SandWebRTCService_ background camera, microphone, and screen-sharing pipelines',
      'Extraction of hidden telephony dialer trigger (android.provider.Telephony.SECRET_CODE: p4105c16b44a28a5728d70e83)',
    ],
  },
  {
    id: 'youtube-pwa-android',
    title: 'YouTube PWA Android WebView Wrapper',
    summary: 'Custom Android Smali & WebView hybrid container wrapper for YouTube Progressive Web App.',
    description: 'A native Android Activity wrapper (com.pwa.youtube_com) containerizing https://www.youtube.com/ as an accelerated Progressive Web App. Implements hardware-accelerated video decoding, DOM storage (localStorage / sessionStorage), HTML5 database support, responsive viewport scaling, and native back-stack interceptors via onBackPressed().',
    category: 'mobile_pwa',
    tags: ['Android WebView', 'Smali Disassembly', 'PWA', 'Media Streaming', 'DOM Storage', 'Workbox'],
    featured: true,
    metrics: 'Hardware Accelerated · 4K/60fps Ready',
    liveUrl: 'https://www.youtube.com/',
    githubUrl: 'https://github.com',
    iconName: 'Smartphone',
    gradient: 'from-rose-500/20 to-red-600/10 border-rose-500/30',
    imageUrl: '/assets/images/youtube-pwa-mockup.jpg',
    features: [
      'Decompiled & assembled with Smali bytecode (Lcom/pwa/youtube_com/MainActivity;)',
      'DOM storage (setDomStorageEnabled) for YouTube account session caching & state',
      'HTML5 Web SQL & IndexedDB support enabled (setDatabaseEnabled) for offline playback cues',
      'Responsive full-bleed viewport configuration with setUseWideViewPort & setLoadWithOverviewMode',
      'Deep WebViewClient history navigation trap to intercept native Android back-press',
    ],
  },
  {
    id: 'portfolio-pwa-android',
    title: 'Sheikh Farid Portfolio PWA & Android Wrapper',
    summary: 'The flagship installable Progressive Web App with custom Android Smali & WebView integration.',
    description: 'An offline-capable portfolio application engineered to run both as a modern web app in any browser and within a dedicated Android WebView container (com.pwa.vercel_com). Features full Service Worker caching, responsive viewport scaling, DOM storage persistence, and native-feeling gesture navigation.',
    category: 'mobile_pwa',
    tags: ['PWA', 'Android WebView', 'Smali/Java', 'TypeScript', 'Tailwind CSS', 'Workbox'],
    featured: true,
    metrics: '100% PWA Score · 0s Cold-start cache',
    liveUrl: 'https://vercel.com/portfolio-b9415115',
    githubUrl: 'https://github.com',
    iconName: 'Smartphone',
    gradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
    imageUrl: '/assets/images/pwa-mobile-experience.jpg',
    features: [
      'Full offline precaching of assets, styles, and scripts via Workbox',
      'DOM storage compatibility (localStorage & IndexedDB) for persistent state',
      'Native Android back-stack navigation handling (onBackPressed bridge)',
      'Adaptive high-DPI responsive layouts for mobile and desktop screens',
    ],
  },
  {
    id: 'ai-studio-canvas',
    title: 'OmniAI Studio & Code Canvas',
    summary: 'Full-stack AI developer workstation with streaming code generation and live diff viewer.',
    description: 'A full-stack development environment that interfaces with Google Gemini to provide instant code generation, intelligent refactoring, and interactive live previews. Includes an offline scratchpad and syntax-highlighted code editor.',
    category: 'ai_cloud',
    tags: ['React 19', 'Gemini API', 'Express', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    metrics: 'Sub-200ms TTFB · Streamed Responses',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    iconName: 'Cpu',
    gradient: 'from-violet-500/20 to-purple-500/10 border-violet-500/30',
    imageUrl: '/assets/images/ai-code-canvas.jpg',
    features: [
      'Real-time streaming generation with Google GenAI SDK',
      'Intelligent code analysis and structural syntax validation',
      'Responsive multi-panel editor with dark mode luxury styling',
    ],
  },
  {
    id: 'hyper-commerce-pwa',
    title: 'ApexCommerce Mobile PWA',
    summary: 'Lightweight mobile-first e-commerce store with offline shopping cart and instant checkout.',
    description: 'Built for mobile users with unstable connectivity. Utilizes client-side DOM storage to persist the cart even across complete offline phases, then syncs seamlessly upon network restoration.',
    category: 'mobile_pwa',
    tags: ['Next.js / Vite', 'PWA', 'IndexedDB', 'Tailwind', 'Stripe Ready'],
    featured: true,
    metrics: '99/100 Mobile Performance · 45KB Core Bundle',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    iconName: 'ShoppingBag',
    gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    features: [
      'Zero latency client-side shopping cart with DOM Storage',
      'Optimistic state updates and smooth swipe interactions',
      'Background network sync when connection returns',
    ],
  },
  {
    id: 'pulse-telemetry',
    title: 'DevPulse Cloud Telemetry Engine',
    summary: 'Observability and endpoint health monitoring dashboard for microservices and APIs.',
    description: 'Tracks HTTP endpoint latencies, SSL certificate expirations, and status codes. Visualizes server health with real-time graphs and automated alerts.',
    category: 'fullstack',
    tags: ['Node.js', 'Express', 'TypeScript', 'WebSockets', 'Recharts'],
    featured: false,
    metrics: '500+ endpoints monitored · 99.99% Uptime check',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    iconName: 'Activity',
    gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30',
    features: [
      'Interactive response time graphs and status breakdown',
      'Configurable ping intervals with timeout safety',
      'Webhook notification dispatchers',
    ],
  },
  {
    id: 'crypto-track-offline',
    title: 'CryptoTrack Mobile PWA',
    summary: 'Real-time financial asset tracker with cached historical charts and currency conversion.',
    description: 'Provides instant cryptocurrency spot pricing, offline candlestick inspection, and customizable portfolio tracking without requiring account sign-up.',
    category: 'mobile_pwa',
    tags: ['PWA', 'TypeScript', 'Canvas API', 'Service Worker'],
    featured: false,
    metrics: 'Instant offline access · 60 FPS Charts',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    iconName: 'TrendingUp',
    gradient: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
    features: [
      'Cached historical price feeds for offline analysis',
      'Custom watchlist stored safely in browser storage',
      'Custom candlestick rendering with zero external chart bloat',
    ],
  },
  {
    id: 'flow-kanban',
    title: 'TaskFlow Realtime Workspace',
    summary: 'Kanban collaboration tool with drag-and-drop cards, sprint metrics, and instant filters.',
    description: 'Engineered for agile teams needing swift sprint organization. Features column drag-and-drop, tags, estimated hours, and keyboard shortcuts.',
    category: 'fullstack',
    tags: ['React', 'TypeScript', 'Tailwind', 'Motion', 'LocalStorage'],
    featured: false,
    metrics: 'Zero-lag DND · Instant State Sync',
    liveUrl: '#',
    githubUrl: 'https://github.com',
    iconName: 'CheckSquare',
    gradient: 'from-rose-500/20 to-pink-500/10 border-rose-500/30',
    features: [
      'Fluid drag-and-drop with spring animations',
      'Local snapshot export/import JSON capability',
      'Keyboard accessibility and high-contrast styling',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Mobile & Progressive Web Apps',
    icon: 'Smartphone',
    description: 'Native-feel web apps, Android WebView containers, and offline-first workflows.',
    skills: [
      { name: 'Progressive Web Apps (PWA)', level: 'Expert' },
      { name: 'Android WebView & Smali Bridges', level: 'Specialist' },
      { name: 'Service Workers & Workbox', level: 'Expert' },
      { name: 'DOM Storage & IndexedDB', level: 'Expert' },
      { name: 'Trusted Web Activities (TWA)', level: 'Advanced' },
      { name: 'Responsive Mobile UX', level: 'Expert' },
    ],
  },
  {
    title: 'Frontend Engineering',
    icon: 'Layout',
    description: 'Modern component-driven web architectures built for speed and accessibility.',
    skills: [
      { name: 'React 19 & Next.js', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Tailwind CSS & CSS Grid', level: 'Expert' },
      { name: 'Motion / Framer Motion', level: 'Advanced' },
      { name: 'Vite & Bundler Tooling', level: 'Advanced' },
      { name: 'Web Performance Optimization', level: 'Expert' },
    ],
  },
  {
    title: 'Backend & Cloud Systems',
    icon: 'Server',
    description: 'Scalable APIs, database management, and cloud deployment pipelines.',
    skills: [
      { name: 'Node.js & Express', level: 'Advanced' },
      { name: 'RESTful API Design', level: 'Expert' },
      { name: 'Vercel & Cloud Run', level: 'Advanced' },
      { name: 'Git / GitHub CI/CD', level: 'Advanced' },
      { name: 'Firebase / Firestore', level: 'Advanced' },
      { name: 'Security & Auth Patterns', level: 'Advanced' },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2023 - Present',
    role: 'Lead Full-Stack & Mobile PWA Developer',
    organization: 'Independent / Contract Engineering',
    location: 'Remote',
    description: [
      'Architected cross-platform Progressive Web Apps and Android WebView wrappers (including com.pwa.vercel_com) ensuring seamless offline persistence and sub-second load times.',
      'Constructed modular React + TypeScript frontends with automated Workbox caching and custom Service Worker routing.',
      'Implemented robust state management leveraging DOM storage, IndexedDB, and server-side synchronization.',
    ],
    technologies: ['React', 'TypeScript', 'PWA', 'Android WebView', 'Tailwind CSS', 'Node.js'],
    type: 'work',
  },
  {
    period: '2021 - 2023',
    role: 'Frontend & Web Applications Engineer',
    organization: 'Tech Innovators Studio',
    location: 'Remote',
    description: [
      'Engineered interactive client dashboards, responsive marketing portals, and high-conversion landing applications.',
      'Optimized Core Web Vitals across high-traffic properties, improving Lighthouse mobile performance from 62 to 98+.',
      'Integrated third-party APIs, OAuth authentication, and automated continuous deployment to Vercel.',
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    type: 'work',
  },
  {
    period: '2019 - 2021',
    role: 'Computer Science & Software Development',
    organization: 'Technical University',
    location: 'Academic & Project Focus',
    description: [
      'Focused on Mobile Application Development, Operating Systems, Computer Networks, and Object-Oriented Architecture.',
      'Built early prototypes of hybrid Android web container applications using WebKit and Java.',
    ],
    technologies: ['Java', 'Android SDK', 'HTML/CSS/JS', 'Algorithms', 'Databases'],
    type: 'education',
  },
];
