import { expect, test } from '@playwright/experimental-ct-svelte';
import Control from './menu.svelte';

test.fixme('menu', async ({ mount }) => {
	const component = await mount(Control);

	let pre = component.getByTestId('debug');
	let button = component.getByRole('button');

	await expect(pre).toBeVisible();
	// expect(pre).toHaveTextContent(`{ "active": -1, "expanded": false }`);
	// expect(button).toBeInTheDocument()
	// expect(button).toHaveAttribute('aria-label', 'Play Music')
	// expect(button).toHaveAttribute('aria-pressed', 'false')

	// await fireEvent.click(button)

	// expect(pre).toHaveTextContent(`{ "label": "Play Music", "pressed": true }`)
	// expect(button).toHaveAttribute('aria-pressed', 'true')
});

// test('shit works', async () => { })

/*
unit tests:

when menu unexpanded
- clicking the menu button expands the menu list
- clicking the menu button focuses the menu list

  when menu focused
  - pressing enter or space expands the menu and focuses first non-disabled item
  - pressing down opens menu and focuses first non-disabled menu item
  - pressing up opens menu and focuses last non-disabled menu item

when menu expanded
- clicking the menu button closes the menu list
- clicking the menu button focuses the menu button
- clicking outside of the menu list closes the menu
- pressing escape closes the menu
- pressing up focuses previous non-disabled item
- pressing down focuses next non-disabled item
- pressing home focuses first non-disabled item
- pressing end focuses last non-disabled item
- pressing enter or space activates the current menu item
- pressing A-Z 0-9 focuses first item that matches input with wrap-around

WIA-ARIA
- menu button has tabindex=0
- menu button has role="button"
- menu button has aria-expanded="true" when expanded
- menu button has aria-haspopup="true"
- menu button has aria-controls="menu list id"
- menu list has role="list"
- menu list has tabindex=-1
- menu list has aria-activedescendent="active menu item id"
- menu items have role="menuitem"
*/
