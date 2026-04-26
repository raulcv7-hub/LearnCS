import type { Locale } from '@core/domain/types';
import { UI_STRINGS } from '@core/manifest/localization-utils';
import { getCategoryColorKey } from '@core/styles/theme-utils';
import React from 'react';
import { Badge, type BadgeColor } from './Badge';

interface Props {
  type: string;
  totalLessons: number;
  isFullyComplete: boolean;
  lang: Locale;
}

/** Header section of the Subject Card with localized unit labeling */
export const SubjectCardHeader: React.FC<Props> = ({ type, totalLessons, isFullyComplete, lang }) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <Badge color={getCategoryColorKey(type) as BadgeColor}>{type}</Badge>
      <div className="flex items-baseline gap-1.5">
        <span className={`text-3xl font-black ${isFullyComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-text-main'}`}>
          {totalLessons}
        </span>
        <span className="text-text-muted hd-meta text-[14px]">
          {UI_STRINGS[lang].units}
        </span>
      </div>
    </div>
  );
};
