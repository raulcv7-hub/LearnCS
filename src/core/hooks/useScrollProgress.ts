import { useEffect, useState } from 'react';

/** 
 * Computes the vertical scroll percentage of the current page.
 * Includes a throttle-like effect via passive event listening.
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height === 0) return setProgress(0);
      setProgress((winScroll / height) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
};
