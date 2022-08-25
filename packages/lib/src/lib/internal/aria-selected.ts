import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'

// TODO: enforce that it has to extend list (?)
export interface Selectable {
  selected: number
}

export const defaultSelected: Selectable = {
  selected: -1
}

export const setAriaSelected = setAriaAttributeBoolean('aria-selected')

export const reflectAriaSelected = (store: Readable<Selectable>, index: number): Behavior => node => derived(store, $store => $store.selected === index).subscribe(setAriaSelected(node))
