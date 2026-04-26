import React from 'react';
import { Surface } from '../ui/Surface';

interface Props {
  children: React.ReactNode;
  isCompleted?: boolean;
}

/** 
 * Refined Reading Surface.
 * Reduced top padding to align content closely with the LessonHero.
 */
export const LessonContainer: React.FC<Props> = ({ children, isCompleted = false }) => {
  const borderClass = isCompleted
    ? 'border-emerald-500 shadow-emerald-500/10'
    : 'hover:border-color-accent/40 hover:shadow-color-accent/5';

  return (
    <Surface rounded="large" className={`px-6 py-10 md:px-12 md:py-14 lg:px-20 lg:py-16 animate-fade-in-up ${borderClass}`}>
      <article className="prose prose-xl dark:prose-invert">
        {children}
      </article>
    </Surface>
  );
};
