import { Navigation } from "@/models/Navigation";

export const navigationItems: Navigation[] = [
  {
    title: 'Página inicial',
    to: '/'
  },
  {
    title: 'Produtos',
    to: '/',
    subitems: [
      {
        title: 'Masculino',
        to: '/products/clothing/man'
      },
      {
        title: 'Feminino',
        to: '/products/clothing/woman'
      },
      {
        title: 'Infantil',
        to: '/products/clothing/kids'
      }
    ]
  },
  {
    title: 'Sobre',
    to: '/about'
  },
  {
    title: 'Contato',
    to: '/contact'
  }
]
