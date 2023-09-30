const typography = require('@tailwindcss/typography')
const forms = require('@tailwindcss/forms')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts,md}',
		'./node_modules/svelte-doc-kit/dist/**/*.{html,js,svelte,ts,md}',
	],

	darkMode: 'class',

	theme: {
		extend: {},
	},

	plugins: [forms, typography],
}

module.exports = config
