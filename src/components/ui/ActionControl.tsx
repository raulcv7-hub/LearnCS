import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

/** 
 * Standardized Square UI Control for the Navigation Header.
 * Centralizes interaction states and physical dimensions.
 */
export const ActionControl: React.FC<Props> = ({ children, onClick, ariaLabel, className = "" }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`border-border-color bg-blueprint-surface/50 hover:border-color-accent group flex h-10 w-10 items-center justify-center rounded-xl border transition-all active:scale-90 ${className}`}
    >
      <div className="transition-transform group-hover:scale-110">
        {children}
      </div>
    </button>
  );
};
