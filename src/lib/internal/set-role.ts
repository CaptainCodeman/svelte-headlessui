import type { Behavior } from './behavior'
import { noop } from './noop'

export const setRole =
	(role: string): Behavior =>
	(node) => {
		node.setAttribute('role', role)
		return noop
	}
