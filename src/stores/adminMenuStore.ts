import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import type { MenuDishResponse, CategoryDishes } from '@/types/api'

export const useAdminMenuStore = defineStore('adminMenu', () => {
  const adminMenu = ref<CategoryDishes[]>([])
  const adminDishes = ref<MenuDishResponse[]>([])
  const adminEditDish = ref<MenuDishResponse | null>(null)

  function updateAdminCategory(newValue: CategoryDishes[]) {
    if (!newValue) return

    adminMenu.value = [...newValue]
  }

  function updateAdminDishes(newValue: MenuDishResponse[]) {
    if (!newValue) return
    adminDishes.value = [...newValue]
  }

  function updateEditDish(id: number) {
    adminEditDish.value = JSON.parse(JSON.stringify(adminDishes.value[id]))
  }

  function addAdminCategory() {
    const newId = adminMenu.value[adminMenu.value.length - 1].id + 1
    adminMenu.value.push({ id: newId, name: '' })
  }

  function taggleStatusDish() {
    if (!('dish_status' in adminEditDish.value)) return
    adminEditDish.value.dish_status = !adminEditDish.value?.dish_status
  }

  return {
    adminMenu: readonly(adminMenu),
    adminDishes: readonly(adminDishes),
    adminEditDish: readonly(adminEditDish),
    updateAdminDishes,
    updateAdminCategory,
    addAdminCategory,
    updateEditDish,
    taggleStatusDish,
  }
})
