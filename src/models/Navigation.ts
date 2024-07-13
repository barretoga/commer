interface NavigationItem {
  title: string
  href: string
}

export interface Navigation extends NavigationItem {
  subitems?: NavigationItem[]
}
