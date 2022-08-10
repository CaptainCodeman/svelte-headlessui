import type { Behavior } from "./behavior"
import { hasOwnProperty } from "./properties"

// TODO: change based on disabled
export function setType(type: string): Behavior {
  return node => {
    if (hasOwnProperty(node, 'type')) {
      node.type = type
    }
  }
}