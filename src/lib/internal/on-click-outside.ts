import type { Behavior } from './behavior'
import { listener } from './events'

export function onClickOutside(
	getContainers: () => (HTMLElement | undefined)[] | null,
	fn: (event: Event) => void,
): Behavior {
	return () => {
		let initial: Node | null = null

		function handler(event: Event) {
			// ignore space as click
			if ((event as PointerEvent).pointerType === '') return

			// ignore non-primary clicks
			if (!initial) return

			// get container nodes that we care about being outside of
			const containers = getContainers()
			if (containers) {
				// bail if we're inside one of the containers (i.e. it's not a click outside)
				for (const node of containers) {
					if (node && node.contains(initial)) {
						return
					}
				}
			}

			fn(event)

			initial = null
		}

		function setInitial(event: PointerEvent) {
			if (event.isPrimary) {
				initial = event.target as Node
			}
		}

		const listeners = [
			listener(document.documentElement, 'pointerdown', setInitial, true),
			listener(document.documentElement, 'click', handler, true),
		]

		return () => listeners.forEach((listener) => listener())
	}
}
