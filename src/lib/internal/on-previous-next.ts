import type { Behavior } from "./behavior"
import { Keys } from "./keys"

export function onPreviousNext(fnPrevious: () => void, fnNext: () => void): Behavior {
  return node => {
    function handler(event: KeyboardEvent) {
      switch (event.key) {
        case Keys.ArrowUp:
          event.preventDefault()
          event.stopPropagation()
          fnPrevious()
          break
        case Keys.ArrowDown:
          event.preventDefault()
          event.stopPropagation()
          fnNext()
          break
      }
    }

    node.addEventListener('keydown', handler)

    return () => node.removeEventListener('keydown', handler)
  }
}