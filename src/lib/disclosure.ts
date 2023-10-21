import { derived, writable } from "./internal/store";
import { reflectAriaControls, type Controllable } from "./internal/aria-controls";
import { defaultExpanded, focusOnClose, focusOnExpanded, reflectAriaExpanded, type Expandable } from "./internal/aria-expanded";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { keyEscape } from "./internal/key-escape";
import { keySpaceEnter } from "./internal/key-space-enter";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onKeydown } from "./internal/on-keydown";
import { setHasPopup } from "./internal/set-has-popup";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { getPrefix } from "./internal/utils";

export interface Disclosure extends Labelable, Expandable, Controllable {
  button?: string
  panel?: string
}

export function createDisclosure(init?: Partial<Disclosure>) {
  // prefix for generating unique IDs
  const prefix = getPrefix('disclosure')

  let state: Disclosure = {
    ...defaultExpanded,
    ...init,
  }

  // wrap with store for reactivity
  const store = writable(state)

  // update state and notify store of changes for reactivity
  const set = (part: Partial<Disclosure>) => store.set(state = { ...state, ...part })

  const open = () => set({ expanded: true, opened: true })
  const close = () => set({ expanded: false })
  const toggle = () => state.expanded ? close() : open()

  // button
  function button(node: HTMLElement) {
    ensureID(node, prefix)
    set({ button: node.id })

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setHasPopup(),
      setTabIndex(0),
      reflectAriaExpanded(store),
      reflectAriaLabel(store),
      reflectAriaControls(store),
      onClick(toggle),
      onKeydown(
        keyEscape(close),
        keySpaceEnter(toggle),
      ),
      focusOnClose(store),
    ])

    return {
      destroy,
    }
  }

  // panel
  function panel(node: HTMLElement) {
    ensureID(node, prefix)
    set({ panel: node.id, controls: node.id })

    const destroy = applyBehaviors(node, [
      focusOnExpanded(store),
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
    button,
    panel,
    open,
    close,
    set,
  }
}
