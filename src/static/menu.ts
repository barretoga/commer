import { MenuItem } from "~/models/Menu";

export const menuItems: MenuItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: 'bx:home'
  },
  {
    name: 'Produtos',
    path: '/products',
    icon: 'bx:store'
  },
  {
    name: 'Perfil',
    path: '/profile',
    icon: 'bx:user',
    children: [
      {
        name: 'Meu Perfil',
        path: '/profile',
      },
      {
        name: 'Favoritos',
        path: '/favorites',
      },
    ]
  }
]
