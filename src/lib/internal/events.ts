// listener is a utility to define event listeners
export const listener = <K extends keyof HTMLElementEventMap>(
	node: HTMLElement,
	type: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	capture = false,
) => {
	node.addEventListener(type, handler, capture)
	return () => node.removeEventListener(type, handler, capture)
}

export const blockDefaultAction = (event: Event) => {
	if (event.isTrusted) {
		event.preventDefault()
		event.stopPropagation()
		event.stopImmediatePropagation()
	}
}
