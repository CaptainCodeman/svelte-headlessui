import { ArrowUp, ArrowDown, type KeyHandler } from "./keys"

export const keyUpDown = (fnUp: () => void, fnDown: () => void): KeyHandler => key => {
  switch (key) {
    case ArrowUp:
      fnUp()
      return true
    case ArrowDown:
      fnDown()
      return true
  }
  return false
}
