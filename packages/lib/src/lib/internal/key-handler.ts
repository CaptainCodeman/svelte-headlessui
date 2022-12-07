import type { KeyHandler } from "./keys"

export const keyHandler = (match: string) => (fn: () => void): KeyHandler => key => {
  switch (key) {
    case match:
      fn()
      return true
  }
  return false
}
