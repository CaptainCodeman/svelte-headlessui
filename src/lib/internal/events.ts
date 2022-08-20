// listener is a utility to define event listeners
export const listener = <K extends keyof HTMLElementEventMap>(node: HTMLElement, type: K, handler: (event: HTMLElementEventMap[K]) => void, capture = false) => {
  node.addEventListener(type, handler, capture)
  return () => node.removeEventListener(type, handler, capture)
}

// terminateEvent decorates event handlers to preventDefault and stopPropagation of the event
export const terminateEvent = <T extends Event>(handler: (event: T) => void) => (event: T) => {
  event.preventDefault()
  event.stopPropagation()
  event.stopImmediatePropagation()
  handler(event)
}
