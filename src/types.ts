export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: 'mobile_pwa' | 'fullstack' | 'ai_cloud';
  tags: string[];
  featured: boolean;
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  iconName: string;
  gradient: string;
  imageUrl?: string;
  features: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. 'Advanced', 'Specialist', 'Expert'
    icon?: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string[];
  technologies: string[];
  type: 'work' | 'milestone' | 'education';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
}

export interface WebViewCapabilityStatus {
  javascript: boolean;
  domStorage: boolean;
  databaseStorage: boolean;
  wideViewport: boolean;
  canGoBack: boolean;
  userAgent: string;
  isAndroidWebView: boolean;
}

export interface TrackedClickEvent {
  id: string;
  timestamp: number;
  section: string;
  target: string;
  metadata?: Record<string, any>;
}

export interface SectionEngagementStats {
  totalClicks: number;
  bySection: Record<string, number>;
  byTarget: Record<string, number>;
  mostEngagedSection: { section: string; count: number } | null;
}

