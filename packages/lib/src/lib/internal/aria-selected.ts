import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'

// TODO: enforce that it has to extend list (?)
export interface Selectable {
  selected: any
}

export const defaultSelected: Selectable = {
  selected: null
}

export const setAriaSelected = setAriaAttributeBoolean('aria-selected')

export const reflectAriaSelected = (store: Readable<Selectable>, value: any): Behavior => node => derived(store, $store => $store.selected === value).subscribe(setAriaSelected(node))
