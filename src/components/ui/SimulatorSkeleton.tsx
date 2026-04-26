import React from 'react';

/** 
 * Renders a structural placeholder for simulators during lazy-loading.
 * Maintains layout stability and visual consistency with the blueprint theme.
 */
export const SimulatorSkeleton: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="my-8 flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border-color bg-blueprint-bg/50 px-6 py-12">
      <div className="relative mb-6">
        <div className="bg-color-accent absolute inset-0 animate-ping rounded-full opacity-20"></div>
        <div className="bg-color-accent relative h-12 w-12 rounded-xl opacity-40"></div>
      </div>
      <p className="text-text-muted font-mono text-[14px] font-bold uppercase tracking-[0.3em]">
        Initializing {name}...
      </p>
      <div className="mt-4 flex gap-2">
        <div className="h-1.5 w-8 animate-pulse rounded-full bg-border-color"></div>
        <div className="h-1.5 w-12 animate-pulse rounded-full bg-border-color" style={{ animationDelay: '200ms' }}></div>
        <div className="h-1.5 w-6 animate-pulse rounded-full bg-border-color" style={{ animationDelay: '400ms' }}></div>
      </div>
    </div>
  );
};
