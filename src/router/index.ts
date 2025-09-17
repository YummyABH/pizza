import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/assets/pages/HomePage.vue'
import MenuDishModal from '@/components/home/MenuDishModal.vue'
import OrderModalSide from '@/components/order/OrderModalSide.vue'

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
          path: ':dish/:category/:id',
          name: 'menuDishModal',
          component: MenuDishModal,
          meta: { lockScroll: true },
        },
        {
          path: '/order',
          name: 'OrderModalSide',
          component: OrderModalSide,
          meta: { lockScroll: true },
        },
      ],
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
