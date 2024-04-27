import { allowDefaultKeyAction, keyHandler } from './key-handler'
import { Tab } from './keys'

export const keyTab = keyHandler([Tab])

export const keyTabAllow = keyHandler([Tab], allowDefaultKeyAction)
