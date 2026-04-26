import React from 'react';
import { resolvePath } from '@core/utils/path-utils';

/** 
 * Renders the primary brand identity for the Skillbuilder.
 */
export const HeaderLogo: React.FC = () => {
  return (
    <div className="flex flex-1 justify-start">
      <a href={resolvePath('/')} className="group flex items-center gap-2">
        <div className="bg-color-accent flex h-8 w-10 items-center justify-center rounded-lg text-xs font-black text-white transition-transform group-hover:scale-105">
          LCS
        </div>
        <span className="text-text-main font-mono text-lg font-bold tracking-tight">
          LearnCS
        </span>
      </a>
    </div>
  );
};
