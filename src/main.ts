import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
app.use(createPinia())
app.use(router)
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 1500 
})

app.mount('#app')