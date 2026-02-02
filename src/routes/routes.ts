import type { RouteRecordRaw } from 'vue-router'
import BlankLayout from '@/layouts/BlankLayout.vue'

interface RouteLayout {
  path: string
  component: any
  children: RouteRecordRaw[]
}

const routes: RouteLayout[] = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: '/products/clothing/man',
        name: 'men-clothing',
        component: () => import('@/views/categories/MenClothing.vue'),
      },
      {
        path: '/products/clothing/woman',
        name: 'women-clothing',
        component: () => import('@/views/categories/WomenClothing.vue'),
      },
      {
        path: '/products/clothing/kids',
        name: 'kids-clothing',
        component: () => import('@/views/categories/KidsClothing.vue'),
      },
      {
        path: '/products/accessories',
        name: 'accessories',
        component: () => import('@/views/categories/Accessories.vue'),
      },
      {
        path: '/product/:id',
        name: 'product-detail',
        component: () => import('@/views/products/ProductDetail.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/About.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('@/views/contact/Contact.vue'),
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/views/favorites/Favorites.vue'),
      }
    ]
  }
]

export default routes
