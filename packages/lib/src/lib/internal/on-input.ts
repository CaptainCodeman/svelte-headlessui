import { listener, terminateEvent } from "./events"

type FilterFn = (value: string) => void

// TODO: ensure node is type HTMLInputElement when applied
export const onInput = (fn: FilterFn) => (node: HTMLElement) => listener(node, 'input', terminateEvent(event => {
  const el = event.target as HTMLInputElement
  fn(el.value)
}))
