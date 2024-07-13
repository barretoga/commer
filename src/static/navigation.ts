import { Navigation } from "@/models/Navigation";

export const navigationItems: Navigation[] = [
  {
    title: 'Página inicial',
    href: '/'
  },
  {
    title: 'Produtos',
    href: '/',
    subitems: [
      {
        title: 'Masculino',
        href: '/products/clothing-man'
      },
      {
        title: 'Feminino',
        href: '/products/clothing-woman'
      }
    ]
  },
  {
    title: 'Sobre',
    href: '/about'
  },
  {
    title: 'Contato',
    href: '/contact'
  }
]
