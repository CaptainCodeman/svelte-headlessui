import type { Behavior } from "./behavior"
import type { Readable, Writable } from 'svelte/store'

export interface Checkable {
  checked: boolean
}

export function ariaChecked(store: Readable<Checkable>): Behavior {
  return node => store.subscribe(state => {
    node.setAttribute('aria-checked', state.checked.toString())
  })
}

export function toggleChecked(store: Writable<Checkable>) {
  return () => store.update(state => ({ ...state, checked: !state.checked }))
}