import { derived, writable } from './internal/store'
import { defaultExpanded, type Expandable } from './internal/aria-expanded'
import { reflectAriaModal } from './internal/aria-modal'
import { reflectAriaLabel, type Labelable } from './internal/aria-label'
import { applyBehaviors } from './internal/behavior'
import { keyEscape } from './internal/key-escape'
import { ensureID } from './internal/new-id'
import { onClickOutside } from './internal/on-click-outside'
import { onKeydown } from './internal/on-keydown'
import { setRole } from './internal/set-role'
import { getPrefix } from './internal/utils'
import { trapFocusOnOpen } from './internal/focus'
import { setTabIndex } from './internal/set-tab-index'
import { cancellableClose } from './internal/cancellable-close'

export interface Dialog extends Expandable, Labelable {}

export function createDialog(init?: Partial<Dialog>) {
	// prefix for generating unique IDs
	const prefix = getPrefix('dialog')

	let state: Dialog = {
		...defaultExpanded,
		...init,
	}

	// wrap with store for reactivity
	const store = writable(state)

	// update state and notify store of changes for reactivity
	const set = (part: Partial<Dialog>) => store.set((state = { ...state, ...part }))

	const open = () => set({ expanded: true, opened: true })
	const close = () => set({ expanded: false })

	// modal
	function modal(node: HTMLElement) {
		ensureID(node, prefix)

		const tryClose = cancellableClose(node, close)

		const destroy = applyBehaviors(node, [
			setRole('dialog'),
			setTabIndex(-1),
			reflectAriaModal(store),
			reflectAriaLabel(store),
			trapFocusOnOpen(store),
			onClickOutside(() => (state.expanded ? [node] : null), tryClose),
			onKeydown(keyEscape(tryClose)),
		])

		return {
			destroy,
		}
	}

	// expose a subset of our state, derive the selected value
	const { subscribe } = derived(store, ($state) => {
		const { expanded } = $state
		return { expanded }
	})

	return {
		subscribe,
		modal,
		open,
		close,
		set,
	}
}
