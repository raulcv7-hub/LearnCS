import type { LessonManifest } from '@core/domain/types';
import { manifestRegistry } from './registry';

interface ManifestModule {
  default: LessonManifest;
}

/** Resolves an ordered list of lesson manifests for a specific subject context */
export async function getLessonsForSubject(
  subjectId: string,
  lessonIds: string[]
): Promise<LessonManifest[]> {
  const lessonList: LessonManifest[] = [];
  if (!lessonIds || !Array.isArray(lessonIds)) return [];

  for (const id of lessonIds) {
    try {
      const manifest = await getLessonManifest(subjectId, id);
      if (manifest) lessonList.push(manifest);
    } catch {
      continue;
    }
  }

  return lessonList;
}

/** 
 * Retrieves the manifest for a specific Atomic Autonomous Unit (AAU).
 * Standardizes separators and uses a robust intersection check to find the correct file.
 */
export async function getLessonManifest(
  subjectId: string,
  lessonId: string
): Promise<LessonManifest> {
  const entries = Object.entries(manifestRegistry);
  const targetSuffix = `${subjectId}/${lessonId}/manifest.json`.toLowerCase();

  /** 
   * Normalization Strategy:
   * We replace all slashes and convert to lowercase to find the manifest regardless 
   * of the Vite glob's prefix (./, /, or absolute).
   */
  const entry = entries.find(([path]) => {
    const cleanPath = path.replace(/\\/g, '/').replace(/\/+/g, '/').toLowerCase();
    return cleanPath.endsWith(targetSuffix);
  });

  if (!entry) {
    throw new Error(`Manifest not found for: ${targetSuffix}`);
  }

  const loader = entry[1] as () => Promise<ManifestModule>;
  const mod = await loader();

  if (!mod?.default) {
    throw new Error(`Failed to load manifest content for: ${targetSuffix}`);
  }

  return mod.default;
}

/** Identifies all valid lesson route combinations */
export async function getLessonPaths() {
  const paths = [];

  for (const path in manifestRegistry) {
    const segments = path.split('/').filter(Boolean);
    const modIdx = segments.indexOf('modules');

    if (modIdx !== -1 && segments.length === modIdx + 5) {
      paths.push({
        params: {
          subjectId: segments[modIdx + 2],
          lessonId: segments[modIdx + 3],
        },
      });
    }
  }

  return paths;
}
