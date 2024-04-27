import type { Writable } from './store'
import { isCharacter } from './is-character'
import type { KeyHandler } from './key-handler'
import type { List } from './list'

export interface Searchable extends List {
	query: string
}

type SearchFn = (query: string) => void

export const keyCharacter = (fn: SearchFn): KeyHandler => {
	let timeout: number
	let query = ''

	return (event) => {
		const { key } = event
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
		}
	}
}

export function searchItems(store: Writable<Searchable>): SearchFn {
	return (query: string) => store.update((state) => ({ ...state, query }))
}
