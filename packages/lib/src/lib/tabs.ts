import { derived, writable } from "svelte/store";
import { reflectAriaActivedescendent } from "./internal/aria-activedescendent";
import { reflectAriaControls, type Controllable } from './internal/aria-controls';
import { reflectAriaDisabled } from "./internal/aria-disabled";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { defaultSelected, reflectAriaSelected, type Selectable } from "./internal/aria-selected";
import { applyBehaviors } from "./internal/behavior";
import { keyCharacter } from "./internal/key-character";
import { keySpaceEnter } from "./internal/key-space-enter";
import { keyTab } from "./internal/key-tab";
import { activate, active, defaultList, firstActive, getFocuser, lastActive, nextActive, onDestroy, onSelect, previousActive, removeItem, type List } from "./internal/list";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onKeydown } from "./internal/on-keydown";
import { onPointerMoveChild, onPointerOut } from "./internal/on-pointer-move";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { getPrefix } from "./internal/utils";
import { keyDown, keyUp } from "./internal/key-up-down";
import { keyNavigation } from "./internal/key-navigation";
import { defaultOrientation, reflectAriaOrientation, type Orientable } from "./internal/aria-orientation";

export interface Tabs extends Labelable, List, Selectable, Orientable {
  tabs: HTMLElement[]
  panels: HTMLElement[]
}

export function createTabs(init?: Partial<Tabs>) {
  // prefix for generating unique IDs
  const prefix = getPrefix('tabs')

  // internal state for component
  let state: Tabs = {
    tabs: [],
    panels: [],
    ...defaultList(),
    ...defaultSelected,
    ...defaultOrientation,
    ...init,
  }

  console.log(state)

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Tabs>) => store.set(state = { ...state, ...part })

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

  const select = () => set(onSelect(state, state.tabs[state.selected]))

  // clear focus
  const none = () => focus(-1)

  // set the focus based on the HTMLElement passed which will be a menuitem element or null
  const focusNode = getFocuser(() => state, focus)

  const remove = (node: HTMLElement) => set(removeItem(state, node))

  // tablist
  function list(node: HTMLElement) {
    ensureID(node, prefix)
    // set({ controls: node.id })

    const destroy = applyBehaviors(node, [
      setRole('tablist'),
      reflectAriaLabel(store),
      reflectAriaOrientation(store),
      setTabIndex(-1),
      onClick(activate('[role="tab"]', focusNode, select)),
      onPointerMoveChild('[role="tab"]', focusNode),
      onPointerOut(none),
      onKeydown(
        keySpaceEnter(select),
        keyNavigation(first, previous, next, last),
      ),
      reflectAriaActivedescendent(store),
    ])

    return {
      destroy,
    }
  }

  function tab(node: HTMLElement, value: any) {
    ensureID(node, prefix)
    set({ tabs: [...state.tabs, node] })

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('tab'),
      reflectAriaSelected(store, value),
      // TODO: controls can be an array
      // reflectAriaControls(store),
      // reflectAriaDisabled(store),
      setTabIndex(0), // TODO: set tababble when selectedd
      onKeydown(
        keyUp(last),
        keyDown(first),
      ),
    ])

    return {
      destroy,
    }
  }

  function panel(node: HTMLElement, value: any) {
    ensureID(node, prefix)
    set({ panels: [...state.panels, node] })

    // const update = getUpdater(node, () => state, set)
    // update(options)

    const destroy = applyBehaviors(node, [
      setTabIndex(-1),
      setRole('tabpanel'),
      reflectAriaDisabled(store),
      // have list of labels
      // reflectAriaLabelledBy(store)
      onDestroy(remove),
    ])

    return {
      // update,
      destroy,
    }
  }

  // expose a subset of our state, derive the selected value
  const { subscribe } = derived(store, $state => {
    console.log($state)
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
