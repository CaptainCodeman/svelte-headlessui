import type { Behavior } from "./behavior"
import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeString } from "./aria-attribute"

export interface Controllable {
  controls?: string
}

export const setAriaControls = setAriaAttributeString('aria-controls')

export const reflectAriaControls = (store: Readable<Controllable>): Behavior => node => derived(store, $store => $store.controls).subscribe(setAriaControls(node))
