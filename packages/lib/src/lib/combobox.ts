import { derived, writable } from "svelte/store";
import { reflectAriaActivedescendent } from "./internal/aria-activedescendent";
import { reflectAriaControls, type Controllable } from './internal/aria-controls';
import { reflectAriaDisabled } from "./internal/aria-disabled";
import { defaultExpanded, focusOnClose, focusOnExpanded, reflectAriaExpanded, type Expandable } from "./internal/aria-expanded";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { defaultSelected, reflectAriaSelected, type Selectable } from "./internal/aria-selected";
import { applyBehaviors } from "./internal/behavior";
import { keyCharacter } from "./internal/key-character";
import { keyEscape } from "./internal/key-escape";
import { keyHomeEnd } from "./internal/key-home-end";
import { keyUpDown } from "./internal/key-up-down";
import { keyTab } from "./internal/key-tab";
import { active, defaultList, firstActive, getFocuser, getItemValues, getUpdater, lastActive, nextActive, onDestroy, onSelect, previousActive, removeItem, type ItemOptions, type List, type ListItem } from "./internal/list";
import { ensureID } from "./internal/new-id";
import { noop } from "./internal/noop";
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
import { setDisabled } from "./internal/set-disabled";
import { getPrefix } from "./internal/utils";
import { keyEnter } from "./internal/key-enter";

// TODO: add "value" selector, to pick text value off list item objects
export interface Combobox extends Labelable, Expandable, Controllable, List, Selectable {
  input?: HTMLElement
  filter: string
  moved: boolean  // whether we have moved active or not (to reset when filtering)
}

export function createCombobox(init?: Partial<Combobox>) {
  // prefix for generating unique IDs
  const prefix = getPrefix('combobox')

  // internal state for component
  let state: Combobox = {
    ...defaultList,
    ...defaultExpanded,
    ...defaultSelected,
    ...init,
    filter: '',
    moved: false,
  }

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Combobox>) => store.set(state = { ...state, ...part })

  // open the menu and set first item active
  const open = () => set({ expanded: true })

  // close the menu
  const close = () => set({ expanded: false })

  // toggle open / closed state
  const toggle = () => state.expanded ? close() : open()

  // set focused (active) item only if changed
  const focus = (active: number) => state.active !== active && set({ active, moved: true })

  // set focus (active) to first
  const first = () => focus(firstActive(state))

  // set focus (active) to previous
  const previous = () => focus(previousActive(state))

  // set focus (active) to next
  const next = () => focus(nextActive(state))

  // set focus (active) to last
  const last = () => focus(lastActive(state))

  // clear focus
  const none = () => focus(-1)

  const reset = () => {
    set({ filter: '', expanded: false })
  }

  const filter = async (value: string) => {
    // current active item
    const current = state.active === -1
      ? state.selected
      : state.items[state.active].value

    set({ filter: value, expanded: true })  // keep expanded or expand if filter is set

    await tick()

    // if we moved, try to keep current active, otherwise use selected, always fallback to first
    const selectedIndex = state.items.findIndex(item => item.value === state.selected)
    const currentIndex = state.items.findIndex(item => item.value === current)
    const active = state.moved
      ? currentIndex === -1
        ? 0
        : currentIndex
      : selectedIndex === -1
        ? currentIndex === -1
          ? 0
          : currentIndex
        : selectedIndex

    if (state.active !== active) {
      set({ active })
    }
  }

  // set the focus based on the HTMLElement passed which will be a menuitem element or null
  const focusNode = getFocuser(() => state, focus)

  const remove = (node: HTMLElement) => set(removeItem(state, node))

  const select = async () => set(onSelect(state, state.input))

  function input(node: HTMLElement) {
    ensureID(node, prefix)
    set({ input: node })

    const destroy = applyBehaviors(node, [
      setType('text'),
      setRole('combobox'),
      // setHasPopup(),
      setTabIndex(0),
      reflectAriaLabel(store),
      reflectAriaExpanded(store),
      reflectAriaControls(store),
      reflectSelectedValueOnClose(store, item => item?.name),
      // reflectSelectedValue(), <== set input value when a selection is made
      // onClick(toggle),
      // selectAllOnFocus(), <--
      onKeydown(
        keyEnter(select),
        keyEscape(close),
        keyHomeEnd(first, last),
        keyUpDown(previous, next),
        keyTab(noop),
        // keyCharacter(search),
      ),
      onInput(filter),
      focusOnClose(store),
      node => derived(store, state => state.expanded).subscribe(expanded => {
        if (expanded) {
          // when expanded, set active to selected if not set
          if (state.active === -1) {
            const index = state.items.findIndex(x => x.value === state.selected)
            const active = index === -1 ? 0 : index
            set({ active })
          }
          // always reset moved flag
          set({ moved: false })
        }
      }),
    ])

    return {
      destroy,
    }
  }

  // menubutton
  function button(node: HTMLElement) {
    ensureID(node, prefix)

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setHasPopup(),
      // setTabIndex(-1),
      // reflectAriaLabel(store),
      reflectAriaExpanded(store),
      reflectAriaControls(store),
      onClick(toggle),
      // onKeydown(
      // keySpaceEnter(toggle),
      // keyPreviousNext(toggle, toggle),
      // ),
      // focusOnClose(store),
      node => {
        const setFocusToInput = () => state.input?.focus()
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
    set({ controls: node ? node.id : undefined })

    const destroy = applyBehaviors(node, [
      setRole('listbox'),
      setTabIndex(-1),
      onClickOutside(close),
      onClick(select),
      onPointerMoveChild('[role="option"]', focusNode),
      onPointerOut(none),
      // onKeydown(
      //   keySpaceEnter(select),
      //   keyEscape(close),
      //   keyFirstLast(first, last),
      //   keyPreviousNext(previous, next),
      //   keyTab(noop),
      //   keyCharacter(search),
      // ),
      reflectAriaActivedescendent(store),
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

    const destroy = applyBehaviors(node, [
      setTabIndex(-1),
      setRole('option'),
      reflectAriaDisabled(store),
      onDestroy(remove),
    ])

    return {
      update,
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
    reset,
    open,
    close,
  }
}
