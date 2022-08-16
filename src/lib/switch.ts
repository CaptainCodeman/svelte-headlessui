import { writable } from "svelte/store";
import { reflectAriaChecked, defaultCheckable, type Checkable } from "./internal/aria-checked";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onSpaceEnter } from "./internal/on-space-enter";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";

export interface Switch extends Labelable, Checkable { }

function createStateStore(init?: Partial<Switch>) {
  let state: Switch = {
    ...defaultCheckable,
    ...init,
  }

  const { subscribe, set } = writable(state)

  const update = (part: Partial<Switch>) => {
    set(state = { ...state, ...part })
  }

  const on = () => update({ checked: true })
  const off = () => update({ checked: false })
  const toggle = () => state.checked ? off() : on()

  return {
    subscribe,
    on,
    off,
    toggle,
  }
}

export function createSwitch(init?: Partial<Switch>) {
  const state = createStateStore(init)
  const prefix = 'headlessui-switch'

  function button(node: HTMLElement) {
    ensureID(node, prefix)

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('switch'),
      setTabIndex(0),
      reflectAriaLabel(state),
      reflectAriaChecked(state),
      onClick(state.toggle),
      onSpaceEnter(state.toggle),
    ])

    return {
      destroy
    }
  }

  return {
    state,
    button,
  }
}