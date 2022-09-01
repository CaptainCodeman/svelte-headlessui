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
    disabled: options?.disabled ?? false
  }
}

// return index of first non-disabled item
export const firstActive = (state: List) => state.items.findIndex(item => !item.disabled)

// return index of previous non-disabled item
export const previousActive = (state: List) => {
  let x = state.active === -1 ? state.items.length : state.active
  while (x-- && x > -1) {
    if (!state.items[x].disabled) {
      return x
    }
  }
  return state.active
}

// return index of next non-disabled item
export const nextActive = (state: List) => {
  let x = state.active
  while (++x && x < state.items.length) {
    if (!state.items[x].disabled) {
      return x
    }
  }
  return state.active
}

// return index of next non-disabled item
export const lastActive = (state: List) => findLastIndex(state.items, item => !item.disabled)

/**
* Returns the index of the last element in the array where predicate is true, and -1
* otherwise.
* @param array The source array to search in
* @param predicate find calls predicate once for each element of the array, in descending
* order, until it finds one where predicate returns true. If such an element is found,
* findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
*/
export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array))
      return l;
  }
  return -1;
}
