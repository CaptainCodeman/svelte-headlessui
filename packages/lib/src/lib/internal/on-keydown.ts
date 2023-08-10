import type { Behavior } from "./behavior"
import type { KeyHandler } from "./key-handler"

export function onKeydown(...handlers: KeyHandler[]): Behavior {
  const handler = (event: KeyboardEvent) => {
    for (const handler of handlers) {
      handler(event)
    }
  }

  return node => {
    node.addEventListener('keydown', handler)
    return () => node.removeEventListener('keydown', handler)
  }
}
