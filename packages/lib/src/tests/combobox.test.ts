import { expect, test } from '@playwright/experimental-ct-svelte';
import Control from './combobox.svelte';

test.describe('combobox', async () => {
	test('has an accessible name', async ({ mount }) => {
		const component = await mount(Control);
		const combobox = component.getByRole('combobox', { name: 'My Combobox' });
		await expect(combobox).toBeVisible();
	});

	test('focuses the input when clicked', async ({ mount }) => {
		const component = await mount(Control);
		const combobox = component.getByRole('combobox');

		await combobox.click();

		const input = component.locator('input');
		await expect(input).toBeFocused();
	});

	test('expands the list and focuses the input when button is clicked', async ({
		mount,
	}) => {
		const component = await mount(Control);
		const button = component.getByRole('button');
		await button.click();
		const combobox = component.getByRole('combobox', { expanded: true });
		await expect(combobox).toBeVisible();
		const input = component.locator('input');
		await expect(input).toBeFocused();
	});

	test('opens menu and focuses selected item when up or down is pressed', async ({
		mount,
	}) => {
		const component = await mount(Control);
		const comboboxClosed = component.getByRole('combobox', { expanded: false });

		await comboboxClosed.press('ArrowDown');
		await comboboxClosed.click();

		const comboboxOpen = component.getByRole('combobox', { expanded: true });
		await expect(comboboxOpen).toBeVisible();
		const item = component.getByRole('option').first();
		await expect(item).toBeInViewport();
		await expect(item).toBeFocused();
	});
});

/*
unit tests:

when combobox unexpanded
- clicking the input focuses it
- clicking the button expands the list and focuses the input

  when input focused
  - pressing up or down opens menu and focuses selected item
  - pressing space A-Z 0-9 types into the input box and expands the menu

when combobox expanded
- clicking the button closes the combobox
- clicking outside of the list closes the combobox
- pressing escape closes the combobox
- pressing up focuses previous non-disabled item
- pressing down focuses next non-disabled item
- pressing home focuses first non-disabled item
- pressing end focuses last non-disabled item
- pressing enter activates the current item
- pressing space A-Z 0-9 types into the input box
- type list is filtered to what is typed into the input*

*if it's expanded, but nothing has been typed, the list is _not_ filtered to just the current value

when the list is filtered
- the previously selected item remains selected and highlighted if included in the list
- the first item is highlighted if the selected item is not included in the list
*/
