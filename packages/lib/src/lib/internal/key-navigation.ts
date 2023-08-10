import type { KeyHandler } from "./key-handler"
import { Home, PageUp, End, PageDown, ArrowUp, ArrowDown } from "./keys"

export const keyNavigation = (first: Function, previous: Function, next: Function, last: Function): KeyHandler => event => {
  switch (event.key) {
    case Home:
    case PageUp:
      return first()
    case ArrowUp:
      return previous()
    case ArrowDown:
      return next()
    case End:
    case PageDown:
      return last()
  }
  return false
}