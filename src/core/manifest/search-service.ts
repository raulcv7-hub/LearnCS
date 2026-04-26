import type { Locale, SearchEntry } from '@core/domain/types';
import { getAllSubjects, getLessonsForSubject, getLocalizedStr } from './manifest-resolver';
import {
  fragmentsToSearchEntries,
  lessonToSearchEntry,
  subjectToSearchEntry
} from './search-service-utils';

/** 
 * Builds a 100% localized search index for the specified language.
 * Crawls the AAU hierarchy and resolves localized strings from manifests.
 */
export async function buildFullSearchIndex(lang: Locale): Promise<SearchEntry[]> {
  const subjects = await getAllSubjects();
  const searchIndex: SearchEntry[] = [];

  for (const s of subjects) {
    const subjectTitle = getLocalizedStr(s.title, lang);
    searchIndex.push(subjectToSearchEntry(s, lang));

    const lessons = await getLessonsForSubject(s.id, s.lessons);
    for (const l of lessons) {
      const lessonTitle = getLocalizedStr(l.title, lang);
      searchIndex.push(lessonToSearchEntry(s.id, subjectTitle, l, lang));
      searchIndex.push(...fragmentsToSearchEntries(s.id, l.id, lessonTitle, l, lang));
    }
  }

  return searchIndex;
}
