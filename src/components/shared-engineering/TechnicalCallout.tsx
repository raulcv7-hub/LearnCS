import React from 'react';

interface Props {
  type?: 'info' | 'warning' | 'deep-dive';
  title: string;
  children: React.ReactNode;
}

/** 
 * Semantic callout box for high-density technical notes.
 * Uses domain-aware accents to categorize non-linear information.
 */
export default function TechnicalCallout({ type = 'info', title, children }: Props) {
  const styles = {
    info: 'border-color-accent bg-color-accent-dim text-color-accent-text',
    warning: 'border-amber-500 bg-amber-500/5 text-amber-700 dark:text-amber-400',
    'deep-dive': 'border-purple-500 bg-purple-500/5 text-purple-700 dark:text-purple-400',
  };

  return (
    <aside className={`my-8 rounded-2xl border-l-4 p-6 shadow-sm ${styles[type]}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-[14px] font-black uppercase tracking-[0.2em] opacity-70">
          {type.replace('-', ' ')}
        </span>
      </div>
      <h5 className="mb-3 font-mono text-lg font-black uppercase tracking-tight">
        {title}
      </h5>
      <div className="prose-sm leading-relaxed opacity-90">
        {children}
      </div>
    </aside>
  );
}
