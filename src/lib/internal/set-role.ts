import { noopUnsubscribe, type Behavior } from "./behavior"
import { hasOwnProperty } from "./properties"

export const setRole = (role: string): Behavior => node => {
  if (hasOwnProperty(node, 'role')) {
    node.role = role
  }
  return noopUnsubscribe
}
