import type { Callable } from './callable'
import { blockDefaultAction } from './events'

export type KeyHandler = (event: KeyboardEvent) => void

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const allowDefaultKeyAction = (_event: KeyboardEvent) => {}

export const keyHandler =
	(matches: string[], action: KeyHandler = blockDefaultAction) =>
	(...fns: Callable[]): KeyHandler =>
	(event) => {
		if (matches.includes(event.key)) {
			fns.forEach((fn) => fn())
			if (action) {
				action(event)
			}
		}
	}
