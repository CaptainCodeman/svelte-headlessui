import { Space, Enter, type KeyHandler } from "./keys"

export const keySpaceEnter = (fn: () => void): KeyHandler => key => {
  switch (key) {
    case Space:
    case Enter:
      fn()
      return true
  }
  return false
}
