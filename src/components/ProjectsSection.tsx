import React, { useState } from 'react';
import {
  Smartphone,
  Cpu,
  ShoppingBag,
  Activity,
  TrendingUp,
  CheckSquare,
  ExternalLink,
  Layers,
  Sparkles,
  ChevronRight,
  X,
  BarChart3,
  Flame,
  RotateCcw,
  MousePointerClick,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { useEventTracking } from '../hooks/useEventTracking';

interface ProjectsSectionProps {
  onOpenAndroidCompanion: (profileId?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenAndroidCompanion }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showMonitorPanel, setShowMonitorPanel] = useState<boolean>(false);

  // Hook tracking user engagement for ProjectsSection
  const {
    trackClick,
    sectionClicks,
    totalClicks,
    stats,
    clearLogs,
    logs,
  } = useEventTracking('ProjectsSection');

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'mobile_pwa', label: 'Mobile & PWA' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai_cloud', label: 'AI & Cloud' },
  ];

  const handleFilterChange = (id: string, label: string) => {
    setActiveFilter(id);
    trackClick('filter_category_change', { filterId: id, filterLabel: label });
  };

  const handleOpenDetails = (project: Project) => {
    trackClick('project_details_click', { projectId: project.id, title: project.title, category: project.category });
    setSelectedProject(project);
  };

  const handleLiveAppClick = (project: Project) => {
    trackClick('project_live_demo_click', { projectId: project.id, url: project.liveUrl });
  };

  const handleSmaliInspectClick = (project: Project) => {
    trackClick('project_smali_inspect_click', { projectId: project.id, title: project.title });
    const profile =
      project.id === 'airdroid-kids-security-disassembly'
        ? 'airdroid_kids'
        : project.id === 'youtube-pwa-android'
        ? 'youtube_com'
        : 'vercel_com';
    onOpenAndroidCompanion(profile);
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'CheckSquare':
        return <CheckSquare className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  // Count clicks per project from logs
  const getProjectClicks = (projectId: string) => {
    return logs.filter(
      (log) =>
        log.section === 'ProjectsSection' &&
        log.metadata?.projectId === projectId
    ).length;
  };

  // Find top engaged project in ProjectsSection
  let topProject = { id: '', count: 0, title: '' };
  PROJECTS.forEach((proj) => {
    const count = getProjectClicks(proj.id);
    if (count > topProject.count) {
      topProject = { id: proj.id, count, title: proj.title };
    }
  });

  return (
    <section id="projects" className="py-20 border-b border-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Production Work & Implementations</span>
              </div>

              {/* Section Engagement Badge */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium text-slate-300 bg-slate-900/80 border border-slate-800"
                title="Total interactions recorded in ProjectsSection via useEventTracking hook"
              >
                <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
                <span>Section Engagement:</span>
                <span className="text-cyan-300 font-bold">{sectionClicks} clicks</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for Performance & PWA Standards
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              From hybrid Android WebView wrappers to full-stack reactive applications, exploring responsive design, offline persistence, and cloud pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Engagement Monitor Drawer Toggle */}
            <button
              id="toggle-projects-engagement-monitor"
              onClick={() => {
                const next = !showMonitorPanel;
                setShowMonitorPanel(next);
                trackClick(next ? 'open_engagement_monitor' : 'close_engagement_monitor');
              }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                showMonitorPanel
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
              title="View interaction metrics tracked in localStorage via useEventTracking"
            >
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Engagement Pulse</span>
              {totalClicks > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {totalClicks} total
                </span>
              )}
            </button>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`filter-${tab.id}-btn`}
                  onClick={() => handleFilterChange(tab.id, tab.label)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Monitor Summary Panel */}
        {showMonitorPanel && (
          <div
            id="projects-engagement-panel"
            className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    useEventTracking Engagement Telemetry
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Live click interactions persisted to <code className="text-cyan-300">localStorage</code> (DOM Storage)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/40">
                  {totalClicks} Total App Clicks
                </span>
                {totalClicks > 0 && (
                  <button
                    id="clear-engagement-logs-btn"
                    onClick={clearLogs}
                    className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 transition cursor-pointer"
                    title="Clear tracked clicks from localStorage"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Logs</span>
                  </button>
                )}
              </div>
            </div>

            {/* Engagement metrics breakdown across sections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Engagement by Section:</span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-300">ProjectsSection</span>
                    <span className="font-mono text-white font-semibold">
                      {stats.bySection['ProjectsSection'] || 0} clicks
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-300">SkillsSection</span>
                    <span className="font-mono text-white font-semibold">
                      {stats.bySection['SkillsSection'] || 0} clicks
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Most Active Project:</span>
                {topProject.count > 0 ? (
                  <div className="flex items-center gap-2 font-medium text-emerald-400">
                    <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{topProject.title}</span>
                    <span className="font-mono text-xs text-slate-300 ml-auto shrink-0">
                      ({topProject.count} clicks)
                    </span>
                  </div>
                ) : (
                  <span className="text-slate-500 italic text-[11px]">No project clicks yet</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[11px]">Most Engaged Section:</span>
                {stats.mostEngagedSection ? (
                  <div className="font-medium text-cyan-300 font-mono flex items-center justify-between">
                    <span>{stats.mostEngagedSection.section}</span>
                    <span className="text-slate-400 text-xs">({stats.mostEngagedSection.count} clicks)</span>
                  </div>
                ) : (
                  <span className="text-slate-500 italic text-[11px]">Interact with the page</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const projectClickCount = getProjectClicks(project.id);
            const isTop = topProject.id === project.id && topProject.count > 0;

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onClick={() => trackClick('project_card_surface_click', { projectId: project.id })}
                className={`rounded-2xl bg-slate-900/70 hover:bg-slate-900 border ${
                  isTop ? 'border-cyan-500/50 shadow-cyan-950/30' : 'border-slate-800/80 hover:border-slate-700/80'
                } shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden relative cursor-pointer`}
              >
                {/* Most Interacted Badge */}
                {isTop && (
                  <div className="absolute top-0 right-0 z-10 bg-gradient-to-l from-cyan-500 to-blue-600 text-slate-950 px-2.5 py-0.5 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Flame className="w-3 h-3 text-amber-300" />
                    <span>Top Viewed</span>
                  </div>
                )}

                {/* Project Image Header */}
                {project.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                    <span className="absolute bottom-2.5 left-3 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                      {project.category === 'mobile_pwa'
                        ? 'Android / PWA'
                        : project.category === 'ai_cloud'
                        ? 'AI Cloud'
                        : 'Full Stack'}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-4">
                  {/* Top Row: Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} border flex items-center justify-center text-cyan-300 shadow-md`}
                    >
                      {getIcon(project.iconName)}
                    </div>
                    {project.metrics && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40">
                        {project.metrics}
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-300 bg-slate-950/70 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Engagement Click Counter */}
                <div
                  className="px-6 py-4 border-t border-slate-800/70 bg-slate-950/40 flex items-center justify-between text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenDetails(project)}
                      className="font-medium text-slate-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>

                    {projectClickCount > 0 && (
                      <span
                        className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/30"
                        title={`${projectClickCount} click interactions recorded for this project`}
                      >
                        {projectClickCount} {projectClickCount === 1 ? 'click' : 'clicks'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.id === 'portfolio-pwa-android' ||
                    project.id === 'youtube-pwa-android' ||
                    project.id === 'airdroid-kids-security-disassembly' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSmaliInspectClick(project)}
                          className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <span>
                            {project.id === 'airdroid-kids-security-disassembly'
                              ? 'Audit & Safeguards'
                              : 'Smali Code'}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => handleLiveAppClick(project)}
                            className="text-slate-400 hover:text-slate-200 font-medium flex items-center gap-1"
                          >
                            <span>Live</span>
                          </a>
                        )}
                      </div>
                    ) : project.liveUrl && project.liveUrl !== '#' ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleLiveAppClick(project)}
                        className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                      >
                        <span>Live App</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Production Ready</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            id="project-detail-modal-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in"
            onClick={() => setSelectedProject(null)}
          >
            <div
              id="project-detail-modal-card"
              className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-slate-100 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-1.5 text-slate-300 hover:text-white rounded-lg bg-slate-900/80 hover:bg-slate-800 transition backdrop-blur-sm border border-slate-700/50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Project Preview Image */}
              {selectedProject.imageUrl && (
                <div className="relative h-48 sm:h-64 w-full rounded-xl overflow-hidden mb-5 border border-slate-800 bg-slate-950 shadow-inner">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                      {selectedProject.category === 'mobile_pwa' ? 'Android WebView & PWA' : 'Cloud Architecture'}
                    </span>
                    {selectedProject.metrics && (
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-700/50 backdrop-blur-sm">
                        {selectedProject.metrics}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedProject.gradient} border flex items-center justify-center text-cyan-300`}
                >
                  {getIcon(selectedProject.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedProject.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-cyan-400">{selectedProject.metrics}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {getProjectClicks(selectedProject.id)} interaction(s)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p className="leading-relaxed">{selectedProject.description}</p>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Key Features & Technical Implementations
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-800/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {(selectedProject.id === 'portfolio-pwa-android' ||
                  selectedProject.id === 'youtube-pwa-android' ||
                  selectedProject.id === 'airdroid-kids-security-disassembly') && (
                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-center justify-between">
                    <div className="text-xs text-cyan-200">
                      <p className="font-semibold text-cyan-300">
                        {selectedProject.id === 'airdroid-kids-security-disassembly'
                          ? 'Security Audit & Safeguards Available'
                          : 'Android Smali Disassembly Available'}
                      </p>
                      <p className="text-[11px] text-cyan-200/80">
                        {selectedProject.id === 'airdroid-kids-security-disassembly' ? (
                          <span>
                            Explore decompiled AXML, Smali bytecode, and Modern Android OS Safeguards.
                          </span>
                        ) : (
                          <>
                            Inspect bytecode for{' '}
                            <code className="text-white">
                              {selectedProject.id === 'youtube-pwa-android'
                                ? 'Lcom/pwa/youtube_com/MainActivity;'
                                : 'Lcom/pwa/vercel_com/MainActivity;'}
                            </code>
                          </>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleSmaliInspectClick(selectedProject);
                        setSelectedProject(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium cursor-pointer shrink-0 ml-3"
                    >
                      {selectedProject.id === 'airdroid-kids-security-disassembly'
                        ? 'Open Audit & Safeguards'
                        : 'Open Inspector'}
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
