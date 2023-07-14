import type { Behavior } from "./behavior"
import { listener } from "./events"

export function onClickOutside(fn: (event: Event) => void, preventPropagation?: (target: HTMLElement) => boolean | undefined): Behavior {
  return node => {
    let initial: Node | null = null

    function handler(event: Event) {
      if ((event as PointerEvent).pointerType === '') return // ignore space as click
      if (initial && !node.contains(initial)) {
        if (node.clientWidth) {
          if (preventPropagation) {
            // prevent event propagation if clicked element is contained within specified elements
            // this is to avoid clicking a menu button, which is outside the menu list, and having
            // the menu close and then immediately re-open (one example)
            if (event.target instanceof HTMLElement) {
              if (preventPropagation(event.target)) {
                event.stopImmediatePropagation()
              }
            }
          }
          event.preventDefault()
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
