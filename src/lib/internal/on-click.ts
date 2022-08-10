import type { Behavior } from "./behavior"

export function onClick(fn: () => void): Behavior {
  return node => {
    node.addEventListener('click', fn)
    return () => node.removeEventListener('click', fn)
  }
}