import { derived, writable, type Readable } from './internal/store'
import { reflectAriaActivedescendent } from './internal/aria-activedescendent'
import { setAriaControls } from './internal/aria-controls'
import { reflectAriaLabel, type Labelable } from './internal/aria-label'
import { defaultSelected, reflectAriaSelected, type Selectable } from './internal/aria-selected'
import { applyBehaviors, type Behavior } from './internal/behavior'
import { keySpaceEnter } from './internal/key-space-enter'
import {
	activate,
	active,
	defaultList,
	firstActive,
	getFocuser,
	lastActive,
	nextActive,
	onDestroy,
	selectActive,
	previousActive,
	removeItem,
	type List,
	getUpdater,
	type ItemOptions,
	raiseSelectOnChange,
} from './internal/list'
import { ensureID } from './internal/new-id'
import { onClick } from './internal/on-click'
import { onKeydown } from './internal/on-keydown'
import { setRole } from './internal/set-role'
import { setTabIndex } from './internal/set-tab-index'
import { setType } from './internal/set-type'
import { getPrefix } from './internal/utils'
import { keyNavigation } from './internal/key-navigation'
import {
	defaultOrientation,
	reflectAriaOrientation,
	type Orientable,
} from './internal/aria-orientation'
import { setAriaAttributeString } from './internal/aria-attribute'
import { setFocus } from './internal/focus'

export interface Tabs extends Labelable, List, Selectable, Orientable {
	tabs: HTMLElement[]
	panels: HTMLElement[]
	auto: boolean
}

export function createTabs(init?: Partial<Tabs>) {
	// prefix for generating unique IDs
	const prefixTabs = getPrefix('tabs')
	const prefixTab = getPrefix('tab')
	const prefixPanel = getPrefix('panel')

	// internal state for component
	let state: Tabs = {
		tabs: [],
		panels: [],
		auto: true,
		...defaultList(),
		...defaultSelected,
		...defaultOrientation,
		...init,
	}

	// wrap with store for reactivity
	const store = writable(state)

	// update state and notify store of changes for reactivity
	const set = (part: Partial<Tabs>) => store.set((state = { ...state, ...part }))

	// set focused (active) item only if changed
	const focus = (active: number) => state.active !== active && set({ active })

	// set focus (active) to first
	const first = () => focus(firstActive(state))

	// set focus (active) to previous
	const previous = () => focus(previousActive(state))

	// set focus (active) to next
	const next = () => focus(nextActive(state))

	// set focus (active) to last
	const last = () => focus(lastActive(state))

	const select = () => set(selectActive(state))

	// set the focus based on the HTMLElement passed which will be a tab element or null
	const focusNode = getFocuser(() => state, focus)

	const remove = (node: HTMLElement) => set(removeItem(state, node))

	// tablist
	function list(node: HTMLElement) {
		ensureID(node, prefixTabs)

		const selectOnNavigate =
			(store: Readable<Tabs>): Behavior =>
			() =>
				derived(
					store,
					($store) =>
						$store.auto &&
						$store.active !== state.items.findIndex((item) => item.value === state.selected),
				).subscribe(select)

		const destroy = applyBehaviors(node, [
			setRole('tablist'),
			reflectAriaLabel(store),
			reflectAriaOrientation(store),
			setTabIndex(-1),
			onClick(activate('[role="tab"]', focusNode, select)),
			// onPointerMoveChild('[role="tab"]', focusNode),
			// onPointerOut(none),
			onKeydown(
				keySpaceEnter(select),
				keyNavigation(first, previous, next, last, state.orientation),
			),
			reflectAriaActivedescendent(store),
			selectOnNavigate(store),
			raiseSelectOnChange(store),
		])

		return {
			destroy,
		}
	}

	function tab(node: HTMLElement, options?: ItemOptions) {
		ensureID(node, prefixTab)
		set({ tabs: [...state.tabs, node] })

		const update = getUpdater(node, () => state, set)

		update(options)

		const value = state.items[state.items.length - 1].value
		if (state.selected === value) {
			set({ active: state.tabs.length - 1 })
		}

		const setTabIndex = setAriaAttributeString('tabindex')
		const reflectAriaTabIndex =
			(store: Readable<Tabs>): Behavior =>
			(node) =>
				derived(store, ($store) => ($store.selected === value ? '0' : '-1')).subscribe(
					setTabIndex(node),
				)
		const reflectControls =
			(store: Readable<Tabs>): Behavior =>
			(node) =>
				derived(
					store,
					($store) => $store.panels[$store.tabs.findIndex((tab) => tab === node)]?.id,
				).subscribe(setAriaControls(node))
		const focusOnSelect =
			(store: Readable<Tabs>): Behavior =>
			(node) =>
				derived(store, ($store) => $store.selected === value).subscribe(setFocus(node))

		const destroy = applyBehaviors(node, [
			setType('button'),
			setRole('tab'),
			reflectAriaSelected(store, value),
			reflectAriaTabIndex(store),
			reflectControls(store),
			focusOnSelect(store),
		])

		return {
			destroy,
		}
	}

	function panel(node: HTMLElement) {
		ensureID(node, prefixPanel)
		set({ panels: [...state.panels, node] })

		const setAriaLabelledBy = setAriaAttributeString('aria-labelledby')
		const reflectAriaLabelledBy =
			(store: Readable<Tabs>): Behavior =>
			(node) =>
				derived(
					store,
					($store) => $store.tabs[$store.panels.findIndex((panel) => panel === node)].id,
				).subscribe(setAriaLabelledBy(node))

		const destroy = applyBehaviors(node, [
			setTabIndex(0),
			setRole('tabpanel'),
			reflectAriaLabelledBy(store),
			// reflectAriaDisabled(store),
			onDestroy(remove),
			// set to be visible / hidden based on selected state?
		])

		return {
			// update,
			destroy,
		}
	}

	// expose a subset of our state, derive the selected value
	const { subscribe } = derived(store, ($state) => {
		const { selected } = $state
		return { selected, active: active($state) }
	})

	return {
		subscribe,
		list,
		tab,
		panel,
		set,
	}
}
