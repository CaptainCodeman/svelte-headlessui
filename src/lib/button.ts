import { writable, type Writable } from "svelte/store";
import { ariaLabel, type Labelable } from "./internal/aria-label";
import { ariaPressed, togglePressed, type Pressable } from "./internal/aria-pressed";
import { applyBehaviors } from "./internal/behavior";
import { onKeyboard } from "./internal/on-keyboard";
import { onClick } from "./internal/on-click";
import { onSpaceEnter } from "./internal/on-space-enter";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";

// really a toggle button

export interface Button extends Labelable, Pressable { }

const defaultState: Button = {
  label: '',
  pressed: false,
}

export const createButtonBehaviors = (store: Writable<Button>) => {
  const toggle = togglePressed(store)

  return [
    setType('button'),
    setRole('button'),
    setTabIndex(),
    ariaLabel(store),
    ariaPressed(store),
    onClick(toggle),
    onSpaceEnter(toggle),
  ]
}

export function createButton(state: Partial<Button>) {
  const store = writable({ ...defaultState, ...state })

  function button(node: HTMLElement) {
    const unsubscribe = applyBehaviors(node, createButtonBehaviors(store))

    return {
      destroy() {
        unsubscribe && unsubscribe()
      },
    }
  }

  const { subscribe } = store

  return {
    state: { subscribe },
    button,
  }
}