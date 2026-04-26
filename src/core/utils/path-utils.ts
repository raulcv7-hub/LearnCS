import type { Locale } from '@core/domain/types';

/** 
 * Resolves paths against the base URL and the current locale.
 * Ensures that internal navigation preserves the selected language.
 */
export const resolvePath = (path: string, lang?: Locale): string => {
  if (path.startsWith('http') || path.startsWith('#')) return path;

  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  /** Strip leading slash to prevent double-slashing */
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  /** 
   * Prepend locale if provided and not already present.
   * Format: [BASE]/[LANG]/[PATH]
   */
  const langSegment = lang ? `${lang}/` : '';
  const resolved = `${normalizedBase}${langSegment}${cleanPath}`;

  return resolved.replace(/(?<!:)\/\/\//g, '/').replace(/(?<!:)\/\//g, '/');
};
