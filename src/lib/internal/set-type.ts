import type { Behavior } from './behavior'
import { noop } from './noop'

export const setType =
	(type: string): Behavior =>
	(node) => {
		node.setAttribute('type', type)
		return noop
	}
