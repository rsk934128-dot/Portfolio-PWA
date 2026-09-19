import { useState, useEffect, useCallback } from 'react';
import { TrackedClickEvent, SectionEngagementStats } from '../types';

const STORAGE_KEY = 'sf_event_tracking_logs';
const MAX_LOGS = 250;
const EVENT_NAME = 'sf_engagement_change';

function readLogsFromStorage(): TrackedClickEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('[useEventTracking] Error reading from localStorage', err);
    return [];
  }
}

function computeStats(logs: TrackedClickEvent[]): SectionEngagementStats {
  const bySection: Record<string, number> = {};
  const byTarget: Record<string, number> = {};

  logs.forEach((item) => {
    if (item.section) {
      bySection[item.section] = (bySection[item.section] || 0) + 1;
    }
    if (item.target) {
      byTarget[item.target] = (byTarget[item.target] || 0) + 1;
    }
  });

  let mostEngagedSection: { section: string; count: number } | null = null;
  let maxCount = 0;
  Object.entries(bySection).forEach(([sec, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostEngagedSection = { section: sec, count };
    }
  });

  return {
    totalClicks: logs.length,
    bySection,
    byTarget,
    mostEngagedSection,
  };
}

/**
 * Custom React hook `useEventTracking` that logs click interactions to `localStorage`
 * and tracks user engagement per section.
 *
 * @param section Optional section identifier (e.g., 'ProjectsSection', 'SkillsSection')
 */
export function useEventTracking(section?: string) {
  const [logs, setLogs] = useState<TrackedClickEvent[]>(() => readLogsFromStorage());
  const [stats, setStats] = useState<SectionEngagementStats>(() => computeStats(logs));

  // Sync state across components or browser tabs
  useEffect(() => {
    const handleUpdate = () => {
      const freshLogs = readLogsFromStorage();
      setLogs(freshLogs);
      setStats(computeStats(freshLogs));
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  /**
   * Log a click interaction to localStorage
   */
  const trackClick = useCallback(
    (target: string, metadata?: Record<string, any>, overrideSection?: string) => {
      const targetSection = overrideSection || section || 'general';
      const newEvent: TrackedClickEvent = {
        id: 'clk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        timestamp: Date.now(),
        section: targetSection,
        target,
        metadata,
      };

      try {
        const existing = readLogsFromStorage();
        const updated = [newEvent, ...existing].slice(0, MAX_LOGS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Update current hook state
        setLogs(updated);
        setStats(computeStats(updated));

        // Notify other components using useEventTracking in real-time
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
      } catch (err) {
        console.warn('[useEventTracking] Error saving click to localStorage', err);
      }
    },
    [section]
  );

  const getSectionClicks = useCallback(
    (sectionName: string): number => {
      return stats.bySection[sectionName] || 0;
    },
    [stats.bySection]
  );

  const getTargetClicks = useCallback(
    (targetName: string): number => {
      return stats.byTarget[targetName] || 0;
    },
    [stats.byTarget]
  );

  const clearLogs = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setLogs([]);
      setStats({
        totalClicks: 0,
        bySection: {},
        byTarget: {},
        mostEngagedSection: null,
      });
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (err) {
      console.warn('[useEventTracking] Error clearing logs', err);
    }
  }, []);

  const sectionClicks = section ? stats.bySection[section] || 0 : 0;

  return {
    trackClick,
    logs,
    stats,
    sectionClicks,
    totalClicks: stats.totalClicks,
    getSectionClicks,
    getTargetClicks,
    clearLogs,
  };
}
