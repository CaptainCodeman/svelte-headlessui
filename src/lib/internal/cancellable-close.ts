import type { Callable } from './callable'

export function cancellableClose(node: HTMLElement, close: Callable) {
	return () => {
		if (node.dispatchEvent(new Event('close', { bubbles: true, cancelable: true }))) {
			close()
		}
	}
}
