export type Unsubscribe = () => void
export type Behavior = (node: HTMLElement) => Unsubscribe | void

export function applyBehaviors(node: HTMLElement, behaviors: Behavior[]) {
  const unsubscribes = behaviors.map(behavior => behavior(node)).filter(x => x !== undefined)
  return () => unsubscribes.forEach(unsubscribe => unsubscribe && unsubscribe())
}