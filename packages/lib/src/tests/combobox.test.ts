
import { fireEvent, getByRole, getByTestId, render } from "@testing-library/svelte";
import Control from './menu.svelte'

test('combobox', () => {
  // const { container, getByRole } = render(Control);

  // let pre = getByTestId(container, 'debug')
  // let button = getByRole('button')

  // expect(pre).toBeInTheDocument()
  // expect(pre).toHaveTextContent(`{ "active": -1, "expanded": false }`)
})

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