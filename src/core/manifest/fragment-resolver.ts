import type { Locale } from '@core/domain/types';
import type { ReactNode } from 'react';
import { fragmentRegistry } from './registry';

interface MdxModule {
  default: (props: Record<string, unknown>) => ReactNode;
}

/** Resolves and loads an MDX fragment component based on ID and Locale */
export async function getFragmentComponent(
  subjectId: string,
  lessonId: string,
  fragmentId: string,
  lang: Locale = 'en'
) {
  let path = Object.keys(fragmentRegistry).find((p) =>
    p.includes(`/${subjectId}/${lessonId}/fragments/${fragmentId}.${lang}.mdx`)
  );

  if (!path) {
    path = Object.keys(fragmentRegistry).find((p) =>
      p.includes(`/${subjectId}/${lessonId}/fragments/${fragmentId}.en.mdx`) ||
      p.includes(`/${subjectId}/${lessonId}/fragments/${fragmentId}.mdx`)
    );
  }

  if (!path) throw new Error(`Fragment [${fragmentId}] missing in ${subjectId}/${lessonId}`);

  const loader = fragmentRegistry[path];
  const mod = (await loader()) as unknown as MdxModule;
  return mod.default;
}
