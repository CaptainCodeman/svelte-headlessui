import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/lib/index.ts'],
	format: ['esm'],
	external: ['svelte', 'svelte/store'],
	splitting: false,
	sourcemap: true,
	minify: true,
	clean: true,
	dts: true,
})
