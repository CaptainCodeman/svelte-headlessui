import { derived, writable } from "svelte/store";
import { reflectAriaActivedescendent } from "./internal/aria-activedescendent";
import { reflectAriaControls, type Controllable } from './internal/aria-controls';
import { reflectAriaDisabled } from "./internal/aria-disabled";
import { defaultExpanded, focusOnClose, focusOnExpanded, reflectAriaExpanded, type Expandable } from "./internal/aria-expanded";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { defaultSelected, type Selectable } from "./internal/aria-selected";
import { applyBehaviors } from "./internal/behavior";
import { keyCharacter } from "./internal/key-character";
import { keyEscape } from "./internal/key-escape";
import { keyHomeEnd } from "./internal/key-home-end";
import { keyUpDown } from "./internal/key-up-down";
import { keySpaceEnter } from "./internal/key-space-enter";
import { keyTab } from "./internal/key-tab";
import { active, defaultList, firstActive, getFocuser, getSearch, getUpdater, lastActive, nextActive, onDestroy, onSelect, previousActive, removeItem, type ItemOptions, type List } from "./internal/list";
import { ensureID } from "./internal/new-id";
import { noop } from "./internal/noop";
import { onClick } from "./internal/on-click";
import { onClickOutside } from "./internal/on-click-outside";
import { onKeydown } from "./internal/on-keydown";
import { onPointerMoveChild, onPointerOut } from "./internal/on-pointer-move";
import { setHasPopup } from "./internal/set-has-popup";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { getPrefix } from "./internal/utils";

// TODO: add "value" selector, to pick text value off list item objects
export interface Menu extends Labelable, Expandable, Controllable, List, Selectable {
  button?: HTMLElement
}

export function createMenu(init?: Partial<Menu>) {
  // prefix for generating unique IDs
  const prefix = getPrefix('menu')

  // internal state for component
  let state: Menu = {
    ...defaultList,
    ...defaultExpanded,
    ...defaultSelected,
    ...init,
  }

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Menu>) => store.set(state = { ...state, ...part })

  // open the menu and set first item active
  const open = () => set({ expanded: true })

  // close the menu
  const close = () => set({ expanded: false, active: -1 })

  // toggle open / closed state
  const toggle = () => state.expanded ? close() : open()

  // set focused (active) item (open if not expanded) only if changed
  const focus = (active: number) => state.active !== active && set({ expanded: state.expanded || active > -1, active })

  // set focus (active) to first
  const first = () => focus(firstActive(state))

  // set focus (active) to previous
  const previous = () => focus(previousActive(state))

  // set focus (active) to next
  const next = () => focus(nextActive(state))

  // set focus (active) to last
  const last = () => focus(lastActive(state))

  const select = () => set(onSelect(state, state.button))

  // clear focus
  const none = () => focus(-1)

  const search = getSearch(() => state, focus)

  // set the focus based on the HTMLElement passed which will be a menuitem element or null
  const focusNode = getFocuser(() => state, focus)

  const remove = (node: HTMLElement) => set(removeItem(state, node))

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
      onKeydown(
        keySpaceEnter(toggle),
        keyUpDown(last, first),
      ),
      focusOnClose(store),
    ])

    return {
      destroy,
    }
  }

  function items(node: HTMLElement) {
    ensureID(node, prefix)
    set({ controls: node ? node.id : undefined })

    const destroy = applyBehaviors(node, [
      setRole('menu'),
      setTabIndex(0),
      onClickOutside(close),
      onClick(select),
      onPointerMoveChild('[role="menuitem"]', focusNode),
      onPointerOut(none),
      onKeydown(
        keySpaceEnter(select),
        keyEscape(close),
        keyHomeEnd(first, last),
        keyUpDown(previous, next),
        keyTab(noop),
        keyCharacter(search),
      ),
      focusOnExpanded(store),
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
      setRole('menuitem'),
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
    const { expanded } = $state
    return { expanded, active: active($state) }
  })

  return {
    subscribe,
    button,
    items,
    item,
    open,
    close,
  }
}
