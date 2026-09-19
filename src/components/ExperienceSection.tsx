import React from 'react';
import { Briefcase, Calendar, MapPin, GraduationCap, Award } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-slate-900/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Path & Projects</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Engineering progressive web solutions, building Android wrappers, and delivering full-stack applications.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-10">
          {EXPERIENCES.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Bullet */}
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                {item.type === 'education' ? (
                  <GraduationCap className="w-3 h-3" />
                ) : (
                  <Briefcase className="w-3 h-3" />
                )}
              </div>

              {/* Content Card */}
              <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 p-6 shadow-xl hover:border-slate-700/80 transition space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400">{item.organization}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-950 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
