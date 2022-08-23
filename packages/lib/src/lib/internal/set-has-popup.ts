import { noopUnsubscribe, type Behavior } from "./behavior"

export const setHasPopup = (): Behavior => node => {
  node.setAttribute('aria-haspopup', 'true')
  return noopUnsubscribe
}
