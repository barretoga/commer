export interface MenuItem {
  name: string
  path: string
  icon: string
  children?: {
    name: string,
    path: string
  }[]
}
