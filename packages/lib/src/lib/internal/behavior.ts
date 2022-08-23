export type Unsubscribe = () => void
export type Behavior = (node: HTMLElement) => Unsubscribe

export const noopUnsubscribe = () => { }

export function applyBehaviors(node: HTMLElement, behaviors: Behavior[]) {
  const unsubscribes = behaviors.map(behavior => behavior(node))
  return () => unsubscribes.forEach(unsubscribe => unsubscribe())
}
