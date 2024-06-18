import { derived, writable } from './internal/store'
import { reflectAriaActivedescendent } from './internal/aria-activedescendent'
import { reflectAriaControls, type Controllable } from './internal/aria-controls'
import { reflectAriaDisabled } from './internal/aria-disabled'
import {
	defaultExpanded,
	focusOnClose,
	focusOnExpanded,
	reflectAriaExpanded,
	type Expandable,
} from './internal/aria-expanded'
import { reflectAriaLabel, type Labelable } from './internal/aria-label'
import {
	defaultSelected,
	reflectAriaMultiselectable,
	reflectAriaSelected,
	type Selectable,
} from './internal/aria-selected'
import { applyBehaviors } from './internal/behavior'
import { keyCharacter } from './internal/key-character'
import { keyEscape } from './internal/key-escape'
import { keySpaceEnter } from './internal/key-space-enter'
import { keyTab } from './internal/key-tab'
import {
	activate,
	active,
	defaultList,
	firstActive,
	getFocuser,
	getSearch,
	getUpdater,
	lastActive,
	nextActive,
	onDestroy,
	selectActive,
	previousActive,
	removeItem,
	type ItemOptions,
	type List,
	raiseSelectOnChange,
} from './internal/list'
import { ensureID } from './internal/new-id'
import { noop } from './internal/noop'
import { onClick } from './internal/on-click'
import { onClickOutside } from './internal/on-click-outside'
import { onKeydown } from './internal/on-keydown'
import { onPointerMoveChild } from './internal/on-pointer-move'
import { setHasPopup } from './internal/set-has-popup'
import { setRole } from './internal/set-role'
import { setTabIndex } from './internal/set-tab-index'
import { setType } from './internal/set-type'
import { getPrefix } from './internal/utils'
import { keyDown, keyUp } from './internal/key-up-down'
import { keyNavigation } from './internal/key-navigation'

// TODO: add "value" selector, to pick text value off list item objects
export interface Listbox extends Labelable, Expandable, Controllable, List, Selectable {
	button?: HTMLElement
}

export function createListbox(init?: Partial<Listbox>) {
	// prefix for generating unique IDs
	const prefix = getPrefix('listbox')

	// internal state for component
	let state: Listbox = {
		...defaultList(),
		...defaultExpanded,
		...defaultSelected,
		...init,
	}

	state.multi = Array.isArray(state.selected)

	// wrap with store for reactivity
	const store = writable(state)

	// update state and notify store of changes for reactivity
	const set = (part: Partial<Listbox>) => store.set((state = { ...state, ...part }))

	// open the menu and set first item active
	const open = () =>
		set({
			expanded: true,
			opened: true,
			active: state.items.findIndex((x) => x.value === state.selected),
		})

	// close the menu
	const close = () => set({ expanded: false })

	// toggle open / closed state
	const toggle = () => (state.expanded ? close() : open())

	// set focused (active) item only if changed
	const focus = (active: number) => {
		if (state.active !== active) {
			set({ active })
			const item = state.items[active]
			if (item) {
				item.node.scrollIntoView({ block: 'nearest' })
			}
		}
	}

	// set focus (active) to first
	const first = () => focus(firstActive(state))

	// set focus (active) to previous
	const previous = () => focus(previousActive(state))

	// set focus (active) to next
	const next = () => focus(nextActive(state))

	// set focus (active) to last
	const last = () => focus(lastActive(state))

	const search = getSearch(() => state, focus)

	// set the focus based on the HTMLElement passed which will be a menuitem element or null
	const focusNode = getFocuser(() => state, focus)

	const remove = (node: HTMLElement) => set(removeItem(state, node))

	const select = () => set(selectActive(state))

	// menubutton
	function button(node: HTMLElement) {
		ensureID(node, prefix)
		set({ button: node })

		const destroy = applyBehaviors(node, [
			setType('button'),
			setRole('button'),
			setHasPopup(),
			setTabIndex(0),
			reflectAriaLabel(store),
			reflectAriaExpanded(store),
			reflectAriaControls(store),
			onClick(toggle),
			onKeydown(keySpaceEnter(toggle), keyUp(toggle), keyDown(toggle)),
			focusOnClose(store),
			raiseSelectOnChange(store),
		])

		return {
			destroy,
		}
	}

	function items(node: HTMLElement) {
		ensureID(node, prefix)
		set({ controls: node.id })

		const destroy = applyBehaviors(node, [
			setRole('listbox'),
			setTabIndex(0),
			onClickOutside(() => (state.expanded ? [state.button, node] : null), close),
			onClick(activate('[role="option"]', focusNode, select, state.multi ? noop : close)),
			onPointerMoveChild('[role="option"]', focusNode),
			onKeydown(
				keySpaceEnter(select, state.multi ? noop : close),
				keyEscape(close),
				keyNavigation(first, previous, next, last),
				keyTab(noop),
				keyCharacter(search),
			),
			focusOnExpanded(store),
			reflectAriaActivedescendent(store),
			reflectAriaMultiselectable(store),
		])

		return {
			destroy,
		}
	}

	// TODO: allow "any" type of value, as long as a text extractor is supplied (default function is treat as a string)
	// NOTE: text value is required for searchability
	function item(node: HTMLElement, options?: ItemOptions) {
		ensureID(node, prefix)

		const update = getUpdater(node, () => state, set)

		update(options)

		const value = state.items[state.items.length - 1].value

		const destroy = applyBehaviors(node, [
			setTabIndex(-1),
			setRole('option'),
			reflectAriaDisabled(store),
			reflectAriaSelected(store, value),
			onDestroy(remove),
		])

		return {
			update,
			destroy,
		}
	}

	function deselect(node: HTMLElement, value: any) {
		const destroy = applyBehaviors(node, [
			onClick((e) => {
				set({ selected: state.selected.filter((selected: any) => selected !== value) })
				e.stopImmediatePropagation()
			}),
		])

		return {
			destroy,
		}
	}

	// expose a subset of our state, derive the selected value
	const { subscribe } = derived(store, ($state) => {
		const { expanded, selected } = $state
		return { expanded, selected, active: active($state) }
	})

	return {
		subscribe,
		button,
		items,
		item,
		deselect,
		open,
		close,
		set,
	}
}
