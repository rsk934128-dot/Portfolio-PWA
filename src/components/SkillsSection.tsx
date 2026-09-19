import React, { useState } from 'react';
import {
  Smartphone,
  Layout,
  Server,
  Zap,
  Terminal,
  MousePointerClick,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { useEventTracking } from '../hooks/useEventTracking';

interface SkillsSectionProps {
  onOpenAndroidCompanion: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onOpenAndroidCompanion }) => {
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; category: string; level: string } | null>(null);

  // Hook tracking user engagement specifically for SkillsSection
  const { trackClick, sectionClicks, totalClicks } = useEventTracking('SkillsSection');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      default:
        return <Terminal className="w-5 h-5" />;
    }
  };

  const handleSkillClick = (skillName: string, categoryTitle: string, skillLevel: string) => {
    setSelectedSkill({ name: skillName, category: categoryTitle, level: skillLevel });
    trackClick('skill_item_click', {
      skillName,
      category: categoryTitle,
      level: skillLevel,
    });
  };

  const handleInspectBridgeClick = () => {
    trackClick('skills_inspect_smali_bridge', {
      target: 'AndroidWebViewCompanion',
      component: 'MainActivity.smali',
    });
    onOpenAndroidCompanion();
  };

  return (
    <section id="skills" className="py-20 border-b border-slate-900/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-center max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
              <Zap className="w-3.5 h-3.5" />
              <span>Technical Capabilities & Stacks</span>
            </div>

            {/* Section Engagement Counter */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium text-slate-300 bg-slate-900/80 border border-slate-800"
              title="Total interactions recorded in SkillsSection via useEventTracking hook"
            >
              <MousePointerClick className="w-3.5 h-3.5 text-purple-400" />
              <span>Section Engagement:</span>
              <span className="text-purple-300 font-bold">{sectionClicks} clicks</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Web & Mobile Toolchain
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineered with modern standards, prioritizing offline resiliency, type safety, modular design, and platform integrations. Click on any capability below to explore.
          </p>

          {/* Interactive Selection Feedback */}
          {selectedSkill && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-purple-950/40 border border-purple-800/50 text-xs text-purple-300 animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Active Skill:</span>
              <strong className="text-white">{selectedSkill.name}</strong>
              <span className="text-purple-400 font-mono text-[11px]">({selectedSkill.level} · {selectedSkill.category})</span>
            </div>
          )}
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              onClick={() => trackClick('skill_category_surface_click', { category: cat.title })}
              className="rounded-2xl bg-slate-900/60 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 p-6 flex flex-col justify-between shadow-lg transition duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cat.title}</h3>
                    <p className="text-xs text-slate-400">{cat.description}</p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {cat.skills.map((skill) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSkillClick(skill.name, cat.title, skill.level);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition cursor-pointer text-left ${
                          isSelected
                            ? 'bg-purple-950/60 border-purple-500/60 text-white shadow-sm ring-1 ring-purple-500/40'
                            : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/60 text-slate-200'
                        }`}
                      >
                        <span className="font-medium flex items-center gap-2">
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />}
                          <span>{skill.name}</span>
                        </span>
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                            skill.level === 'Expert'
                              ? 'text-cyan-400 bg-cyan-950/60 border border-cyan-800/40'
                              : skill.level === 'Specialist'
                              ? 'text-purple-400 bg-purple-950/60 border border-purple-800/40'
                              : 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/40'
                          }`}
                        >
                          {skill.level}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PWA & Android WebView Synergy Callout */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Terminal className="w-4 h-4" />
              <span>HYBRID ARCHITECTURE SYNERGY</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Why PWA + Android WebView Containerization?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              By combining Service Worker precaching, DOM storage, and responsive viewport sizing with an Android Activity wrapper (like{' '}
              <code className="text-cyan-300">com.pwa.vercel_com</code>), your app achieves instant deployment cycles via Vercel while shipping a native Google Play Store or APK binary.
            </p>
          </div>

          <button
            id="skills-inspect-bridge-btn"
            onClick={handleInspectBridgeClick}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide uppercase transition shrink-0 shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            Inspect Smali Implementation
          </button>
        </div>
      </div>
    </section>
  );
};
