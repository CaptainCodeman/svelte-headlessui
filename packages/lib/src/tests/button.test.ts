import { expect, test } from '@playwright/experimental-ct-svelte';
import Control from './button.svelte';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
	const component = await mount(Control, {
		props: { label: 'Hello world!' },
	});
	await expect(component.getByText('Hello world!')).toBeVisible();
});

test('has the correct aria attributes', async ({ mount }) => {
	const component = await mount(Control, { props: { label: 'Play Music' } });

	const unpressed = component.getByRole('button', {
		name: 'Play Music',
		pressed: false,
	});

	const pressed = component.getByRole('button', {
		name: 'Play Music',
		pressed: true,
	});

	await expect(unpressed).toBeVisible();
	await expect(pressed).toBeHidden();
	await unpressed.click();
	await expect(unpressed).toBeHidden();
	await expect(pressed).toBeVisible();
});
