/** 
 * Central registry for Vite dynamic imports.
 * Broad patterns ensure all AAU content and metadata are accessible.
 */
export const fragmentRegistry = import.meta.glob('/modules/**/*.mdx');
export const manifestRegistry = import.meta.glob('/modules/**/manifest.json');
export const simulatorRegistry = import.meta.glob('/modules/**/*.tsx');
export const globalComponentRegistry = import.meta.glob('/src/components/shared-engineering/*.tsx');
