import type { Behavior } from "./behavior"

export function onPointerOver(fn: (node: HTMLElement) => void): Behavior {
  return node => {
    const handler = (_event: PointerEvent) => {
      fn(node)
    }

    node.addEventListener('pointerover', handler)
    return () => node.removeEventListener('pointerover', handler)
  }
}
