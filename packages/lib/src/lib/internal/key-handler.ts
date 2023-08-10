export type KeyHandlerAction = (event: KeyboardEvent) => void

export type KeyHandler = (event: KeyboardEvent) => boolean

export const blockDefaultKeyAction = (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
}

export const allowDefaultKeyAction = (_event: KeyboardEvent) => { }

export const keyHandler = (matches: string[], action: KeyHandlerAction = blockDefaultKeyAction) => (...fns: Function[]): KeyHandler => event => {
  if (matches.includes(event.key)) {
    fns.forEach(fn => fn())
    if (action) {
      action(event)
    }
    return true
  }
  return false
}