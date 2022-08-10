import type { Behavior } from "./behavior"
import { Keys } from "./keys"

export function onEscape(fn: () => void): Behavior {
  return node => {
    function handler(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.Escape:
          event.preventDefault()
          fn()
          break
      }
    }

    node.addEventListener('keydown', handler)

    return () => node.removeEventListener('keydown', handler)
  }
}