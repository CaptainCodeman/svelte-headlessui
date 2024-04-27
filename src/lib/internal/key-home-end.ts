import { keyHandler } from './key-handler'
import { Home, PageUp, End, PageDown } from './keys'

export const keyHomePageUp = keyHandler([Home, PageUp])
export const keyEndPageDn = keyHandler([End, PageDown])
