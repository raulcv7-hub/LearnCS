import type { Locale } from '../domain/types';
import { GLOSSARY, type GlossaryDefinition } from './database';

/** 
 * Retrieves a localized definition from the glossary repository.
 * Performs case-insensitive matching and provides a standard error fallback.
 */
export const getTermDefinition = (id: string, lang: Locale): GlossaryDefinition => {
  const normalizedId = (id || '').toLowerCase();
  const entry = GLOSSARY[normalizedId];

  if (!entry) {
    return {
      term: id,
      definition: `Technical definition for [${id}] is pending registration in the system.`
    };
  }

  /** Priority: Requested Language > English Fallback > First Available Language */
  const localized = entry[lang] || entry['en'];

  if (!localized) {
    const firstKey = Object.keys(entry)[0] as Locale;
    return entry[firstKey];
  }

  return localized;
};
