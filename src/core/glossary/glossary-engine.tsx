import React from 'react';
import GlossaryTerm from '@components/shared-engineering/GlossaryTerm';
import { GLOSSARY } from './database';
import type { Locale } from '@core/domain/types';

/** 
 * Scans a React Node tree to find and wrap technical glossary terms.
 * This engine is highly recursive to handle complex MDX formatting.
 */
export const injectGlossaryTerms = (node: React.ReactNode, lang: Locale): React.ReactNode => {
  if (!node) return node;

  /** Text node: Perform the actual term detection */
  if (typeof node === 'string') {
    return applyAutoLink(node, lang);
  }

  /** Collection: Recursively map all children */
  if (Array.isArray(node)) {
    return React.Children.map(node, (child) => injectGlossaryTerms(child, lang));
  }

  /** Element: Recurse into valid React elements while respecting protection rules */
  if (React.isValidElement(node)) {
    const type = node.type as any;
    
    /** 
     * Block & Interaction Protection:
     * We never inject terms into links, code blocks, headers, or existing Glossary terms.
     */
    const isProtected = ['a', 'code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(type) || 
                        type?.displayName === 'GlossaryTerm' || 
                        type?.displayName === 'InternalPreview';

    if (isProtected) return node;

    if (node.props && node.props.children) {
      return React.cloneElement(node, {
        ...node.props,
        children: React.Children.map(node.props.children, (child) => 
          injectGlossaryTerms(child, lang)
        ),
      } as any);
    }
  }

  return node;
};

/** 
 * Splits a string into an array of text and GlossaryTerm components.
 * Matches are case-insensitive based on the global GLOSSARY registry.
 */
function applyAutoLink(text: string, lang: Locale): (string | JSX.Element)[] {
  const terms = Object.keys(GLOSSARY);
  if (!text || terms.length === 0) return [text];

  const pattern = terms.join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
  
  const parts = text.split(regex);
  const result: (string | JSX.Element)[] = [];

  parts.forEach((part, i) => {
    const key = part.toLowerCase();
    /** If part matches a glossary key, inject the term component */
    if (GLOSSARY[key]) {
      result.push(
        <GlossaryTerm key={`${key}-${i}`} id={key} lang={lang}>
          {part}
        </GlossaryTerm>
      );
    } else {
      result.push(part);
    }
  });

  return result;
}
