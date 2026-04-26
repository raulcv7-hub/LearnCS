import type { LessonManifest, Locale } from '@core/domain/types';
import { getLessonManifest, getLocalizedStr } from '@core/manifest/lesson-resolver';
import { getDifficultyColorKey } from '@core/styles/theme-utils';
import { resolvePath } from '@core/utils/path-utils';
import { useEffect, useState } from 'react';
import { Badge, type BadgeColor } from '../ui/Badge';

interface Props {
  subjectId: string;
  lessonId: string;
  lang?: Locale;
}

/** 
 * Descriptive Link to other Knowledge Units.
 * Features asynchronous manifest resolution with graceful error fallbacks.
 */
const InternalPreview: React.FC<Props> = ({ subjectId, lessonId, lang = 'en' }) => {
  const [manifest, setManifest] = useState<LessonManifest | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    getLessonManifest(subjectId, lessonId)
      .then((m) => {
        if (isMounted) setManifest(m);
      })
      .catch((err) => {
        console.error(`Bridge resolution failed for ${subjectId}/${lessonId}`, err);
        if (isMounted) setError(true);
      });

    return () => { isMounted = false; };
  }, [subjectId, lessonId]);

  if (error) {
    return (
      <div className="my-8 rounded-[24px] border-2 border-dashed border-rose-500/20 bg-rose-500/5 p-6">
        <span className="hd-meta text-[10px] text-rose-500">
          Knowledge Connection Missing: {subjectId}/{lessonId}
        </span>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="bg-blueprint-bg/20 my-8 flex h-32 items-center justify-center rounded-[24px] border-2 border-dashed border-border-color">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-color-accent h-1.5 w-12 animate-pulse rounded-full opacity-30"></div>
          <span className="hd-meta text-[10px] opacity-40">Synchronizing Bridge...</span>
        </div>
      </div>
    );
  }

  const title = getLocalizedStr(manifest.title, lang);
  const href = resolvePath(`/subject/${subjectId}/${lessonId}`, lang);
  const colorKey = getDifficultyColorKey(manifest.metadata.difficulty) as BadgeColor;

  return (
    <a href={href} className="group my-8 block rounded-[24px] border-2 border-border-color bg-blueprint-bg/30 p-6 transition-all hover:border-color-accent/40 hover:bg-blueprint-surface hover:shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[12px] font-black uppercase tracking-[0.2em] text-color-accent">
          Sequential Module
        </span>
        <Badge color={colorKey}>{manifest.metadata.difficulty}</Badge>
      </div>
      <h4 className="text-text-main mb-2 text-xl font-black tracking-tighter group-hover:text-color-accent transition-colors">
        {title}
      </h4>
      <p className="text-text-muted text-sm font-medium leading-relaxed opacity-80">
        Discover more about {title.toLowerCase()} in the next engineering unit.
      </p>
    </a>
  );
};

InternalPreview.displayName = 'InternalPreview';
export default InternalPreview;
