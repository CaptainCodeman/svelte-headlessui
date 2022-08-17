import { Escape, type KeyHandler } from "./keys"

export const onEscape = (fn: () => void): KeyHandler => key => {
  switch (key) {
    case Escape:
      fn()
      return true
  }
  return false
}
