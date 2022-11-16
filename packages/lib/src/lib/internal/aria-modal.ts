import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'
import type { Expandable } from './aria-expanded'

export const setAriaModal = setAriaAttributeBoolean('aria-modal')

export const reflectAriaModal = (store: Readable<Expandable>): Behavior => node => derived(store, $store => $store.expanded).subscribe(setAriaModal(node))

// TODO
export const trapFocusOnOpen = (store: Readable<Expandable>): Behavior => node => derived(store, $store => $store.expanded).subscribe(() => { })

// TODO
export const releaseFocusOnClose = (store: Readable<Expandable>): Behavior => node => derived(store, $store => !$store.expanded).subscribe(() => { })
