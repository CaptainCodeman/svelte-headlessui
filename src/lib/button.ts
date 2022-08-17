import { writable } from "svelte/store";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { defaultPressable, reflectAriaPressed, type Pressable } from "./internal/aria-pressed";
import { applyBehaviors } from "./internal/behavior";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onSpaceEnter } from "./internal/on-space-enter";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";

// really a toggle button
export interface Button extends Pressable, Labelable { }

function createStateStore(init?: Partial<Button>) {
  let state: Button = {
    ...defaultPressable,
    ...init,
  }

  const { subscribe, set } = writable(state)

  const update = (part: Partial<Button>) => {
    set(state = { ...state, ...part })
  }

  const press = () => update({ pressed: true })
  const release = () => update({ pressed: false })
  const toggle = () => state.pressed ? release() : press()

  return {
    subscribe,
    press,
    release,
    toggle,
  }
}

export function createButton(init?: Partial<Button>) {
  const state = createStateStore(init)
  const prefix = 'headlessui-button'

  // button
  function button(node: HTMLElement) {
    ensureID(node, prefix)

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setTabIndex(0),
      reflectAriaPressed(state),
      reflectAriaLabel(state),
      onClick(state.toggle),
      onSpaceEnter(state.toggle),
    ])

    return {
      destroy,
    }
  }

  return {
    state,
    button,
  }
}
