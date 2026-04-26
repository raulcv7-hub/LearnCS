import React from 'react';

/** 
 * Renders the trigger for the global search command palette.
 */
export const HeaderSearchTrigger: React.FC = () => {
  const openSearch = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }));
  };

  return (
    <button
      onClick={openSearch}
      className="border-border-color bg-blueprint-bg text-text-muted hover:border-color-accent flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-bold transition-all sm:w-48"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <kbd className="ml-auto hidden text-[14px] opacity-40 sm:inline">⌘K</kbd>
    </button>
  );
};
