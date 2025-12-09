import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/assets/pages/HomePage.vue'
import OrderModalSide from '@/components/order/OrderModalSide.vue'
import OrderHistoryPage from '@/assets/pages/OrderHistoryPage.vue'
import AdminLoginPage from '@/components/admin/AdminLoginPage.vue'
import AdminOrdersPage from '@/components/admin/AdminOrdersPage.vue'
import AdminUsersPage from '@/components/admin/auth/AdminUsersPage.vue'
import BaseMenuDishes from '@/components/admin/menu/BaseMenuDishes.vue'
import BaseMenuCategiryDishes from '@/components/admin/menu/BaseMenuCategiryDishes.vue'
import EditDishesPage from '@/components/admin/EditDishesPage.vue'
import CreateDishPage from '@/components/admin/CreateDishPage.vue'

const authGuard = function (to, from, next) {
  const isAuth = localStorage.getItem('accessToken') || null
  // const responce = authAPI.check(isAuth)
  if (isAuth == null) next({ path: '/admin-login' })
  else next()
}

const loginGuard = function (to, from, next) {
  const isAuth = localStorage.getItem('accessToken') || null
  if (isAuth !== null) next({ path: '/admin-orders' })
  else next()
}

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
      name: 'OrderHistoryPage',
      component: OrderHistoryPage,
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
      path: '/admin-login',
      name: 'AdminLoginPage',
      component: AdminLoginPage,
      meta: { layout: 'admin', lockScroll: true, noSidebar: true },
      beforeEnter: loginGuard,
    },
    {
      path: '/admin-orders',
      name: 'AdminOrdersPage',
      component: AdminOrdersPage,
      meta: { layout: 'admin', lockScroll: false, noSidebar: false },
      beforeEnter: authGuard,
    },
    {
      path: '/admin-users',
      name: 'AdminUsersPage',
      component: AdminUsersPage,
      meta: { layout: 'admin', lockScroll: false, noSidebar: false },
      beforeEnter: authGuard,
    },
    {
      path: '/admin-menu',
      meta: { layout: 'admin', lockScroll: false, noSidebar: false },
      beforeEnter: authGuard,
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
        {
          path: 'dishes/edit/:id',
          name: 'EditDishesPage',
          component: EditDishesPage,
          meta: { layout: 'admin', lockScroll: false, noSidebar: false },
        },
        {
          path: 'dishes/create',
          name: 'CreateDishPage',
          component: CreateDishPage,
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
