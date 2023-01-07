import type { Behavior } from "./behavior"
import { noop } from "./noop"

export const setHasPopup = (): Behavior => node => {
  node.setAttribute('aria-haspopup', 'true')
  return noop
}
