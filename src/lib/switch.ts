import { writable, type Writable } from "svelte/store";
import { ariaChecked, toggleChecked, type Checkable } from "./internal/aria-checked";
import { ariaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { onClick } from "./internal/on-click";
import { onSpaceEnter } from "./internal/on-space-enter";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";

export interface Switch extends Labelable, Checkable { }

const defaultState: Switch = {
  label: '',
  checked: false,
}

export const createSwitchBehaviors = (store: Writable<Switch>) => {
  const toggle = toggleChecked(store)

  return [
    setType('button'),
    setRole('switch'),
    setTabIndex(),
    ariaLabel(store),
    ariaChecked(store),
    onClick(toggle),
    onSpaceEnter(toggle),
  ]
}

export function createSwitch(state: Partial<Switch>) {
  const store = writable({ ...defaultState, ...state })

  function toggleSwitch(node: HTMLElement) {
    const unsubscribe = applyBehaviors(node, createSwitchBehaviors(store))

    return {
      destroy() {
        unsubscribe && unsubscribe()
      },
    }
  }

  const { subscribe } = store

  return {
    state: { subscribe },
    toggleSwitch,
  }
}
