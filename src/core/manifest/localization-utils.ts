import type { LessonManifest, Locale } from '@core/domain/types';

/** Dictionary for static UI interface labels and instructional text */
export const UI_STRINGS = {
  en: {
    units: 'Units',
    progress: 'Learning Progress',
    mastery: 'Mastery Achieved',
    dashboard: 'Dashboard',
    search: 'Search knowledge...',
    noResults: 'Zero nodes matched',
    completeLesson: 'Complete Lesson',
    completeDesc: 'Commit your progress to the curriculum map.',
    completed: 'Completed',
    markComplete: 'Mark as Complete'
  },
  es: {
    units: 'Unidades',
    progress: 'Progreso de Aprendizaje',
    mastery: 'Maestría Lograda',
    dashboard: 'Panel Control',
    search: 'Buscar conocimiento...',
    noResults: 'Sin resultados',
    completeLesson: 'Lección Completada',
    completeDesc: 'Confirma tu progreso en el mapa curricular.',
    completed: 'Completado',
    markComplete: 'Marcar como Completada'
  }
};

/** Resolves a localized string from a manifest field with priority fallback */
export const getLocalizedStr = (field: string | Record<Locale, string> | undefined, lang: Locale): string => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field['en'] || '';
};

/** Resolves a localized array from a manifest field with priority fallback */
export const getLocalizedArray = (field: string[] | Record<Locale, string[]> | undefined, lang: Locale): string[] => {
  if (!field) return [];
  if (Array.isArray(field)) return field;
  return field[lang] || field['en'] || [];
};

/** Resolves the visual label for a fragment based on manifest mapping */
export const getFragmentLabel = (manifest: LessonManifest, fragmentId: string, lang: Locale): string => {
  const label = manifest.fragmentLabels?.[lang]?.[fragmentId];
  if (label) return label;
  const fallback = manifest.fragmentLabels?.['en']?.[fragmentId];
  if (fallback) return fallback;
  return fragmentId.replace(/-/g, ' ').toUpperCase();
};
