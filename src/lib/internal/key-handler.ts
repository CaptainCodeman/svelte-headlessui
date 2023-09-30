import type { Callable } from "./callable"

export type KeyHandler = (event: KeyboardEvent) => void

export const blockDefaultKeyAction = (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const allowDefaultKeyAction = (_event: KeyboardEvent) => { }

export const keyHandler = (matches: string[], action: KeyHandler = blockDefaultKeyAction) => (...fns: Callable[]): KeyHandler => event => {
  if (matches.includes(event.key)) {
    fns.forEach(fn => fn())
    if (action) {
      action(event)
    }
  }
}