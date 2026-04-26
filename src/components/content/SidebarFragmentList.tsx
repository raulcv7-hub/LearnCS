import type { LessonManifest, Locale } from '@core/domain/types';
import { getFragmentLabel } from '@core/manifest/lesson-resolver';
import React from 'react';
import { SidebarFragmentNode } from './SidebarFragmentNode';

interface Props {
  lesson: LessonManifest;
  lang: Locale;
  activeId: string;
  passedIds: string[];
}

/** 
 * Pure presentation component for the localized list of fragments in the sidebar.
 */
export const SidebarFragmentList: React.FC<Props> = ({ lesson, lang, activeId, passedIds }) => {
  return (
    <div className="mb-2 ml-4 mt-1 flex flex-col py-1">
      {lesson.fragments.map((fid) => (
        <SidebarFragmentNode
          key={fid}
          id={fid}
          label={getFragmentLabel(lesson, fid, lang)}
          isActive={activeId === fid}
          isRead={passedIds.includes(fid)}
        />
      ))}
    </div>
  );
};
