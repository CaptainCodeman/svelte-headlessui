import { derived, type Readable } from './store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'

export interface Pressable {
	pressed: boolean
}

export const defaultPressable: Pressable = {
	pressed: false,
}

export const setAriaPressed = setAriaAttributeBoolean('aria-pressed')

export const reflectAriaPressed =
	(store: Readable<Pressable>): Behavior =>
	(node) =>
		derived(store, ($store) => $store.pressed).subscribe(setAriaPressed(node))
