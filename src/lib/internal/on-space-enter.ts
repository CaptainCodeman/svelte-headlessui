import type { Behavior } from "./behavior"
import { Keys } from "./keys"

export function onSpaceEnter(fn: () => void): Behavior {
  return node => {
    function handler(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.Space:
        case Keys.Enter:
          event.preventDefault()
          fn()
          break
      }
    }

    node.addEventListener('keydown', handler)

    return () => node.removeEventListener('keydown', handler)
  }
}