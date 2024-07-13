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
      }
    ]
  }
]

export default routes
