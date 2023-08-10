import type { Behavior } from "./behavior"

export interface ItemOptions {
  value?: any
  disabled?: boolean
}

export interface ListItem {
  id: string
  text: string
  value: any
  disabled: boolean
}

export interface List {
  items: ListItem[]
  active: number
}

export const defaultList = () => ({
  items: [],
  active: -1,
} as List)


export function onDestroy(fn: (node: HTMLElement) => void): Behavior {
  return node => () => fn(node)
}

export const removeItem = (state: List, node: HTMLElement) => {
  return {
    items: state.items.filter(item => item.id !== node.id)
  }
}

export const active = (state: List) => state.active === -1 || state.items.length === 0 ? undefined : state.active >= state.items.length ? state.items[state.active] : state.items[state.active].value

export const activate = (selector: string, focus: (node: HTMLElement | null) => void, ...actions: Function[]) => (event: Event) => {
  const el = (event.target as Element).closest(selector)
  focus(el as HTMLElement)
  actions.forEach(action => action())
}

export function onSelect(state: List, node?: HTMLElement) {
  if (state.active === -1 || state.items[state.active].disabled) return {}
  const selected = active(state)
  if (node) {
    const event = new CustomEvent('select', {
      detail: {
        selected,
      }
    })
    node.dispatchEvent(event)
  }
  return { selected, active: -1 }
}

export function getItemValues(node: HTMLElement, options?: ItemOptions) {
  const text = node.textContent?.trim() ?? ''
  return {
    text,
    value: options?.value,
    disabled: options?.disabled ?? false
  }
}

// return index of first non-disabled item
export const firstActive = (state: List) => state.items.findIndex(item => !item.disabled)

// return index of previous non-disabled item
export const previousActive = (state: List) => {
  let x = state.active === -1 ? state.items.length : state.active
  while (--x > -1) {
    if (!state.items[x].disabled) {
      return x
    }
  }
  return state.active
}

// return index of next non-disabled item
export const nextActive = (state: List) => {
  let x = state.active
  while (++x < state.items.length) {
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
export function findLastIndex<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l], l, array))
      return l;
  }
  return -1;
}

export const getUpdater = (node: HTMLElement, getState: () => List, setState: (part: Partial<List>) => void) => (options?: ItemOptions) => {
  const state = getState()
  const values = getItemValues(node, options)
  const item = state.items.find(item => item.id === node.id)
  if (item) {
    if (item.text === values.text && item.value === values.value && item.disabled === values.disabled) return
    Object.assign(item, values)
  } else {
    state.items.push({ id: node.id, ...values })
  }
  setState({ items: state.items })
}

export const getFocuser = (getState: () => List, focus: (active: number) => void) => (node: HTMLElement | null) => {
  const state = getState()
  focus(node ? state.items.findIndex(item => item.id === node.id && !item.disabled) : -1)
}

export const getSearch = (getState: () => List, focus: (active: number) => void) => (query: string) => {
  const state = getState()
  const searchable = state.active === -1
    ? state.items
    : state.items
      .slice(state.active + 1)
      .concat(state.items.slice(0, state.active + 1))

  const re = new RegExp(`^${query}`, 'i')
  const found = searchable.findIndex(x => x.text.match(re) && !x.disabled)

  if (found > -1) {
    const index = (found + state.active + 1) % state.items.length
    focus(index)
  }
}
