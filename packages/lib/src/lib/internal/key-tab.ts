import { Tab, type KeyHandler } from "./keys"

export const keyTab = (fn: () => void): KeyHandler => key => {
  switch (key) {
    case Tab:
      fn()
      return true
  }
  return false
}
