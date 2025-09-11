import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/assets/pages/HomePage.vue'
import MenuDishModal from '@/components/home/MenuDishModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      children: [
        {
          path: ':dish/:category/:id/:slug',
          name: 'menuDishModal',
          component: MenuDishModal,
        },
      ],
    },
  ],
})

export default router
