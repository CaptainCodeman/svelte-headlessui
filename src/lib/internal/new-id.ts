let id = 0

export function newID() {
	return ++id
}

export function ensureID(node: HTMLElement, prefix: string) {
	node.id = node.id ||`${prefix}:${newID()}`
}
