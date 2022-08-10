import type { Behavior } from "./behavior"

export function onClickOutside(fn: () => void): Behavior {
  return node => {
    function handler(event: Event) {
      if (node && !node.contains(event.target as Node)) {
        fn()
      }
    }

    document.addEventListener('click', handler, true)

    return () => document.removeEventListener('click', handler, true)
  }
}
