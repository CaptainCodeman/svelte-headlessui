import type { Behavior } from "./behavior"
import type { Readable, Writable } from 'svelte/store'

export interface Pressable {
  pressed: boolean
}

export function ariaPressed(store: Readable<Pressable>): Behavior {
  return node => store.subscribe(state => {
    node.setAttribute('aria-pressed', state.pressed.toString())
  })
}

export function togglePressed(store: Writable<Pressable>) {
  return () => store.update(state => ({ ...state, pressed: !state.pressed }))
}