/** Supported languages for content and UI orchestration */
export type Locale = 'en' | 'es';

export type SubjectType = 'foundations' | 'software' | 'middleware' | 'hardware' | 'security';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface LessonMetadata {
  estimatedTime: string;
  difficulty: DifficultyLevel;
}

/** 
 * Atomic Autonomous Unit Manifest.
 * Supports 1:1 mapping for titles, points, and fragment labels.
 */
export interface LessonManifest {
  id: string;
  title: string | Record<Locale, string>;
  learningPoints: string[] | Record<Locale, string[]>;
  fragments: string[];
  /** Maps fragment IDs to translated labels for the sidebar */
  fragmentLabels?: Record<Locale, Record<string, string>>;
  metadata: LessonMetadata;
}

/** Subject domain manifest with localized metadata */
export interface SubjectManifest {
  id: string;
  title: string | Record<Locale, string>;
  type: SubjectType;
  description: string | Record<Locale, string>;
  lessons: string[];
  order: number;
}

export interface SearchEntry {
  id: string;
  title: string;
  category: string;
  type: 'subject' | 'lesson' | 'fragment';
  url: string;
  description?: string;
}

export interface GlobalProgress {
  completedLessons: string[];
}
