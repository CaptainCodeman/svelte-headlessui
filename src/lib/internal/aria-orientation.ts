import type { Behavior } from './behavior'
import { derived, type Readable } from './store'
import { setAriaAttributeString } from './aria-attribute'

export type Orientation = 'horizontal' | 'vertical'

export interface Orientable {
	orientation: Orientation
}

export const defaultOrientation: Orientable = {
	orientation: 'horizontal',
}

export const setAriaOrientation = setAriaAttributeString('aria-oriantation')

export const reflectAriaOrientation =
	(store: Readable<Orientable>): Behavior =>
	(node) =>
		derived(store, ($store) => $store.orientation).subscribe(setAriaOrientation(node))
