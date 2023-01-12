import { listener } from "./events"

export const onClick = (fn: (event: Event) => void) => (node: HTMLElement) => listener(node, 'click', fn)
