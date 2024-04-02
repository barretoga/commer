import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import App from './App.vue'
import router from './routes'
import { ToastOptions } from '~/configs/toast'

import '~/assets/styles/index.css'
import 'vue-toastification/dist/index.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(Toast, ToastOptions)
  .mount('#app')
