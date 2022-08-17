import { Tab, type KeyHandler } from "./keys"

export const onTab = (fn: () => void): KeyHandler => key => {
  switch (key) {
    case Tab:
      fn()
      return true
  }
  return false
}
