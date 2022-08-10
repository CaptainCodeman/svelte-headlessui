import type { Behavior } from "./behavior"

export function setHasPopup(): Behavior {
  return node => {
    node.setAttribute('aria-haspopup', 'true')
  }
}