import React from 'react';

interface Props {
  children: React.ReactNode;
}

/** 
 * Standardized Grid for Dashboard.
 * Optimized for wide displays using max-w-7xl constraints.
 */
export const BentoGrid: React.FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 items-stretch">
      {children}
    </div>
  );
};
