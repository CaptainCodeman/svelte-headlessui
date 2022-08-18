import { Home, PageUp, End, PageDown, type KeyHandler } from "./keys"

export const keyFirstLast = (fnFirst: () => void, fnLast: () => void): KeyHandler => key => {
  switch (key) {
    case Home:
    case PageUp:
      fnFirst()
      return true
    case End:
    case PageDown:
      fnLast()
      return true
  }
  return false
}
