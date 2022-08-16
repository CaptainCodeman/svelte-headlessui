import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'

export interface Expandable {
  expanded: boolean
}

export const setAriaExpanded = setAriaAttributeBoolean('aria-expanded')

export const reflectAriaExpanded = (store: Readable<Expandable>): Behavior => node => derived(store, $store => $store.expanded).subscribe(setAriaExpanded(node))
