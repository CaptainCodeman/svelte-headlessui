import { derived, type Readable } from './store'
import { setAriaAttributeBoolean } from './aria-attribute'
import type { Behavior } from './behavior'
import type { List } from './list'

export const setAriaDisabled = setAriaAttributeBoolean('aria-disabled')

export const reflectAriaDisabled = (store: Readable<List>): Behavior => node => derived(store, $store => $store.items.find(item => item.id === node.id)?.disabled).subscribe(setAriaDisabled(node))
