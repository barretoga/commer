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
        component: () => import('@/views/Home.vue'),
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
        component: () => import('@/views/ProductDetail.vue'),
      }
    ]
  }
]

export default routes
