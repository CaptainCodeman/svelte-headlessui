import type { Behavior } from "./behavior"
import { Keys } from "./keys"

export function onSpaceEnter(fn: (event: Event) => void): Behavior {
  const handler = (event: KeyboardEvent) => {
    switch (event.key) {
      case Keys.Space:
      case Keys.Enter:
        event.preventDefault()
        fn(event)
        break
    }
  }

  return node => {
    node.addEventListener('keydown', handler)
    return () => node.removeEventListener('keydown', handler)
  }
}
