import { listener } from './events'

export const onChange = (fn: (event: Event) => void) => (node: HTMLElement) =>
	listener(node, 'change', (event) => fn(event))
