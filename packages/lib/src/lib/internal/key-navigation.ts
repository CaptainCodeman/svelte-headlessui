import type { KeyHandler } from "./key-handler"
import { Home, PageUp, End, PageDown, ArrowUp, ArrowDown } from "./keys"

export const keyNavigation = (first: Function, previous: Function, next: Function, last: Function): KeyHandler => event => {
  switch (event.key) {
    case Home:
    case PageUp:
      first()
      return true
    case ArrowUp:
      previous()
      return true
    case ArrowDown:
      next()
      return true
    case End:
    case PageDown:
      last()
      return true
  }
  return false
}