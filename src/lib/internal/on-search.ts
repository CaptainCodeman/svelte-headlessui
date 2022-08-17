import type { Writable } from "svelte/store"
import { isCharacter } from "./is-character"
import type { KeyHandler } from "./keys"
import type { List } from "./list"

export interface Searchable extends List {
  query: string
}

type SearchFn = (query: string) => void

export const onSearch = (fn: SearchFn): KeyHandler => {
  let timeout: number
  let query = ''

  return key => {
    if (isCharacter(key)) {
      if (timeout) {
        clearTimeout(timeout)
      }

      query += key
      fn(query)

      timeout = window.setTimeout(() => {
        timeout = 0
        query = ''
      }, 350)

      return true
    }

    return false
  }
}

export function searchItems(store: Writable<Searchable>): SearchFn {
  return (query: string) => store.update(state => ({ ...state, query }))
}