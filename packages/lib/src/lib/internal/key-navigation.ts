import type { KeyHandler } from "./key-handler"
import { keyEndPageDn, keyHomePageUp } from "./key-home-end"
import { keyDown, keyUp } from "./key-up-down"

export const keyNavigation = (first: Function, previous: Function, next: Function, last: Function): KeyHandler => {
  const handleFirst = keyHomePageUp(first)
  const handlePrevious = keyUp(previous)
  const handleNext = keyDown(next)
  const handleLast = keyEndPageDn(last)

  return event => {
    handleFirst(event)
    handlePrevious(event)
    handleNext(event)
    handleLast(event)
  }
}