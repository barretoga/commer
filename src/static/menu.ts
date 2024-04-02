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
    icon: 'bx:bxl-product-hunt',
    children: [
      {
        name: 'Mesa Computador',
        path: '/products/mesa',
      },
      {
        name: 'Colchão',
        path: '/products/mesa',
      },
      {
        name: 'Cadeira',
        path: '/products/mesa',
      },
    ]
  }
]
