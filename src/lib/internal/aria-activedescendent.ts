import { derived, type Readable } from 'svelte/store'
import { setAriaAttributeString } from './aria-attribute'
import type { Behavior } from './behavior'
import type { List } from './list'

export const setAriaActivedescendent = setAriaAttributeString('aria-activedescendant')

export const reflectAriaActivedescendent = (store: Readable<List>): Behavior => node => derived(store, $store => $store.items[$store.active]?.id).subscribe(setAriaActivedescendent(node))
