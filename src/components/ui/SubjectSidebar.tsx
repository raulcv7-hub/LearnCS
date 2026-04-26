import React from 'react';
import { resolvePath } from '@core/utils/path-utils';
import { FadeIn } from './FadeIn';
import type { Locale } from '@core/domain/types';

interface Props {
  lang: Locale;
}

/** 
 * Contextual sidebar for the subject overview page.
 * Provides the localized return-path to the dashboard.
 */
export const SubjectSidebar: React.FC<Props> = ({ lang }) => {
  return (
    <FadeIn>
      <nav className="sticky top-28">
        <a
          href={resolvePath('/', lang)}
          className="bg-blueprint-surface border-border-color text-text-muted hover:border-color-accent inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 hd-meta shadow-sm transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Dashboard
        </a>
      </nav>
    </FadeIn>
  );
};
