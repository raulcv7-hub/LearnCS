import { LazySimulatorBoundary } from '@components/system/LazySimulatorBoundary';
import React from 'react';
import { globalComponentRegistry, simulatorRegistry } from './registry';

interface ComponentModule {
  default: React.ComponentType<any>;
}

/** 
 * Orchestrates the injection of Local Simulators and the Global Standard Library.
 * Ensures components like InternalPreview are available without MDX imports.
 */
export async function getSimulatorComponents(subjectId: string, lessonId: string) {
  const registry: Record<string, React.ComponentType<any>> = {};

  /** 1. AAU Local & Subject Shared Discovery */
  const localPattern = `${subjectId}/${lessonId}/local_simulators/`;
  const sharedPattern = `${subjectId}/_shared_simulators/`;

  for (const path in simulatorRegistry) {
    const normalized = path.replace(/\\/g, '/');
    if (normalized.includes(localPattern) || normalized.includes(sharedPattern)) {
      const segments = normalized.split('/');
      const componentName = segments[segments.length - 2];

      if (normalized.endsWith('index.tsx') || normalized.endsWith(`${componentName}.tsx`)) {
        const loader = simulatorRegistry[path] as () => Promise<ComponentModule>;
        registry[componentName] = (props: any) => (
          React.createElement(LazySimulatorBoundary, { name: componentName, loader, props })
        );
      }
    }
  }

  /** 2. Global Standard Library Injection (InternalPreview, GlossaryTerm, etc.) */
  for (const path in globalComponentRegistry) {
    const componentName = path.split('/').pop()?.replace('.tsx', '') || '';
    if (componentName) {
      const loader = globalComponentRegistry[path] as () => Promise<ComponentModule>;
      const mod = await loader();
      registry[componentName] = mod.default;
    }
  }

  return registry;
}
