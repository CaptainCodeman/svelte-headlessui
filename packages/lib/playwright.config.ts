import { defineConfig, devices } from '@playwright/experimental-ct-svelte';
import { resolve } from 'node:path';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
	testDir: './src/tests',
	timeout: 10 * 1000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI
		? [['github'], ['html']]
		: [['html', { open: 'never' }]],
	use: {
		trace: 'retain-on-failure',
		video: 'retain-on-failure',
		ctPort: 3100,
		ctTemplateDir: './src/tests/boilerplate',
		ctViteConfig: {
			resolve: {
				alias: {
					$lib: resolve(__dirname, 'src/lib'),
				},
			},
		},
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
		{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
		{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
	],
});
