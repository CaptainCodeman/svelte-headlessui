/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict',
	],
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.lint.json',
		extraFileExtensions: ['.svelte'],
	},
	globals: {
		svelte: 'readonly',
		$$Generic: 'readonly',
	},
	ignorePatterns: ['src/routes/*', 'src/tests/*', '*.cjs'],
	overrides: [
		{
			files: ['*.svelte'],
			extends: ['plugin:svelte/recommended'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.svelte'],
				tsconfigRootDir: __dirname,
				project: './tsconfig.lint.json',
			},
			settings: {
				// https://ota-meshi.github.io/eslint-plugin-svelte/user-guide/#settings-svelte
				svelte: {
					ignoreWarnings: [
						'@typescript-eslint/no-unsafe-assignment', // reduce false positives
						'@typescript-eslint/no-unsafe-member-access', // reduce false positives
					],
				},
			},
			rules: {
				// incompatible with svelte's generic props
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',

				// not consistent in svelte files
				'@typescript-eslint/no-unsafe-argument': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unnecessary-condition': 'off',

				// Svelte
				'svelte/no-dupe-use-directives': 'error',
				'svelte/no-dom-manipulating': 'warn',
				'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
				'svelte/no-store-async': 'error',
				'svelte/require-store-callbacks-use-set-param': 'error',
				// 'svelte/valid-prop-names-in-kit-pages': 'error',
				'svelte/no-target-blank': 'error',
				'svelte/no-reactive-functions': 'error',
				'svelte/no-reactive-literals': 'error',
				'svelte/no-useless-mustaches': 'error',
				'svelte/require-optimized-style-attribute': 'error',
				'svelte/require-stores-init': 'error',

				'no-trailing-spaces': 'off', // superseded
				'svelte/no-trailing-spaces': 'error',

				// Stylistic
				'svelte/derived-has-same-inputs-outputs': 'error',
				// 'svelte/first-attribute-linebreak': 'error',
				'svelte/html-closing-bracket-spacing': 'error',
				'svelte/html-quotes': 'error',
				// 'svelte/max-attributes-per-line': 'error',
				'svelte/mustache-spacing': 'error',
				'svelte/no-extra-reactive-curlies': 'error',
				'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
				'svelte/prefer-class-directive': 'error',
				'svelte/prefer-style-directive': 'error',
				'svelte/shorthand-attribute': 'error',
				'svelte/shorthand-directive': 'error',
				// 'svelte/sort-attributes': 'error',
				'svelte/spaced-html-comment': 'error',
			},
		},
	],
}
