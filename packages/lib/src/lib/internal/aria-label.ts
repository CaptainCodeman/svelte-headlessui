import type { Behavior } from "./behavior"
import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeString } from "./aria-attribute"

export interface Labelable {
  label?: string
}

export const setAriaLabel = setAriaAttributeString('aria-label')

export const reflectAriaLabel = (store: Readable<Labelable>): Behavior => node => derived(store, $store => $store.label).subscribe(setAriaLabel(node))
