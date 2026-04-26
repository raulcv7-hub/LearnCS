import type { Locale } from '@core/domain/types';
import { getTermDefinition } from '@core/glossary/glossary-service';
import React, { useState } from 'react';

interface Props {
  id: string;
  children: React.ReactNode;
  lang?: Locale;
}

/** 
 * High-Visibility anchor for technical terms.
 * Features a high-contrast dashed underline and an elevated tooltip.
 */
const GlossaryTerm: React.FC<Props> = ({ id, children, lang = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const info = getTermDefinition(id, lang);

  return (
    <span
      className="group relative inline-block cursor-help align-baseline"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b-2 border-dashed border-color-accent/60 bg-color-accent/5 px-0.5 font-bold text-text-main transition-all group-hover:border-color-accent group-hover:bg-color-accent/10 group-hover:text-color-accent">
        {children}
      </span>

      {isVisible && (
        <span className="pointer-events-none absolute bottom-full left-1/2 z-[999] mb-4 w-72 -translate-x-1/2 animate-fade-in-up">
          <span className="relative block rounded-2xl border-2 border-color-accent bg-blueprint-surface p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <span className="mb-2 block font-mono text-[12px] font-black uppercase tracking-widest text-color-accent">
              Glosario: {info.term}
            </span>
            <span className="block text-[14px] font-medium leading-relaxed text-text-main">
              {info.definition}
            </span>
            <span className="absolute -bottom-[10px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-color-accent bg-blueprint-surface"></span>
          </span>
        </span>
      )}
    </span>
  );
};

GlossaryTerm.displayName = 'GlossaryTerm';
export default GlossaryTerm;
