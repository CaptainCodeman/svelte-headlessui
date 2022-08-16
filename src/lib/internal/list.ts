export interface ListItem {
  id: string
  value: string
}

export interface List {
  items: ListItem[]
  active: number
  value: string
}

export const defaultList: List = {
  items: [],
  active: -1,
  value: ''
}