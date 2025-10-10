import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/assets/pages/HomePage.vue'
import OrderModalSide from '@/components/order/OrderModalSide.vue'
import OrderHistory from '@/assets/pages/OrderHistory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { lockScroll: false },
      children: [
        {
          path: '/order',
          name: 'OrderModalSide',
          component: OrderModalSide,
          meta: { lockScroll: true },
        },
      ],
    },
    {
      path: '/order-history',
      name: 'OrderHistory',
      component: OrderHistory,
      meta: { lockScroll: false },
    },
  ],
})

const toggleBodyScroll = (lock: unknown) => {
  document.body.style.overflow = lock ? 'hidden' : ''
}

router.afterEach((to) => {
  // Проверяем по пути (или по meta)
  const shouldLock = to.meta.lockScroll
  toggleBodyScroll(shouldLock)
})

export default router
