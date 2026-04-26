import { updateSectionProgress } from '@core/progress/progress-service';
import { useEffect, useState } from 'react';

/** 
 * Synchronizes scroll position with the sidebar's visual state.
 * Uses a viewport-relative threshold to determine active and passed fragments.
 */
export const useActiveSectionTracker = (isActive: boolean, lessonId: string, fragments: string[]) => {
  const [activeId, setActiveId] = useState('');
  const [passedIds, setPassedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!isActive) return;

    /** 
     * Calculates current scroll status across all fragments.
     * Uses a 150px offset from the top to trigger the 'Active' state (Blue).
     */
    const handleScroll = () => {
      let activeIndex = -1;
      const passed: string[] = [];

      fragments.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top < 150) {
          activeIndex = index;
        }
      });

      if (activeIndex !== -1) {
        const currentActive = fragments[activeIndex];
        setActiveId(currentActive);

        for (let i = 0; i < activeIndex; i++) {
          passed.push(fragments[i]);
        }

        setPassedIds(passed);
        if (passed.length > 0) updateSectionProgress(lessonId, passed);
      } else {
        setActiveId('');
        setPassedIds([]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isActive, lessonId, fragments]);

  return { activeId, passedIds };
};
