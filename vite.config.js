import { defineConfig } from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [sveltekit()],
	build: {
		sourcemap: true,
	},
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['src/tests/setup'],
		coverage: {
			exclude: ['src/tests/**/*'],
		},
	},
})
