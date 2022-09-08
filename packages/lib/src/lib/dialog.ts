import { derived, writable } from "svelte/store";
import { defaultExpanded, reflectAriaExpanded, type Expandable } from "./internal/aria-expanded";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { keyEscape } from "./internal/key-escape";
import { keySpaceEnter } from "./internal/key-space-enter";
import { ensureID } from "./internal/new-id";
import { onClickOutside } from "./internal/on-click-outside";
import { onKeydown } from "./internal/on-keydown";
import { setHasPopup } from "./internal/set-has-popup";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { getPrefix } from "./internal/utils";

export interface Dialog extends Expandable, Labelable { }

export function createDialog(init?: Partial<Dialog>) {
  // prefix for generating unique IDs
  const prefix = getPrefix('dialog')

  let state: Dialog = {
    ...defaultExpanded,
    ...init,
  }

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Dialog>) => store.set(state = { ...state, ...part })

  const open = () => set({ expanded: true })
  const close = () => set({ expanded: false })
  const toggle = () => state.expanded ? close() : open()

  // modal
  function modal(node: HTMLElement) {
    ensureID(node, prefix)

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setHasPopup(),
      setTabIndex(0),
      reflectAriaExpanded(store),
      reflectAriaLabel(store),
      onClickOutside(close),
      onKeydown(
        keyEscape(close),
        keySpaceEnter(toggle),
      )
    ])

    return {
      destroy,
    }
  }

  // expose a subset of our state, derive the selected value
  const { subscribe } = derived(store, $state => {
    const { expanded } = $state
    return { expanded }
  })

  return {
    subscribe,
    modal,
    open,
    close,
  }
}
