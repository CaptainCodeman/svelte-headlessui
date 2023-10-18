import { derived, writable } from "svelte/store";
import { reflectAriaActivedescendent } from "./internal/aria-activedescendent";
import { reflectAriaControls, type Controllable } from './internal/aria-controls';
import { reflectAriaDisabled } from "./internal/aria-disabled";
import { defaultExpanded, reflectAriaExpanded, type Expandable, focusOnClose } from "./internal/aria-expanded";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { defaultSelected, reflectAriaMultiselectable, reflectAriaSelected, type Selectable } from "./internal/aria-selected";
import { applyBehaviors } from "./internal/behavior";
import { keyEscape } from "./internal/key-escape";
import { keyTabAllow } from "./internal/key-tab";
import { activate, active, defaultList, firstActive, getFocuser, getUpdater, lastActive, nextActive, onDestroy, onSelect, previousActive, removeItem, type ItemOptions, type List } from "./internal/list";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onClickOutside } from "./internal/on-click-outside";
import { onInput } from "./internal/on-input";
import { onKeydown } from "./internal/on-keydown";
import { onPointerMoveChild, onPointerOut } from "./internal/on-pointer-move";
import { setHasPopup } from "./internal/set-has-popup";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { reflectSelectedValueOnClose } from "./internal/value";
import { tick } from "svelte";
import { getPrefix } from "./internal/utils";
import { keyEnter } from "./internal/key-enter";
import { keyNavigation } from "./internal/key-navigation";
import { noop } from "./internal/noop";
import { keyBackspace, keyBackspaceAllow } from "./internal/key-backspace";

// TODO: add "value" selector, to pick text value off list item objects
export interface Combobox extends Labelable, Expandable, Controllable, List, Selectable {
  input?: HTMLElement
  button?: HTMLElement
  filter: string
  moved: boolean  // whether we have moved active or not (to reset when filtering)
}

export function createCombobox(init?: Partial<Combobox>) {
  // prefix for generating unique IDs
  const prefix = getPrefix('combobox')

  // internal state for component
  let state: Combobox = {
    ...defaultList(),
    ...defaultExpanded,
    ...defaultSelected,
    ...init,
    filter: '',
    moved: false,
  }

  state.multi = Array.isArray(state.selected)

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Combobox>) => store.set(state = { ...state, ...part })

  // open the menu and set first item active
  const open = () => set({ expanded: true, opened: true, active: state.items.findIndex(x => x.value === state.selected) })

  // close the menu
  const close = () => set({ expanded: false, active: -1 })

  // toggle open / closed state
  const toggle = () => state.expanded ? close() : open()

  // set focused (active) item only if changed
  const focus = (active: number, expand = false) => {
    if (state.active !== active) {
      const expanded = state.expanded || expand
      const opened = state.opened || expand
      set({ expanded, opened, active })
      const item = state.items[active]
      if (item) {
        item.node.scrollIntoView({ block: 'nearest' })
      }
    }
  }

  // set focus (active) to first
  const first = () => focus(firstActive(state), true)

  // set focus (active) to selected or previous
  const previous = () => focus(state.active === -1 && (!state.multi || state.selected.length > 0)
    ? state.items.findIndex(x => x.value === (state.multi ? state.selected[state.selected.length - 1] : state.selected))
    : previousActive(state), true)

  // set focus (active) to selected or next
  const next = () => focus(state.active === -1 && (!state.multi || state.selected.length > 0)
    ? state.items.findIndex(x => x.value === (state.multi ? state.selected[0] : state.selected))
    : nextActive(state), true)

  // set focus (active) to last
  const last = () => focus(lastActive(state), true)

  // delete left on backspace if multi-select and no input
  const del = () => {
    if (state.multi && state.filter === '') {
      set({ selected: state.selected.slice(0, state.selected.length - 1) })
      focus(state.items.findIndex(x => x.value === state.selected[state.selected.length - 1]))
    }
  }

  const reset = () => {
    set({ filter: '', expanded: false })
  }

  const setFocusToInput = () => state.input?.focus()

  const filter = async (value: string) => {
    // current active item
    const current = state.active === -1
      ? state.selected
      : state.items[state.active].value

    set({ filter: value, expanded: true, opened: true })  // keep expanded or expand if filter is set

    await tick()

    // if we moved try to keep current active, otherwise use selected, always fallback to first
    // unless there are no items matching the filter in which case nothing can be active
    const selectedIndex = state.items.findIndex(item => item.value === state.selected)
    const currentIndex = state.items.findIndex(item => item.value === current)
    const active = state.items.length
      ? state.moved
        ? currentIndex === -1
          ? 0
          : currentIndex
        : selectedIndex === -1
          ? currentIndex === -1
            ? 0
            : currentIndex
          : selectedIndex
      : -1

    if (state.active !== active) {
      set({ active })
    }
  }

  // set the focus based on the HTMLElement passed which will be a menuitem element or null
  const focusNode = getFocuser(() => state, focus)

  const remove = (node: HTMLElement) => set(removeItem(state, node))

  const select = () => set(onSelect(state, state.input))

  function input(node: HTMLElement) {
    ensureID(node, prefix)
    set({ input: node })

    const destroy = applyBehaviors(node, [
      setType('text'),
      setRole('combobox'),
      setTabIndex(0),
      reflectAriaLabel(store),
      reflectAriaExpanded(store),
      reflectAriaControls(store),
      reflectSelectedValueOnClose(store, item => item?.name),
      onKeydown(
        keyEnter(select, state.multi ? noop : toggle),
        keyEscape(close),
        keyNavigation(first, previous, next, last),
        keyTabAllow(select, close),
        keyBackspaceAllow(del)
      ),
      onInput(filter),
      focusOnClose(store),
    ])

    return {
      destroy,
    }
  }

  // menubutton
  function button(node: HTMLElement) {
    ensureID(node, prefix)
    set({ button: node })

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setHasPopup(),
      setTabIndex(-1),
      reflectAriaExpanded(store),
      reflectAriaControls(store),
      onClick(toggle),
      node => {
        node.addEventListener('focus', setFocusToInput)
        return () => node.removeEventListener('focus', setFocusToInput)
      }
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
      setTabIndex(-1),
      onClickOutside(() => [state.button, node], close),
      onClick(activate('[role="option"]', focusNode, select, state.multi ? setFocusToInput : close)),
      onPointerMoveChild('[role="option"]', focusNode),
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
        // TODO: raise event for changed selection
        e.stopImmediatePropagation()
      }),
    ])

    return {
      destroy,
    }
  }

  // expose a subset of our state, derive the selected value
  const { subscribe } = derived(store, $state => {
    const { expanded, selected, filter } = $state
    return { expanded, selected, filter, active: active($state) }
  })

  return {
    subscribe,
    input,
    button,
    items,
    item,
    deselect,
    reset,
    open,
    close,
    set,
  }
}
