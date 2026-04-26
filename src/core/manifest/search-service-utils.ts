import type { SearchEntry, Locale, SubjectManifest, LessonManifest } from '@core/domain/types';
import { resolvePath } from '@core/utils/path-utils';
import { getLocalizedStr, getFragmentLabel } from './localization-utils';

/** Transforms a subject manifest into a localized search node */
export const subjectToSearchEntry = (subject: SubjectManifest, lang: Locale): SearchEntry => {
  return {
    id: subject.id,
    title: getLocalizedStr(subject.title, lang),
    category: subject.type,
    type: 'subject',
    url: resolvePath(`/subject/${subject.id}`, lang),
    description: getLocalizedStr(subject.description, lang),
  };
};

/** Transforms a lesson manifest into a localized search node */
export const lessonToSearchEntry = (
  subjectId: string,
  subjectTitle: string,
  lesson: LessonManifest,
  lang: Locale
): SearchEntry => {
  return {
    id: lesson.id,
    title: getLocalizedStr(lesson.title, lang),
    category: subjectTitle,
    type: 'lesson',
    url: resolvePath(`/subject/${subjectId}/${lesson.id}`, lang),
    description: `Module: ${subjectTitle}`,
  };
};

/** Transforms fragments into localized search nodes with deep-link anchors */
export const fragmentsToSearchEntries = (
  subjectId: string,
  lessonId: string,
  lessonTitle: string,
  manifest: LessonManifest,
  lang: Locale
): SearchEntry[] => {
  return manifest.fragments.map((id) => ({
    id: `${lessonId}-${id}`,
    title: `${lessonTitle} › ${getFragmentLabel(manifest, id, lang)}`,
    category: lessonTitle,
    type: 'fragment',
    url: resolvePath(`/subject/${subjectId}/${lessonId}#${id}`, lang),
    description: `Section: ${lessonTitle}`,
  }));
};
