import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  rounded?: 'standard' | 'large';
  onClick?: (e: React.MouseEvent) => void;
}

/** 
 * Structural Atomic Surface.
 * Restored standard padding (p-8) for professional legibility.
 */
export const Surface: React.FC<Props> = ({ children, className = "", interactive = false, rounded = 'standard', onClick }) => {
  const base = "bg-blueprint-surface border-2 border-border-color shadow-xl dark:shadow-none transition-all duration-500";
  const rounding = rounded === 'standard' ? 'rounded-[32px]' : 'rounded-[48px]';
  const behavior = interactive ? 'hover-lift hover:border-color-accent/40 hover:shadow-2xl' : '';

  return (
    <div 
      onClick={onClick}
      className={`${base} ${rounding} ${behavior} p-8 ${className}`}
    >
      {children}
    </div>
  );
};
