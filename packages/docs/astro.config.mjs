import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
// import react from '@astrojs/react'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	integrations: [
		preact(), // Enable Preact to support Preact JSX components.
		svelte(),
		mdx(),
		tailwind(),
	],
	site: `https://captaincodeman.github.io`,
	base: `/svelte-headlessui`,
	vite: {
		ssr: {
			noExternal: ['svelte-headlessui', 'svelte-transition'],
		},
	},
})
