import { fireEvent, getByTestId, render } from "@testing-library/svelte";
import Control from './toggle-button.svelte'

test('something', async () => {
  const { container, getByText } = render(Control, { label: 'Play Music' });

  let pre = getByTestId(container, 'debug')
  let button = getByText('My Button')

  expect(pre).toBeInTheDocument()
  expect(pre).toHaveTextContent(`{ "label": "Play Music", "pressed": false }`)
  expect(button).toBeInTheDocument()
  expect(button).toHaveAttribute('aria-label', 'Play Music')
  expect(button).toHaveAttribute('aria-pressed', 'false')

  await fireEvent.click(button)

  expect(pre).toHaveTextContent(`{ "label": "Play Music", "pressed": true }`)
  expect(button).toHaveAttribute('aria-pressed', 'true')
})