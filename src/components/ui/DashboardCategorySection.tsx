import type { Locale, SubjectManifest, SubjectType } from '@core/domain/types';
import React from 'react';
import { BentoGrid } from '../layout/BentoGrid';
import { SubjectCard } from './SubjectCard';

interface Props {
  category: SubjectType;
  subjects: SubjectManifest[];
  lang: Locale;
  index: number;
}

/** 
 * Localized Dashboard Section.
 * Implements a structural dividing bar between course categories for better legibility.
 */
export const DashboardCategorySection: React.FC<Props> = ({ category, subjects, lang, index }) => {
  const filtered = subjects
    .filter((s) => s.type === category)
    .sort((a, b) => a.order - b.order);

  if (filtered.length === 0) return null;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-8" style={{ animationDelay: `${index * 150}ms` }}>
      <div className="group mb-12 flex items-center gap-10">
        <h2 className="text-text-main text-2xl font-black uppercase tracking-[0.4em] opacity-100">
          {category}
        </h2>
        <div className="bg-border-color h-[2px] flex-1 opacity-20 dark:opacity-10" />
      </div>

      <BentoGrid>
        {filtered.map((subject) => (
          <SubjectCard 
            key={subject.id} 
            subject={subject} 
            lang={lang} 
            client:load 
          />
        ))}
      </BentoGrid>
    </section>
  );
};
