import type { Behavior } from "./behavior"
import { derived, type Readable } from 'svelte/store'
import type { Selectable } from "./aria-selected"
import type { Expandable } from "./aria-expanded"

export const setInputValue = (node: HTMLInputElement) => (value?: string) => {
  if (value) {
    node.value = value
  }
}

export const reflectSelectedValueOnClose = (store: Readable<Selectable & Expandable>, selector: (value: any) => string): Behavior => node => derived(store, $store => $store.expanded ? null : $store.selected).subscribe(value => setInputValue(node as HTMLInputElement)(selector(value)))
