import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

/** 
 * Astro configuration with explicit pathing for externalized tooling configs.
 * Site and Base are configured for GitHub Pages deployment.
 */
export default defineConfig({
  site: 'https://raulcv7-hub.github.io',
  base: '/LearnCS/',
  integrations: [
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
      configFile: './config/tailwind.config.mjs'
    })
  ],
  output: 'static',
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@core': '/src/core',
        '@components': '/src/components',
        '@styles': '/src/styles',
        '@layouts': '/src/layouts',
        '@modules': '/modules',
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  },
});
