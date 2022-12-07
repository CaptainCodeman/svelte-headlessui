import type { Behavior } from "./behavior"
import { listener } from "./events"

export function onClickOutside(fn: (event: Event) => void, when?: () => boolean): Behavior {
  return node => {
    function handler(event: Event) {
      if ((event as PointerEvent).pointerType === '') return // ignore space as click
      if (!when || when()) {
        if (node && !node.contains(event.target as Node)) {
          if (node.clientWidth) {
            event.preventDefault()
            event.stopPropagation()
            fn(event)
          }
        }
      }
    }

    return listener(document.documentElement, 'click', handler, true)
  }
}
