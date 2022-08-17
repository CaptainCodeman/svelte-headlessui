import { ArrowUp, ArrowDown, type KeyHandler } from "./keys"

export const onPreviousNext = (fnPrevious: () => void, fnNext: () => void): KeyHandler => key => {
  switch (key) {
    case ArrowUp:
      fnPrevious()
      return true
    case ArrowDown:
      fnNext()
      return true
  }
  return false
}
