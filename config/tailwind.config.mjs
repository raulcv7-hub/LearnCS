/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'text-main': 'rgb(var(--text-main) / <alpha-value>)',
				'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
				'blueprint-bg': 'rgb(var(--blueprint-bg) / <alpha-value>)',
				'blueprint-surface': 'rgb(var(--blueprint-surface) / <alpha-value>)',
				'border-color': 'rgb(var(--border-color) / <alpha-value>)',
				'color-accent': 'rgb(var(--color-accent) / <alpha-value>)',
				'color-accent-text': 'rgb(var(--color-accent-text) / <alpha-value>)',
				'color-accent-dim': 'var(--color-accent-dim)',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			animation: {
				'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			keyframes: {
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(15px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': 'rgb(var(--text-muted))',
						'--tw-prose-headings': 'rgb(var(--text-main))',
						'--tw-prose-links': 'rgb(var(--color-accent))',
						'--tw-prose-bold': 'rgb(var(--text-main))',
						'--tw-prose-code': 'rgb(var(--color-accent-text))',
						'--tw-prose-pre-bg': 'rgb(var(--blueprint-surface))',
						'--tw-prose-quotes': 'rgb(var(--text-muted))',
					},
				},
			}),
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
