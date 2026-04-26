import React from 'react';

/** Standardized color palette for the technical design system */
export type BadgeColor = 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'orange' | 'purple' | 'slate' | 'accent';

interface Props {
  children: React.ReactNode;
  color?: BadgeColor;
  className?: string;
}

/** 
 * Atomic component for high-density themed tags.
 * Centralizes the Skillbuilder's chromatic design system.
 */
export const Badge: React.FC<Props> = ({ children, color = 'slate', className = "" }) => {
  const variants: Record<BadgeColor, string> = {
    blue: 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400',
    emerald: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
    amber: 'border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400',
    rose: 'border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400',
    indigo: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400',
    orange: 'border-orange-500/30 bg-orange-500/5 text-orange-600 dark:text-orange-400',
    purple: 'border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400',
    slate: 'border-slate-500/30 bg-slate-500/5 text-slate-500 dark:text-slate-400',
    accent: 'border-color-accent/30 bg-color-accent-dim text-color-accent-text',
  };

  return (
    <span className={`hd-meta px-2.5 py-1 border rounded-md transition-colors ${variants[color]} ${className}`}>
      {children}
    </span>
  );
};
