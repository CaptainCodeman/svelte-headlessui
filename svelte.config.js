import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		alias: {
			'$docs': './src/docs',
			'svelte-headlessui': './src/lib',
		},

		adapter: adapter({
			strict: false,
		}),

		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
		},
	},
}

export default config;
