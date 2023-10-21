import { derived, readable, writable } from "svelte/store"
import type { Readable, Writable } from "svelte/store"

// this improves minification by avoiding multiple separate import statements
export { derived, readable, writable }
export type { Readable, Writable }

// dedupe updates without changes
export function dedupe<T>(store: Readable<T>): Readable<T> {
  let previous: T

  return derived(store, ($value, set) => {
    if ($value !== previous) {
      previous = $value
      set($value)
    }
  })
}