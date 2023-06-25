import type { Behavior } from "./behavior"
import { listener } from "./events"

export function onClickOutside(fn: (event: Event) => void): Behavior {
  return node => {
    let initial: Node | null = null

    function handler(event: Event) {
      if ((event as PointerEvent).pointerType === '') return // ignore space as click
      if (initial && !node.contains(initial)) {
        if (node.clientWidth) {
          event.preventDefault()
          event.stopPropagation()
          fn(event)
        }
      }
      initial = null
    }

    function setInitial(event: PointerEvent) {
      if (event.isPrimary) {
        initial = event.target as Node
      }
    }

    const listeners = [
      listener(document.documentElement, 'pointerdown', setInitial, true),
      listener(document.documentElement, 'click', handler, true),
    ]

    return () => listeners.forEach(listener => listener())
  }
}
