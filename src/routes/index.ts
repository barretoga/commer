import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/routes/routes'

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
