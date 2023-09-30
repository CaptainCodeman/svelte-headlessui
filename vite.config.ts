import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			'svelte-doc-kit',
			'unified',
			'remark-parse',
			'remark-gfm',
			'remark-frontmatter',
			'remark-directive',
			'remark-rehype',
			'remark-gemoji',
			'remark-github',
			'rehype-highlight',
			'rehype-stringify',
			'rehype-preset-minify',
			'rehype-raw',
			'vfile-matter',
			'unist-util-visit',
			'hastscript',
			'lowlight',
		]
	}
})
