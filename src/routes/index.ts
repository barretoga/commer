import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes/routes'

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default router
