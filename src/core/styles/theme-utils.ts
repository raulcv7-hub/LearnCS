import type { DifficultyLevel, SubjectType } from '../domain/types';

/** 
 * Maps technical levels to semantic color keys.
 */
export const getDifficultyColorKey = (level: DifficultyLevel): string => {
  const mapping: Record<DifficultyLevel, string> = {
    easy: 'emerald',
    medium: 'amber',
    hard: 'rose',
  };
  return mapping[level] || 'slate';
};

/** 
 * Maps subject domains to semantic color keys.
 */
export const getCategoryColorKey = (type: SubjectType | string): string => {
  const mapping: Record<string, string> = {
    foundations: 'blue',
    software: 'emerald',
    middleware: 'indigo',
    hardware: 'orange',
    security: 'rose',
  };
  return mapping[type] || 'slate';
};

/** 
 * Resolves semantic colors based on time investment.
 */
export const getDurationColorKey = (duration: string): string => {
  const hours = parseInt(duration.match(/(\d+)h/)?.[1] || '0');
  const minutes = parseInt(duration.match(/(\d+)m/)?.[1] || '0');
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes < 30) return 'emerald';
  if (totalMinutes <= 60) return 'blue';
  return 'purple';
};
