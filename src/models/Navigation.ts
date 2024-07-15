interface NavigationItem {
  title: string
  to: string
}

export interface Navigation extends NavigationItem {
  subitems?: NavigationItem[]
}
