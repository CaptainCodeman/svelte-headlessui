export const setAriaAttributeString = (name: string) => (node: HTMLElement) => (id?: string) => id
  ? node.setAttribute(name, id)
  : node.removeAttribute(name)

export const setAriaAttributeBoolean = (name: string) => (node: HTMLElement) => (value?: boolean) => value === undefined
  ? node.removeAttribute(name)
  : node.setAttribute(name, value.toString())