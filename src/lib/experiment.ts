import { writable, derived, type Readable } from 'svelte/store'

// experiment to split internal / external state

// benefit: store part is simpler / self contained, easier to test independently
// drawback: have to re-export functions that need to be external (or can be rely entirely on state?)

interface External {
  active: number
  value: string | null
}

interface Internal extends External {
  button?: HTMLElement
  menu?: HTMLElement
  items: { node: HTMLElement, value: string }[]
}

function createInternal() {
  const state: Internal = {
    items: [],
    active: -1,
    value: null,
  }

  const { subscribe, update } = writable(state)

  const first = () => update(x => ({ ...x, active: 0 }))
  const last = () => update(x => ({ ...x, active: x.items.length - 1 }))
  const previous = () => update(x => ({ ...x, active: x.active - 1 }))
  const next = () => update(x => ({ ...x, active: x.active + 1 }))
  const isActive = (node: HTMLElement) => state.items[state.active].node === node

  return {
    subscribe,
    first, last, previous, next, isActive
  }
}

function createExternal(internal: ReturnType<typeof createInternal>) {
  const external = derived<Readable<Internal>, External>(internal, $internal => {
    const { active, value } = $internal
    return { active, value }
  })

  return {
    ...internal,
    ...external,
  }
}

const internal = createInternal()
const external = createExternal(internal)

external.subscribe(x => console.log(x.active))

// alternative: move all methods into createComponent function for access and then just export public state

// benefit: self contained, easier to control what is / isn't internal vs external
// drawback: harder to test store part

function createComponent(init?: Partial<Internal>) {
  const state: Internal = {
    items: [],
    active: -1,
    value: null,
    ...init,
  }

  const { subscribe, update } = writable<Internal>(state)

  const first = () => update(x => ({ ...x, active: 0 }))
  const last = () => update(x => ({ ...x, active: x.items.length - 1 }))
  const previous = () => update(x => ({ ...x, active: x.active - 1 }))
  const next = () => update(x => ({ ...x, active: x.active + 1 }))
  const isActive = (node: HTMLElement) => state.items[state.active].node === node

  function button(button: HTMLElement) {
    update(x => ({ ...x, button }))
  }

  const external = derived<Readable<Internal>, External>(internal, $internal => {
    const { active, value } = $internal
    return { active, value }
  })

  return {
    state: { ...external, isActive },
    button,
  }
}

const { state, button } = createComponent()

// state.isActive(item)
state.subscribe(x => x.active)