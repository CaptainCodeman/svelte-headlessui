let id = 0

export function newID() {
	return ++id
}

export function ensureID(node: HTMLElement, prefix: string) {
	if (!node.id) {
		node.id = `${prefix}:${newID()}`
	}
	return node
}
