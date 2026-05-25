import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import App from './App.vue'
import { i18n } from './locales'
import router from './router'
import './styles/global.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(MotionPlugin)
app.mount('#app')