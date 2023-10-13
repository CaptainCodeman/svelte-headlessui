import { derived, writable } from "svelte/store";
import { defaultExpanded, type Expandable } from "./internal/aria-expanded";
import { reflectAriaModal } from "./internal/aria-modal";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { keyEscape } from "./internal/key-escape";
import { ensureID } from "./internal/new-id";
import { onClickOutside } from "./internal/on-click-outside";
import { onKeydown } from "./internal/on-keydown";
import { setRole } from "./internal/set-role";
import { getPrefix } from "./internal/utils";
import { trapFocusOnOpen } from "./internal/focus";

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

  const open = () => set({ expanded: true, opened: true })
  const close = () => set({ expanded: false })

  // modal
  function modal(node: HTMLElement) {
    ensureID(node, prefix)

    const destroy = applyBehaviors(node, [
      setRole('dialog'),
      reflectAriaModal(store),
      reflectAriaLabel(store),
      trapFocusOnOpen(store),
      onClickOutside(() => [node], close),
      onKeydown(
        keyEscape(close),
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
    set,
  }
}
