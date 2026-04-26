import type { GlobalProgress } from '../domain/types';

interface ProgressState extends GlobalProgress {
  completedFragments: Record<string, string[]>;
}

const STORAGE_KEY = 'skillbuilder_v3_progress';

/** Dispatches global events to keep disconnected React islands in sync */
const notifyUpdate = (): void => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('progress-update'));
    /** storage event is dispatched for other tabs, custom event for current window */
    window.dispatchEvent(new CustomEvent('storage'));
  }
};

/** Safe retrieval and normalization of progress data */
const getProgress = (): ProgressState => {
  if (typeof window === 'undefined') {
    return { completedLessons: [], completedFragments: {} };
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsed = data ? JSON.parse(data) : null;
    
    return {
      completedLessons: Array.isArray(parsed?.completedLessons) ? parsed.completedLessons : [],
      completedFragments: parsed?.completedFragments || {}
    };
  } catch (e) {
    return { completedLessons: [], completedFragments: {} };
  }
};

/** Commits lesson completion to the knowledge graph */
export const toggleLessonProgress = (lessonId: string): void => {
  const current = getProgress();
  const index = current.completedLessons.indexOf(lessonId);

  if (index > -1) {
    current.completedLessons.splice(index, 1);
  } else {
    current.completedLessons.push(lessonId);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  notifyUpdate();
};

/** Updates the reading path progress */
export const updateSectionProgress = (lessonId: string, fragmentsUpTo: string[]): void => {
  const current = getProgress();
  current.completedFragments[lessonId] = fragmentsUpTo;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  notifyUpdate();
};

/** Direct check for lesson completion */
export const isLessonCompleted = (lessonId: string): boolean => {
  return getProgress().completedLessons.includes(lessonId);
};

/** Returns fragments marked as read */
export const getReadSections = (lessonId: string): string[] => {
  return getProgress().completedFragments[lessonId] || [];
};

/** 
 * Calculates the mastery level for a specific subject.
 * Compares subject lesson IDs against the globally completed list.
 */
export const calculateSubjectProgress = (lessonIds: string[]): number => {
  const state = getProgress();
  const completed = state.completedLessons;
  
  if (!Array.isArray(lessonIds)) return 0;
  
  return lessonIds.filter((id) => completed.includes(id)).length;
};
