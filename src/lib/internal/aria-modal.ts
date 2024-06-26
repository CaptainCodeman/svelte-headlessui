import { derived, type Readable } from './store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'
import type { Expandable } from './aria-expanded'

export const setAriaModal = setAriaAttributeBoolean('aria-modal')

export const reflectAriaModal =
	(store: Readable<Expandable>): Behavior =>
	(node) =>
		derived(store, ($store) => $store.expanded).subscribe(setAriaModal(node))
