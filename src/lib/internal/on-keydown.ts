import type { Behavior } from "./behavior"
import type { KeyHandler } from "./keys"

export function onKeydown(...handlers: KeyHandler[]): Behavior {
  const handler = (event: KeyboardEvent) => {
    for (const handler of handlers) {
      if (handler(event.key)) {
        event.preventDefault()
        event.stopPropagation()
        return
      }
    }
  }

  return node => {
    node.addEventListener('keydown', handler)
    return () => node.removeEventListener('keydown', handler)
  }
}
