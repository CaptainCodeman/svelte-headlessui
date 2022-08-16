import { writable } from "svelte/store";
import { applyBehaviors } from "./internal/behavior";
import { onClick } from "./internal/on-click";
import { onSpaceEnter } from "./internal/on-space-enter";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { setHasPopup } from "./internal/set-has-popup";
import { ensureID } from "./internal/new-id";
import { onClickOutside } from "./internal/on-click-outside";
import { reflectAriaExpanded, type Expandable } from "./internal/aria-expanded";
import { reflectAriaControls, type Controllable } from './internal/aria-controls'
import { onPreviousNext } from "./internal/on-previous-next";
import { Keys } from "./internal/keys";
import { onKeyboard } from "./internal/on-keyboard";

export interface Menu extends Expandable, Controllable {
  active: number
  value: string
  label: string
}

export interface MenuState extends Menu {
  button?: HTMLElement
  menu?: HTMLElement
  items: { node: HTMLElement, value: string }[]
}

// TODO: avoid this being exportable by using inline tests
function createStateStore(init?: Partial<Menu>) {
  let state: MenuState = {
    label: '',
    active: -1,
    value: '',
    expanded: false,
    items: [],
    ...init,
  }

  const { subscribe, set } = writable(state)

  const update = (part: Partial<MenuState>) => {
    // if active is being set, also set value
    const { active } = part
    if (active !== undefined) {
      part.value = active === -1 || state.items.length === 0 ? undefined : state.items[active].value
    }
    set(state = { ...state, ...part })
  }

  const button = (node: HTMLElement) => update({ button: node })
  const menu = (node: HTMLElement) => update({ menu: node, controls: node ? node.id : undefined })
  const item = (node: HTMLElement, value: string) => update({ items: [...state.items, { node, value }] })
  const value = (node: HTMLElement, value: string) => update({ items: state.items.map(item => item.node === node ? { ...item, value } : item) })
  const remove = (node: HTMLElement) => update({ items: state.items.filter(item => item.node === node) })

  const open = () => update({ expanded: true, active: 0 })
  const close = () => update({ expanded: false })
  const toggle = () => state.expanded ? close() : open()

  // TODO: lots of these methods can become re-usable, based on "items" (?)
  const focus = (active: number) => update({ active })

  const first = () => focus(0)
  const previous = () => focus(state.active - 1)
  const next = () => focus(state.active + 1)
  const last = () => focus(state.items.length - 1)
  const none = () => focus(-1)
  const search = (query: string) => {
    // search for item from current position on, looping round items, set active to item found
    const searchable = state.active === -1
      ? state.items
      : state.items
        .slice(state.active + 1)
        .concat(state.items.slice(0, state.active + 1))

    const re = new RegExp(`^${query}`, 'i')
    // TODO: exclude disabled
    const found = searchable.findIndex(x => x.value.match(re))

    if (found > -1) {
      const index = (found + state.active + 1) % state.items.length
      focus(index)
    }
  }
  const select = (node: HTMLElement) => focus(state.items.findIndex(item => item.node === node))

  return {
    subscribe,
    button,
    menu,
    item,
    value,
    remove,
    open,
    close,
    toggle,
    focus,
    first,
    previous,
    next,
    last,
    none,
    search,
    select,
  }
}

export function createMenu(init?: Partial<Menu>) {
  const state = createStateStore(init)
  const prefix = 'headlessui-menu'

  // menubutton
  function button(node: HTMLElement) {
    ensureID(node, prefix + 'button')
    state.button(node)

    // const toggle = expandedToggle(close)
    const unsubscribe = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setHasPopup(),
      setTabIndex(),
      // ariaLabel(state),
      reflectAriaExpanded(state),
      reflectAriaControls(state),
      // ariaActiveDescendant(state),
      // ariaControls(state),
      onClick(state.toggle),
      onSpaceEnter(state.toggle),
      onPreviousNext(state.first, state.last),
      onKeyboard(state.search),
      // unselectWhenClosed(state),
    ])

    return {
      destroy() {
        // state.button(null)
        unsubscribe && unsubscribe()
      },
    }
  }

  function menu(node: HTMLElement) {
    ensureID(node, prefix)
    state.menu(node)

    node.tabIndex = 0

    const unsubscribe = applyBehaviors(node, [
      onClickOutside(state.close)
    ])

    node.addEventListener('keydown', e => {
      switch (e.key) {
        case Keys.Tab:
          e.preventDefault()
          e.stopPropagation()
          break
        case Keys.Escape:
          state.close()
          break
      }
    })

    return {
      destroy() {
        // state.menu(null)
        unsubscribe && unsubscribe()
      }
    }
  }

  function item(node: HTMLElement, value?: string) {
    ensureID(node, prefix + 'item')
    state.item(node, value || node.textContent!.trim())

    node.tabIndex = -1

    const select = () => state.select(node)
    node.addEventListener('pointerover', select)

    return {
      update(value?: string) {
        state.value(node, value || node.textContent!.trim())
      },
      destroy() {
        state.remove(node)
        node.removeEventListener('pointerover', select)
      }
    }
  }

  return {
    state,
    button,
    menu,
    item,
  }
}
