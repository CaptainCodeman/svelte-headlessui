import type { Behavior } from "./behavior"
import { noop } from "./noop"

export const setDisabled = (disabled: boolean): Behavior => node => {
  if (disabled) {
    node.setAttribute('disabled', '')
  } else {
    node.removeAttribute('disabled')
  }
  return noop
}
