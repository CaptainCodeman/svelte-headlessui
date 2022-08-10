import type { Behavior } from "./behavior"
import type { Readable } from 'svelte/store'

export interface Labelable {
  label: string
}

export function ariaLabel(store: Readable<Labelable>): Behavior {
  return node => store.subscribe(state => {
    if (state.label) {
      node.setAttribute('aria-label', state.label)
    } else {
      node.removeAttribute('aria-label')
    }
  })
}