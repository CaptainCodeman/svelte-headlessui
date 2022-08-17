import { writable } from "svelte/store";
import { reflectAriaActivedescendent } from "./internal/aria-activedescendent";
import { reflectAriaControls, type Controllable } from './internal/aria-controls';
import { defaultExpanded, focusOnExpanded, reflectAriaExpanded, type Expandable } from "./internal/aria-expanded";
import { reflectAriaLabel, type Labelable } from "./internal/aria-label";
import { applyBehaviors } from "./internal/behavior";
import { defaultList, type List } from "./internal/list";
import { ensureID } from "./internal/new-id";
import { onClick } from "./internal/on-click";
import { onClickOutside } from "./internal/on-click-outside";
import { onEscape } from "./internal/on-escape";
import { onSearch } from "./internal/on-search";
import { onPointerOver } from "./internal/on-pointer-over";
import { onPreviousNext } from "./internal/on-previous-next";
import { onSpaceEnter } from "./internal/on-space-enter";
import { setHasPopup } from "./internal/set-has-popup";
import { setRole } from "./internal/set-role";
import { setTabIndex } from "./internal/set-tab-index";
import { setType } from "./internal/set-type";
import { onKeydown } from "./internal/on-keydown";

export interface Listbox extends Labelable, Expandable, Controllable, List { }

export interface ListboxState extends Listbox {
  button?: string
  menu?: string
}

// TODO: avoid this being exportable by using inline tests
function createStateStore(init?: Partial<Listbox>) {
  let state: ListboxState = {
    ...defaultList,
    ...defaultExpanded,
    ...init,
  }

  const { subscribe, set } = writable(state)

  const update = (part: Partial<ListboxState>) => {
    const { active } = part
    if (active !== undefined) {
      // if active is being set, also set value so it's in sync (UI can use either)
      part.value = active === -1 || state.items.length === 0 ? undefined : state.items[active].value
    }
    set(state = { ...state, ...part })
  }

  // attaching elements to store
  const button = (node: HTMLElement) => update({ button: node.id })
  const menu = (node: HTMLElement) => update({ menu: node.id, controls: node ? node.id : undefined })
  const item = (node: HTMLElement, value: string) => update({ items: [...state.items, { id: node.id, value }] })
  const value = (node: HTMLElement, value: string) => update({ items: state.items.map(item => item.id === node.id ? { ...item, value } : item) })
  const remove = (node: HTMLElement) => update({ items: state.items.filter(item => item.id === node.id) })

  const open = () => update({ expanded: true, active: 0 })
  const close = () => update({ expanded: false })
  const toggle = () => state.expanded ? close() : open()

  const focus = (active: number) => update({ expanded: true, active })
  const first = () => focus(0)
  const previous = () => focus(Math.max(state.active - 1, 0))
  const next = () => focus(Math.min(state.active + 1, state.items.length - 1))
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
    const found = searchable.findIndex(x => x.value.match(re))  // TODO: exclude disabled

    if (found > -1) {
      const index = (found + state.active + 1) % state.items.length
      focus(index)
    }
  }
  const select = (node: HTMLElement) => focus(state.items.findIndex(item => item.id === node.id))
  const selected = () => {
    const { active, value } = state
    return { active, value }
  }

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
    selected,
  }
}

export function createListbox(init?: Partial<Listbox>) {
  const prefix = 'headlessui-listbox'
  const state = createStateStore(init)
  let onSelect = () => { }
  const select = () => onSelect()

  // menubutton
  function button(node: HTMLElement) {
    ensureID(node, prefix + 'button')
    state.button(node)

    onSelect = () => {
      node.dispatchEvent(new CustomEvent('select', { detail: state.selected() }))
      state.close()
    }

    const destroy = applyBehaviors(node, [
      setType('button'),
      setRole('button'),
      setHasPopup(),
      setTabIndex(0),
      reflectAriaLabel(state),
      reflectAriaExpanded(state),
      reflectAriaControls(state),
      onClick(state.toggle),
      onKeydown(
        onSpaceEnter(state.toggle),
        onPreviousNext(state.last, state.first),
      ),
      // unselectWhenClosed(state),
    ])

    return {
      destroy,
    }
  }

  function menu(node: HTMLElement) {
    ensureID(node, prefix)
    state.menu(node)

    const destroy = applyBehaviors(node, [
      setTabIndex(0),
      onClickOutside(state.close),
      onClick(select),
      onKeydown(
        onSpaceEnter(select),
        onEscape(state.close),
        onPreviousNext(state.previous, state.next),
        onSearch(state.search),
      ),
      focusOnExpanded(state),
      reflectAriaActivedescendent(state),
    ])

    return {
      destroy,
    }
  }

  function item(node: HTMLElement, value?: string) {
    ensureID(node, prefix + 'item')
    state.item(node, value || node.textContent!.trim())

    const destroy = applyBehaviors(node, [
      setTabIndex(-1),
      onPointerOver(state.select),
    ])

    return {
      update(value?: string) {
        state.value(node, value || node.textContent!.trim())
      },
      destroy,
    }
  }

  return {
    state,
    button,
    menu,
    item,
  }
}
