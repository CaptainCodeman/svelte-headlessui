import type { Orientation } from "./aria-orientation"
import type { Callable } from "./callable"
import type { KeyHandler } from "./key-handler"
import { keyEndPageDn, keyHomePageUp } from "./key-home-end"
import { keyLeft, keyRight } from "./key-left-right"
import { keyDown, keyUp } from "./key-up-down"

export const keyNavigation = (first: Callable, previous: Callable, next: Callable, last: Callable, orientation: Orientation = 'vertical'): KeyHandler => {
  const handleFirst = keyHomePageUp(first)
  const handlePrevious = orientation === 'vertical' ? keyUp(previous) : keyLeft(previous)
  const handleNext = orientation === 'vertical' ? keyDown(next) : keyRight(next)
  const handleLast = keyEndPageDn(last)

  return event => {
    handleFirst(event)
    handlePrevious(event)
    handleNext(event)
    handleLast(event)
  }
}