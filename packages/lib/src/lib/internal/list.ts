import type { Writable } from "svelte/store"
import type { Behavior } from "./behavior"

export interface ItemOptions {
  value?: string
  disabled?: boolean
}

export interface ListItem {
  id: string
  value: string
  disabled: boolean
}

export interface List {
  items: ListItem[]
  active: number
  value: string
}

export const defaultList: List = {
  items: [],
  active: -1,
  value: ''
}

export const removeOnDestroy = (store: Writable<List>): Behavior => node => {
  return () => store.update(state => ({ ...state, items: state.items.filter(item => item.id === node.id) }))
}

export function getItemValues(node: HTMLElement, options?: ItemOptions) {
  return {
    value: options?.value ?? node.textContent!.trim(),
    disabled: options?.disabled ?? true
  }
}
