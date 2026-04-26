import type { LessonManifest, Locale } from '@core/domain/types';
import { useActiveSectionTracker } from '@core/hooks/useActiveSectionTracker';
import { getLocalizedStr } from '@core/manifest/lesson-resolver';
import { useLessonStatus } from '@core/progress/progress-hooks';
import { resolvePath } from '@core/utils/path-utils';
import React from 'react';
import { SidebarFragmentList } from './SidebarFragmentList';

interface Props {
  subjectId: string;
  lesson: LessonManifest;
  isActive: boolean;
  fragments: string[];
  lang: Locale;
}

/** 
 * Orchestrates a lesson node within the sidebar.
 * Combines completion state, active tracking, and localized lists.
 */
export const SidebarLessonNode: React.FC<Props> = ({ subjectId, lesson, isActive, fragments, lang }) => {
  const isDone = useLessonStatus(lesson.id);
  const { activeId, passedIds } = useActiveSectionTracker(isActive, lesson.id, fragments);

  const title = getLocalizedStr(lesson.title, lang);
  const statusClass = isActive 
    ? 'bg-color-accent-dim border-color-accent/40 text-color-accent shadow-md' 
    : isDone ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'border-transparent text-text-muted hover:bg-blueprint-bg';

  return (
    <div className="flex flex-col gap-1">
      <a href={resolvePath(`/subject/${subjectId}/${lesson.id}`, lang)} className={`group flex items-center gap-3 rounded-xl border-2 px-4 py-2.5 transition-all duration-300 ${statusClass}`}>
        <span className={`h-2 w-2 rounded-full transition-all ${isActive ? 'bg-color-accent scale-125 shadow-[0_0_14px_rgba(var(--color-accent),0.5)]' : isDone ? 'bg-emerald-500' : 'bg-border-color'}`}></span>
        <span className="truncate hd-heading">{title}</span>
      </a>
      {isActive && (
        <SidebarFragmentList 
          lesson={lesson} 
          lang={lang} 
          activeId={activeId} 
          passedIds={passedIds} 
        />
      )}
    </div>
  );
};
