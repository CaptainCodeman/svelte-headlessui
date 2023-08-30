import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/lib/index.ts'],
  format: ['esm'],
  external: ['svelte/store'],
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  dts: true,
})
