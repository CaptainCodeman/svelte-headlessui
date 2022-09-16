import { noopUnsubscribe, type Behavior } from "./behavior"
import { hasOwnProperty } from "./properties"

export const setDisabled = (disabled: boolean): Behavior => node => {
  if (hasOwnProperty(node, 'disabled')) {
    node.disabled = disabled
  }
  return noopUnsubscribe
}
