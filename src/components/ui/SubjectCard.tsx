import type { Locale, SubjectManifest } from '@core/domain/types';
import { GlossaryWrapper } from '@core/glossary/GlossaryWrapper';
import { getLocalizedStr } from '@core/manifest/lesson-resolver';
import { useSubjectProgress } from '@core/progress/progress-hooks';
import { resolvePath } from '@core/utils/path-utils';
import React from 'react';
import { FadeIn } from './FadeIn';
import { SubjectCardFooter } from './SubjectCardFooter';
import { SubjectCardHeader } from './SubjectCardHeader';
import { SubjectMasteryBadge } from './SubjectMasteryBadge';
import { Surface } from './Surface';

interface Props {
  subject: SubjectManifest;
  lang?: Locale;
}

/** 
 * Subject Dashboard Node.
 * Fixed: Removed fixed max-width to allow responsive expansion within the BentoGrid.
 */
export const SubjectCard: React.FC<Props> = ({ subject, lang = 'en' }) => {
  const completedCount = useSubjectProgress(subject.lessons);
  const total = subject.lessons.length;
  const progressPercent = total > 0 ? (completedCount / total) * 100 : 0;
  const isFullyComplete = progressPercent === 100;

  const masteryClass = isFullyComplete
    ? 'border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.08)]'
    : 'hover:border-color-accent/30';

  const titleColor = isFullyComplete
    ? 'text-emerald-600 dark:text-emerald-400'
    : 'text-text-main group-hover:text-color-accent';

  return (
    <FadeIn delay={150} className="flex h-full w-full">
      <a href={resolvePath(`/subject/${subject.id}`, lang)} className="group block w-full">
        <Surface
          interactive
          className={`relative flex h-full flex-col overflow-hidden transition-all duration-500 ${masteryClass}`}
        >
          <div className={`absolute left-0 top-0 h-1.5 w-full transition-all duration-500 ${isFullyComplete ? 'bg-emerald-500' : 'bg-color-accent opacity-0 group-hover:opacity-100'}`} />

          <div className="flex-grow">
            <SubjectCardHeader
              type={subject.type}
              totalLessons={total}
              isFullyComplete={isFullyComplete}
              lang={lang}
            />

            <div className="mb-4 flex items-center gap-3">
              <h3 className={`text-2xl font-black leading-tight tracking-tighter transition-colors ${titleColor}`}>
                {getLocalizedStr(subject.title, lang)}
              </h3>
              {isFullyComplete && <SubjectMasteryBadge />}
            </div>

            <GlossaryWrapper lang={lang} as="p" className="text-text-muted mb-8 text-[15px] leading-relaxed opacity-70 line-clamp-2">
              {getLocalizedStr(subject.description, lang)}
            </GlossaryWrapper>
          </div>

          <SubjectCardFooter
            percent={progressPercent}
            isFullyComplete={isFullyComplete}
            lang={lang}
          />
        </Surface>
      </a>
    </FadeIn>
  );
};
