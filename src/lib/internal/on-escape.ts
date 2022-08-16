import type { Behavior } from "./behavior"
import { Keys } from "./keys"

export function onEscape(fn: () => void): Behavior {
  const handler = (event: KeyboardEvent) => {
    switch (event.key) {
      case Keys.Escape:
        fn()
        break
    }
  }

  return node => {
    node.addEventListener('keydown', handler)
    return () => node.removeEventListener('keydown', handler)
  }
}
