import { derived, writable } from "svelte/store";
import { defaultCheckable, reflectAriaChecked, type Checkable } from "./internal/aria-checked";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { keySpaceEnter } from "./internal/key-space-enter";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onKeydown } from "./internal/on-keydown";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { getPrefix } from "./internal/utils";

// TODO: rename "toggle" or "toggleSwitch", to avoid `const switch = createSwitch()`
export interface Switch extends Labelable, Checkable { }

export function createSwitch(init?: Partial<Switch>) {
  // prefix for generating unique IDs
  const prefix = getPrefix('switch')

  let state: Switch = {
    ...defaultCheckable,
    ...init,
  }

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Switch>) => store.set(state = { ...state, ...part })

  const on = () => set({ checked: true })
  const off = () => set({ checked: false })
  const toggle = () => state.checked ? off() : on()

  function button(node: HTMLElement) {
    ensureID(node, prefix)

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('switch'),
      setTabIndex(0),
      reflectAriaLabel(store),
      reflectAriaChecked(store),
      onClick(toggle),
      onKeydown(
        keySpaceEnter(toggle),
      ),
    ])

    return {
      destroy
    }
  }

  // expose a subset of our state, derive the selected value
  const { subscribe } = derived(store, $state => {
    const { checked } = $state
    return { checked }
  })

  return {
    subscribe,
    button,
    set,
  }
}