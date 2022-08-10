import type { Writable } from "svelte/store"
import type { Behavior } from "./behavior"
import { isCharacter } from "./is-character"

export interface Searchable {
  query: string
}

type SearchFn = (query: string) => void

export function onKeyboard(fn: SearchFn): Behavior {
  return node => {
    let timeout: number
    let query = ''

    function handler(event: KeyboardEvent) {
      if (isCharacter(event.key)) {
        if (timeout) {
          clearTimeout(timeout)
        }

        // const searchable = state.activeIndex >= 0
        //   ? state.values
        //     .slice(state.activeIndex + 1)
        //     .concat(state.values.slice(0, state.activeIndex + 1))
        //   : state.values

        query += event.key
        fn(query)
        // state.search += event.key
        // const re = new RegExp(`^${state.search}`, 'i')
        // // TODO: exclude disabled
        // const found = searchable.findIndex(x => x.value.match(re))

        // if (found > -1) {
        //   select((found + state.activeIndex + 1) % state.values.length)
        // }

        timeout = window.setTimeout(() => {
          timeout = 0
          query = ''
          fn(query)
        }, 350) // TODO: configurable timeout?
      }
    }

    node.addEventListener('keydown', handler)

    return () => node.removeEventListener('keydown', handler)
  }
}

export function searchItems(store: Writable<Searchable>): SearchFn {
  return (query: string) => store.update(state => ({ ...state, query }))
}