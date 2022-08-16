import type { Writable } from "svelte/store"
import type { Behavior } from "./behavior"
import { isCharacter } from "./is-character"
import type { List } from "./list"

export interface Searchable extends List {
  query: string
}

type SearchFn = (query: string) => void

export function onKeyboard(fn: SearchFn): Behavior {
  let timeout: number
  let query = ''

  const handler = (event: KeyboardEvent) => {
    if (isCharacter(event.key)) {
      if (timeout) {
        clearTimeout(timeout)
      }

      query += event.key
      fn(query)

      timeout = window.setTimeout(() => {
        timeout = 0
        query = ''
      }, 350)
    }
  }

  return node => {
    node.addEventListener('keydown', handler)
    return () => node.removeEventListener('keydown', handler)
  }
}

export function searchItems(store: Writable<Searchable>): SearchFn {
  return (query: string) => store.update(state => ({ ...state, query }))
}