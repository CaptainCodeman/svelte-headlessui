import { allowDefaultKeyAction, keyHandler } from "./key-handler"
import { Backspace } from "./keys"

export const keyBackspace = keyHandler([Backspace])

export const keyBackspaceAllow = keyHandler([Backspace], allowDefaultKeyAction)
