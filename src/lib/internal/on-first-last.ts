import type { Behavior } from "./behavior"
import { Keys } from "./keys"

export function onFirstLast(fnFirst: () => void, fnLast: () => void): Behavior {
  const handler = (event: KeyboardEvent) => {
    switch (event.key) {
      case Keys.Home:
      case Keys.PageUp:
        event.preventDefault()
        event.stopPropagation()
        fnFirst()
        break
      case Keys.End:
      case Keys.PageDown:
        event.preventDefault()
        event.stopPropagation()
        fnLast()
        break
    }
  }

  return node => {
    node.addEventListener('keydown', handler)
    return () => node.removeEventListener('keydown', handler)
  }
}
