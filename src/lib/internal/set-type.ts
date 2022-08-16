import type { Behavior } from "./behavior"
import { hasOwnProperty } from "./properties"

export const setType = (type: string): Behavior => node => {
  if (hasOwnProperty(node, 'type')) {
    node.type = type
  }
}
