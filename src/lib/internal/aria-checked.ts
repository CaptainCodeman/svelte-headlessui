import type { Behavior } from './behavior'
import { derived, type Readable } from './store'
import { setAriaAttributeBoolean } from './aria-attribute'

export interface Checkable {
	checked: boolean
}

export const defaultCheckable: Checkable = {
	checked: false,
}

export const setAriaChecked = setAriaAttributeBoolean('aria-checked')

export const reflectAriaChecked =
	(store: Readable<Checkable>): Behavior =>
	(node) =>
		derived(store, ($store) => $store.checked).subscribe(setAriaChecked(node))
