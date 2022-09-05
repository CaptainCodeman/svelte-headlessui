import { ArrowLeft, ArrowRight, type KeyHandler } from "./keys"

export const keyLeftRight = (fnLeft: () => void, fnRight: () => void): KeyHandler => key => {
  switch (key) {
    case ArrowLeft:
      fnLeft()
      return true
    case ArrowRight:
      fnRight()
      return true
  }
  return false
}
