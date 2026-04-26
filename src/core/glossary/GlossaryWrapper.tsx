import type { Locale } from '@core/domain/types';
import React from 'react';
import { injectGlossaryTerms } from './glossary-engine';

interface Props {
  children: React.ReactNode;
  lang: Locale;
  as?: any;
  className?: string;
}

/** 
 * Higher-Order Component for Automated Technical Linking.
 * Injects GlossaryTerm components into the child tree based on the global registry.
 */
export const GlossaryWrapper: React.FC<Props> = ({
  children,
  lang,
  as: Component = 'div',
  className
}) => {
  return (
    <Component className={className}>
      {injectGlossaryTerms(children, lang)}
    </Component>
  );
};
