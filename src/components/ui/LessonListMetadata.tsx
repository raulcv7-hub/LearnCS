import React from 'react';
import { Badge, type BadgeColor } from './Badge';
import { getDifficultyColorKey, getDurationColorKey } from '@core/styles/theme-utils';
import type { LessonMetadata } from '@core/domain/types';

/** Renders localized metadata for curriculum list items */
export const LessonListMetadata: React.FC<{ metadata: LessonMetadata }> = ({ metadata }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge color={getDurationColorKey(metadata.estimatedTime) as BadgeColor} className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
        {metadata.estimatedTime}
      </Badge>
      <Badge color={getDifficultyColorKey(metadata.difficulty) as BadgeColor} className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
        {metadata.difficulty}
      </Badge>
    </div>
  );
};
