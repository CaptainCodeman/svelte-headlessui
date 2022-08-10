import type { Behavior } from "./behavior"

// TODO: change based on disabled
export function setTabIndex(): Behavior {
  return node => {
    node.tabIndex = 0
  }
}