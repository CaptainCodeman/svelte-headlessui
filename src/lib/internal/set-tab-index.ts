import type { Behavior } from "./behavior"
import { noop } from "./noop"

// TODO: change based on disabled
export const setTabIndex = (index = -1): Behavior => node => {
  node.tabIndex = index
  return noop
}
