export const setFocus = (node: HTMLElement) => async (focus: boolean) => {
  if (focus) {
    // may need to wait for svelte to update UI before we can set focus
    requestAnimationFrame(() => node.focus())
  }
}
