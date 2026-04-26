import React, { useState, useEffect, useRef, Suspense } from 'react';
import { SimulatorSkeleton } from '../ui/SimulatorSkeleton';

interface Props {
  name: string;
  loader: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>;
  props: Record<string, unknown>;
}

/** 
 * Higher-Order Component that implements anticipatory hydration based on scroll proximity.
 */
export const LazySimulatorBoundary: React.FC<Props> = ({ name, loader, props }) => {
  const [Component, setComponent] = useState<React.ComponentType<Record<string, unknown>> | null>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50% 0% 50% 0%' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !Component) {
      loader().then((mod) => setComponent(() => mod.default));
    }
  }, [isInView, loader, Component]);

  return (
    <div ref={containerRef} className="simulator-boundary min-h-[50px]">
      {Component ? (
        <Suspense fallback={<SimulatorSkeleton name={name} />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <SimulatorSkeleton name={name} />
      )}
    </div>
  );
};
