import type { SubjectManifest } from '@core/domain/types';
import { manifestRegistry } from './registry';

interface ManifestModule {
  default: SubjectManifest;
}

/** Resolves all top-level subject manifests */
export async function getAllSubjects(): Promise<SubjectManifest[]> {
  const subjectList: SubjectManifest[] = [];

  for (const path in manifestRegistry) {
    const segments = path.split('/').filter(Boolean);
    const modIdx = segments.indexOf('modules');
    
    /** 
     * Identify subject manifest: 
     * Path: modules / category / subject / manifest.json
     */
    if (modIdx !== -1 && segments.length === modIdx + 4) {
      const loader = manifestRegistry[path] as () => Promise<ManifestModule>;
      const mod = await loader();
      if (mod.default) subjectList.push(mod.default);
    }
  }

  return subjectList.sort((a, b) => a.order - b.order);
}

/** Resolves a specific subject manifest */
export async function getSubjectManifest(subjectId: string): Promise<SubjectManifest> {
  const subjects = await getAllSubjects();
  const target = subjects.find((s) => s.id === subjectId);

  if (!target) {
    throw new Error(`Subject [${subjectId}] not found in knowledge graph.`);
  }

  return target;
}

/** Crawls the system to provide static params for subject routes */
export async function getSubjectPaths() {
  const subjects = await getAllSubjects();
  return subjects.map(s => ({ params: { subjectId: s.id } }));
}
