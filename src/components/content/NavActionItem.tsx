import React from 'react';

interface Props {
  href: string;
  label: string;
  variant: 'primary' | 'secondary' | 'success' | 'danger';
  icon: 'left' | 'right';
}

/** 
 * Atomic component for technical navigation actions.
 * Enforces standardized typography and interaction states for the curriculum.
 */
export const NavActionItem: React.FC<Props> = ({ href, label, variant, icon }) => {
  const base = "group flex items-center gap-3 rounded-xl px-6 py-2.5 font-mono text-[14px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm hover:shadow-md";

  const variants = {
    primary: "bg-color-accent text-white hover:bg-color-accent-text",
    secondary: "bg-blueprint-surface border border-border-color text-text-muted hover:border-color-accent hover:text-color-accent",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    danger: "bg-blueprint-surface border border-border-color text-text-muted hover:border-rose-500 hover:text-rose-500"
  };

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {icon === 'left' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      )}
      <span>{label}</span>
      {icon === 'right' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </a>
  );
};
