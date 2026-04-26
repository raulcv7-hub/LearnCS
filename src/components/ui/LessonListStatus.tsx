import React from 'react';

interface Props {
  index: number;
  isDone: boolean;
}

/** 
 * Status node for the curriculum overview.
 * Uses the .hd-meta factor for consistent typography.
 */
export const LessonListStatus: React.FC<Props> = ({ index, isDone }) => {
  const statusCircle = isDone
    ? 'bg-blueprint-surface border-emerald-500 text-emerald-600 shadow-sm'
    : 'bg-blueprint-surface border-border-color text-text-muted';

  const spine = isDone ? 'bg-emerald-500/40' : 'bg-border-color';

  return (
    <div className="flex flex-col items-center">
      <div className={`group-hover:border-color-accent group-hover:text-color-accent group-hover:bg-color-accent-dim z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 font-mono text-xl font-bold transition-all duration-300 group-hover:shadow-md ${statusCircle}`}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className={`group-hover:bg-color-accent/40 h-full min-h-[5rem] w-0.5 transition-colors duration-300 group-last:hidden ${spine}`}></div>
    </div>
  );
};
