import { Home, PageUp, End, PageDown, type KeyHandler } from "./keys"

export const keyHomeEnd = (fnHome: () => void, fnEnd: () => void): KeyHandler => key => {
  switch (key) {
    case Home:
    case PageUp:
      fnHome()
      return true
    case End:
    case PageDown:
      fnEnd()
      return true
  }
  return false
}
