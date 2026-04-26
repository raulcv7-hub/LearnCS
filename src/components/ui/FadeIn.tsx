import React from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/** 
 * Centralized Animation Wrapper.
 * Standardizes the 'fade-in-up' entrance for all curriculum components.
 */
export const FadeIn: React.FC<Props> = ({ children, delay = 0, className = "" }) => {
  return (
    <div
      className={`animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
};
