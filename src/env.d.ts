/// <reference path="../.astro/types.d.ts" />
import 'astro/client';
import '../.astro/types.d.ts';

/**
 * Type definitions for the Astro environment.
 * Standardized module imports replace legacy triple-slash references for ESLint compliance.
 */
interface ImportMetaEnv {
  readonly SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
