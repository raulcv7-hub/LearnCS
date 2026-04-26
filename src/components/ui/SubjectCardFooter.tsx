import type { Locale } from '@core/domain/types';
import { UI_STRINGS } from '@core/manifest/localization-utils';
import React from 'react';

interface Props {
  percent: number;
  isFullyComplete: boolean;
  lang: Locale;
}

/** Renders localized progress metrics for subject mastery */
export const SubjectCardFooter: React.FC<Props> = ({ percent, isFullyComplete, lang }) => {
  const accentClass = isFullyComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-color-accent-text';
  const barClass = isFullyComplete ? 'bg-emerald-500' : 'bg-color-accent';
  const label = isFullyComplete ? UI_STRINGS[lang].mastery : UI_STRINGS[lang].progress;

  return (
    <div className="border-border-color/50 mt-auto border-t-2 pt-4">
      <div className="text-text-muted mb-2.5 flex justify-between font-mono text-[14px] font-bold uppercase tracking-widest">
        <span className={isFullyComplete ? 'text-emerald-600 dark:text-emerald-400' : ''}>
          {label}
        </span>
        <span className={accentClass}>
          {percent.toFixed(0)}%
        </span>
      </div>
      <div className="bg-border-color/30 h-2 w-full overflow-hidden rounded-full">
        <div
          className={`h-full transition-all duration-1000 ease-out ${barClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
