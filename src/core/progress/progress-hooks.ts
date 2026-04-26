import { useEffect, useState } from 'react';
import { calculateSubjectProgress, getReadSections, isLessonCompleted } from './progress-service';

/** Synchronized completion status for a specific lesson AAU */
export const useLessonStatus = (lessonId: string) => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const sync = () => setIsDone(isLessonCompleted(lessonId));
    sync();
    window.addEventListener('progress-update', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('progress-update', sync);
      window.removeEventListener('storage', sync);
    };
  }, [lessonId]);

  return isDone;
};

/** 
 * Aggregated progress count for subject domains.
 * Uses a stringified dependency to ensure stable updates across React's lifecycle.
 */
export const useSubjectProgress = (lessonIds: string[]) => {
  const [completedCount, setCompletedCount] = useState(0);
  const idsKey = (lessonIds || []).join(',');

  useEffect(() => {
    const sync = () => {
      if (!lessonIds) return;
      const count = calculateSubjectProgress(lessonIds);
      setCompletedCount(count);
    };

    /** Immediate sync on mount to prevent 0% flash */
    sync();

    window.addEventListener('progress-update', sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener('progress-update', sync);
      window.removeEventListener('storage', sync);
    };
  }, [idsKey]);

  return completedCount;
};

/** Internal hook for fragment progress within a lesson */
export const useSectionStatus = (lessonId: string) => {
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setReadIds(getReadSections(lessonId));
    sync();
    window.addEventListener('progress-update', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('progress-update', sync);
      window.removeEventListener('storage', sync);
    };
  }, [lessonId]);

  return readIds;
};
