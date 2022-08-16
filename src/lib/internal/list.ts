export interface ListItem {
  id: string
  value: string
}

export interface List {
  items: ListItem[]
  active: number
}

export const defaultList: List = {
  items: [],
  active: -1,
}