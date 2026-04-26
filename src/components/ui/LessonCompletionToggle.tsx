import type { Locale } from '@core/domain/types';
import { UI_STRINGS } from '@core/manifest/localization-utils';
import { useLessonStatus } from '@core/progress/progress-hooks';
import { toggleLessonProgress } from '@core/progress/progress-service';
import React from 'react';
import { CheckIcon } from './Icons';

interface Props {
  lessonId: string;
  lang: Locale;
}

/** 
 * Action control for manual progress commitment.
 * Utilizes localized strings to maintain linguistic parity across the curriculum.
 */
export const LessonCompletionToggle: React.FC<Props> = ({ lessonId, lang }) => {
  const isDone = useLessonStatus(lessonId);
  const strings = UI_STRINGS[lang];

  return (
    <div className="border-border-color flex flex-col items-center justify-center border-t text-center">
      <h3 className="text-text-main mb-2 text-3xl font-black tracking-tighter">
        {strings.completeLesson}
      </h3>
      <p className="text-text-muted mb-8 max-w-sm text-[15px] font-medium leading-relaxed opacity-70">
        {strings.completeDesc}
      </p>

      <button
        onClick={() => toggleLessonProgress(lessonId)}
        className={`group relative flex items-center justify-center gap-4 rounded-2xl px-10 py-3.5 hd-meta transition-all duration-300 ${isDone
            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500 shadow-md'
            : 'bg-blueprint-surface border-border-color text-text-muted hover:border-color-accent hover:text-color-accent border'
          }`}
      >
        <div className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 ${isDone ? 'border-emerald-600 bg-emerald-500 text-white' : 'bg-blueprint-bg border-border-color group-hover:border-color-accent'
          }`}>
          <CheckIcon className="h-3 w-3" />
        </div>
        <span>{isDone ? strings.completed : strings.markComplete}</span>
      </button>
    </div>
  );
};
