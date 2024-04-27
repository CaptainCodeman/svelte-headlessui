import { derived, type Readable } from './store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'

// TODO: enforce that it has to extend list (?)
export interface Selectable {
	selected: any
	multi: boolean
}

export const defaultSelected: Selectable = {
	selected: null,
	multi: false,
}

export const setAriaSelected = setAriaAttributeBoolean('aria-selected')
export const setAriaMultiselectable = setAriaAttributeBoolean('aria-multiselectable')

export const reflectAriaSelected =
	(store: Readable<Selectable>, value: any): Behavior =>
	(node) =>
		derived(store, ($store) =>
			$store.multi ? $store.selected.includes(value) : $store.selected === value,
		).subscribe(setAriaSelected(node))

export const reflectAriaMultiselectable =
	(store: Readable<Selectable>): Behavior =>
	(node) =>
		derived(store, ($store) => $store.multi).subscribe(setAriaMultiselectable(node))
