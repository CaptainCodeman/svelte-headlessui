// convince TS that the property we checked does then exist!
export function hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return prop in obj
}

export function isDisabled(node: HTMLElement) {
  return hasOwnProperty(node, 'disabled')
    ? node.hasAttribute('disabled')
    : node.getAttribute('disabled') === 'true'
}