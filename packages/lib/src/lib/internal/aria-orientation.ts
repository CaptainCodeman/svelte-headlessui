import type { Behavior } from "./behavior"
import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeString } from "./aria-attribute"

export interface Orientable {
  orientation: 'horizontal' | 'vertical'
}

export const defaultOrientation: Orientable = {
  orientation: 'horizontal'
}

export const setAriaOrientation = setAriaAttributeString('aria-oriantation')

export const reflectAriaOrientation = (store: Readable<Orientable>): Behavior => node => derived(store, $store => $store.orientation).subscribe(setAriaOrientation(node))
