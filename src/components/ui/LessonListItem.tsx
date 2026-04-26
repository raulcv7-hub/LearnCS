import React from 'react';
import type { LessonManifest, Locale } from '@core/domain/types';
import { useLessonStatus } from '@core/progress/progress-hooks';
import { getLocalizedStr, getLocalizedArray } from '@core/manifest/lesson-resolver';
import { resolvePath } from '@core/utils/path-utils';
import { GlossaryWrapper } from '@core/glossary/GlossaryWrapper';
import { FadeIn } from './FadeIn';
import { LessonListStatus } from './LessonListStatus';
import { LessonListMetadata } from './LessonListMetadata';
import { Surface } from './Surface';

interface Props {
  subjectId: string;
  lesson: LessonManifest;
  index: number;
  lang: Locale;
}

/** 
 * Compressed Lesson summary node.
 * Integrates the GlossaryWrapper to ensure technical terms are highlighted in learning points.
 */
export const LessonListItem: React.FC<Props> = ({ subjectId, lesson, index, lang }) => {
  const isDone = useLessonStatus(lesson.id);
  const title = getLocalizedStr(lesson.title, lang);
  const points = getLocalizedArray(lesson.learningPoints, lang);

  return (
    <FadeIn delay={index * 50} className="group relative flex w-full items-start justify-center gap-10">
      <LessonListStatus index={index} isDone={isDone} />
      
      <div className="w-full max-w-2xl pb-12">
        <a href={resolvePath(`/subject/${subjectId}/${lesson.id}`, lang)} className="block">
          <Surface interactive className={`${isDone ? 'border-emerald-500' : ''}`}>
            <div className="mb-4 flex items-start justify-between">
              <h4 className="group-hover:text-color-accent text-2xl font-black tracking-tight text-text-main transition-colors">
                {title}
              </h4>
              {isDone && <span className="rounded-full border border-emerald-600 bg-emerald-500 px-3 py-1 hd-meta text-white">Done</span>}
            </div>

            <ul className="mb-8 space-y-3">
              {points.map((p, i) => (
                <li key={i} className="text-text-muted group-hover:text-text-main flex items-start gap-3 text-[14px] font-medium transition-colors">
                  <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${isDone ? 'bg-emerald-500' : 'bg-color-accent'} opacity-60`}></span>
                  <GlossaryWrapper lang={lang} as="span">{p}</GlossaryWrapper>
                </li>
              ))}
            </ul>

            <LessonListMetadata metadata={lesson.metadata} />
          </Surface>
        </a>
      </div>
    </FadeIn>
  );
};
