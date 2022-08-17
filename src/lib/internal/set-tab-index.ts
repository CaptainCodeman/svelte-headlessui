import { noopUnsubscribe, type Behavior } from "./behavior"

// TODO: change based on disabled
export const setTabIndex = (index: number = -1): Behavior => node => {
  node.tabIndex = index
  return noopUnsubscribe
}
