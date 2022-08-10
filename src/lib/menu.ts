import { writable, type Writable } from "svelte/store";
import { ariaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { onKeyboard } from "./internal/on-keyboard";
import { onClick } from "./internal/on-click";
import { onSpaceEnter } from "./internal/on-space-enter";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { toggleExpanded, type Expandable } from "./internal/aria-expanded";
import { setHasPopup } from "./internal/set-has-popup";

export interface Menu extends Labelable, Expandable { }

const defaultState: Menu = {
  label: '',
  expanded: false,
}

export const createMenuBehaviors = (store: Writable<Menu>) => {
  const toggle = toggleExpanded(store)

  return [
    setType('button'),
    setRole('button'),
    setHasPopup(),
    setTabIndex(),
    ariaLabel(store),
    // ariaExpanded(store),
    onClick(toggle),
    onSpaceEnter(toggle),
  ]
}

export function createMenu(state: Partial<Menu>) {
  const store = writable({ ...defaultState, ...state })

  function button(node: HTMLElement) {
    const unsubscribe = applyBehaviors(node, createMenuBehaviors(store))

    return {
      destroy() {
        unsubscribe && unsubscribe()
      },
    }
  }

  function list(node: HTMLElement) {

  }

  function item(node: HTMLElement) {

  }

  // TODO: warn if list isn't found etc...

  const { subscribe } = store

  return {
    state: { subscribe },
    button,
    list,
    item,
  }
}