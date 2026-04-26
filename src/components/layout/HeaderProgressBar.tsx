import React from 'react';
import { useScrollProgress } from '@core/hooks/useScrollProgress';

/** 
 * Visual progress indicator for the global header.
 * Consumes the centralized useScrollProgress hook.
 */
export const HeaderProgressBar: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="bg-color-accent absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};
