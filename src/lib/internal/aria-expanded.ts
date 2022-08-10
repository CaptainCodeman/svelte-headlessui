import type { Behavior } from "./behavior"
import type { Readable, Writable } from 'svelte/store'

export interface Expandable {
  expanded: boolean
}

export function ariaExpanded(store: Readable<Expandable>): Behavior {
  return node => store.subscribe(state => {
    node.setAttribute('aria-expanded', state.expanded.toString())
  })
}

export function toggleExpanded(store: Writable<Expandable>) {
  return () => store.update(state => ({ ...state, expanded: !state.expanded }))
}