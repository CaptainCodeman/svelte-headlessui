import type { Behavior } from "./behavior"

export function onPointerMove(fn: (node: HTMLElement) => void): Behavior {
  return node => {
    const handler = () => fn(node)

    node.addEventListener('pointermove', handler)
    return () => node.removeEventListener('pointermove', handler)
  }
}

export function onPointerOut(fn: () => void): Behavior {
  return node => {
    const handler = () => fn()

    node.addEventListener('pointerout', handler)
    return () => node.removeEventListener('pointerout', handler)
  }
}

export function onPointerMoveChild(selector: string, fn: (node: HTMLElement | null) => void): Behavior {
  return node => {
    const handler = (event: PointerEvent) => {
      if (event.target !== node) {
        const el = (event.target as Element).closest(selector)
        fn(el as HTMLElement)
      }
    }

    node.addEventListener('pointermove', handler)
    return () => node.removeEventListener('pointermove', handler)
  }
}
