import type { Behavior } from "./behavior"
import { hasOwnProperty } from "./properties"

export function setRole(role: string): Behavior {
  return node => {
    if (hasOwnProperty(node, 'role')) {
      node.role = role
    }
  }
}