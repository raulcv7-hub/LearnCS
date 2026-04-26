import type { LessonManifest, Locale } from '@core/domain/types';
import { resolvePath } from '@core/utils/path-utils';
import React from 'react';
import { NavActionItem } from './NavActionItem';

interface Props {
  subjectId: string;
  currentLessonId: string;
  lessons: LessonManifest[];
  lang: Locale;
}

/** 
 * Contextual Lesson Navigation Shell.
 * Now fully locale-aware to prevent 404 routing errors.
 */
export const LessonNavigation: React.FC<Props> = ({ subjectId, currentLessonId, lessons, lang }) => {
  const currentIndex = lessons.findIndex((l) => l.id === currentLessonId);
  const prevLesson = lessons[currentIndex - 1];
  const nextLesson = lessons[currentIndex + 1];

  /** Helper to generate localized subject-level route */
  const subjectOverviewUrl = resolvePath(`/subject/${subjectId}`, lang);

  return (
    <div className="mt-8 flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="w-full sm:w-auto">
        {prevLesson ? (
          <NavActionItem
            href={resolvePath(`/subject/${subjectId}/${prevLesson.id}`, lang)}
            label="Previous Lesson"
            variant="secondary"
            icon="left"
          />
        ) : (
          <NavActionItem
            href={subjectOverviewUrl}
            label="Exit to Overview"
            variant="danger"
            icon="left"
          />
        )}
      </div>

      <div className="w-full sm:w-auto">
        {nextLesson ? (
          <NavActionItem
            href={resolvePath(`/subject/${subjectId}/${nextLesson.id}`, lang)}
            label="Next Lesson"
            variant="primary"
            icon="right"
          />
        ) : (
          <NavActionItem
            href={subjectOverviewUrl}
            label="Subject Overview"
            variant="success"
            icon="right"
          />
        )}
      </div>
    </div>
  );
};
