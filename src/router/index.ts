import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/assets/pages/HomePage.vue'
import OrderModalSide from '@/components/order/OrderModalSide.vue'
import OrderHistory from '@/assets/pages/OrderHistory.vue'
import AdminLoginPage from '@/components/admin/AdminLoginPage.vue'
import AdminOrdersPage from '@/components/admin/AdminOrdersPage.vue'
import AdminMenuPage from '@/components/admin/auth/AdminMenuPage.vue'
import AdminUsersPage from '@/components/admin/auth/AdminUsersPage.vue'
import BaseMenuDishes from '@/components/admin/menu/BaseMenuDishes.vue'
import BaseMenuCategiryDishes from '@/components/admin/menu/BaseMenuCategiryDishes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { layout: 'user', lockScroll: false },
      children: [
        {
          path: '/order',
          name: 'OrderModalSide',
          component: OrderModalSide,
          meta: { layout: 'user', lockScroll: true },
        },
      ],
    },
    {
      path: '/order-history',
      name: 'OrderHistory',
      component: OrderHistory,
      meta: { layout: 'user', lockScroll: false },
    },
    {
      path: '/admin-login',
      name: 'AdminLoginPage',
      component: AdminLoginPage,
      meta: { layout: 'admin', lockScroll: true, noSidebar: true },
    },
    {
      path: '/admin-orders',
      name: 'AdminOrdersPage',
      component: AdminOrdersPage,
      meta: { layout: 'admin', lockScroll: false, noSidebar: false },
    },
    {
      path: '/admin-users',
      name: 'AdminUsersPage',
      component: AdminUsersPage,
      meta: { layout: 'admin', lockScroll: false, noSidebar: false },
    },
    {
      path: '/admin-menu',
      name: 'AdminMenuPage',
      component: AdminMenuPage,
      meta: { layout: 'admin', lockScroll: false, noSidebar: false },
      children: [
        {
          path: 'dishes',
          name: 'BaseMenuDishes',
          component: BaseMenuDishes,
          meta: { layout: 'admin', lockScroll: false, noSidebar: false },
        },
        {
          path: 'category-dishes',
          name: 'BaseMenuCategiryDishes',
          component: BaseMenuCategiryDishes,
          meta: { layout: 'admin', lockScroll: false, noSidebar: false },
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
