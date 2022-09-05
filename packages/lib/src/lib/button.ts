import { derived, writable } from "svelte/store";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { defaultPressable, reflectAriaPressed, type Pressable } from "./internal/aria-pressed";
import { applyBehaviors } from "./internal/behavior";
import { keySpaceEnter } from "./internal/key-space-enter";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onKeydown } from "./internal/on-keydown";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";

// really a toggle button
export interface Button extends Pressable, Labelable { }

export function createButton(init?: Partial<Button>) {
  // prefix for generating unique IDs
  const prefix = 'headlessui-button'

  let state: Button = {
    ...defaultPressable,
    ...init,
  }

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Button>) => store.set(state = { ...state, ...part })

  const press = () => set({ pressed: true })
  const release = () => set({ pressed: false })
  const toggle = () => state.pressed ? release() : press()

  // button
  function button(node: HTMLElement) {
    ensureID(node, prefix)

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setTabIndex(0),
      reflectAriaPressed(store),
      reflectAriaLabel(store),
      onClick(toggle),
      onKeydown(
        keySpaceEnter(toggle),
      )
    ])

    return {
      destroy,
    }
  }

  // expose a subset of our state, derive the selected value
  const { subscribe } = derived(store, $state => {
    const { pressed } = $state
    return { pressed }
  })

  return {
    subscribe,
    button,
  }
}
