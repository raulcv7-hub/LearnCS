import React from 'react';
import type { LessonManifest, Locale } from '@core/domain/types';
import { SidebarLessonNode } from './SidebarLessonNode';
import { HeaderGroup } from '../ui/HeaderGroup';

/** Unified localized navigation shell using HeaderGroup factor */
export const LessonSidebar: React.FC<{ subjectId: string; currentLessonId: string; lessons: LessonManifest[]; fragments: string[]; lang?: Locale }> = ({ subjectId, currentLessonId, lessons, fragments, lang = 'en' }) => {
  return (
    <aside className="sticky top-28 hidden h-fit w-64 shrink-0 xl:block">
      <div className="space-y-6">
        <HeaderGroup label="Navigation" title="Curriculum Map" className="pl-4" />
        <nav className="flex flex-col gap-1.5">
          {lessons.map((lesson) => (
            <SidebarLessonNode key={lesson.id} subjectId={subjectId} lesson={lesson} isActive={currentLessonId === lesson.id} fragments={fragments} lang={lang} />
          ))}
        </nav>
      </div>
    </aside>
  );
};
