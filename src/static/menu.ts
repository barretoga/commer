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
    icon: 'bx:store',
    children: [
      {
        name: 'Masculino',
        path: '/products/male',
      },
      {
        name: 'Feminino',
        path: '/products/female',
      },
      {
        name: 'Infantil',
        path: '/products/kids',
      },
    ]
  }
]
