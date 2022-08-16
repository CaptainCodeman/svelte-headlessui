import type { Behavior } from "./behavior"

// TODO: change based on disabled
export const setTabIndex = (): Behavior => node => {
  node.tabIndex = 0
}
