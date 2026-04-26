import React from 'react';

interface Props {
  id: string;
  label: string;
  isActive: boolean;
  isRead: boolean;
}

/** 
 * Renders an individual fragment node with atomic visual states.
 * Current = Blue (Active) | History = Emerald (Passed) | Future = Muted (Unreached)
 */
export const SidebarFragmentNode: React.FC<Props> = ({ id, label, isActive, isRead }) => {
  const activeClass = 'text-color-accent font-black translate-x-1 border-l-2 border-color-accent bg-color-accent-dim/30';

  const readClass = 'text-emerald-500 font-bold border-l-2 border-emerald-500/40';

  const defaultClass = 'text-text-muted/40 hover:text-text-main font-medium border-l-2 border-transparent';

  return (
    <a
      href={`#${id}`}
      className={`px-4 py-2 font-mono text-[13px] uppercase tracking-widest transition-all duration-300 ${isActive ? activeClass : isRead ? readClass : defaultClass
        }`}
    >
      {label}
    </a>
  );
};
