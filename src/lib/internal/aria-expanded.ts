import { derived, type Readable } from './store'
import { setAriaAttributeBoolean } from './aria-attribute'
import { setFocus } from './focus'
import type { Behavior } from './behavior'

export interface Expandable {
  expanded: boolean
  opened: boolean // flag if it's ever been opened, to prevent initial focus being set when closed
}

export const defaultExpanded: Expandable = {
  expanded: false,
  opened: false,
}

export const setAriaExpanded = setAriaAttributeBoolean('aria-expanded')

export const reflectAriaExpanded = (store: Readable<Expandable>): Behavior => node => derived(store, $store => $store.expanded).subscribe(setAriaExpanded(node))

export const focusOnExpanded = (store: Readable<Expandable>): Behavior => node => derived(store, $store => $store.expanded).subscribe(setFocus(node))

export const focusOnClose = (store: Readable<Expandable>): Behavior => node => derived(store, $store => $store.opened && !$store.expanded).subscribe(setFocus(node))
