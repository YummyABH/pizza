import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import type { MenuDishResponse, CategoryDishes } from '@/types/api'

export const useAdminMenuStore = defineStore('adminMenu', () => {
  const adminMenu = ref<CategoryDishes[]>([])
  const adminDishes = ref<MenuDishResponse[]>([])
  const adminEditDish = ref<MenuDishResponse>({
    id: null,
    name: null,
    category_id: null,
    category_name: null,
    characteristics: [{
       size: null,
       price: null,
       measure: null,
       quantity: null,
    }],
    composition: [],
    default_characteristics: null,
    description: null,
    dish_status: null,
    image: null,
    position: null,
  })

  const lengthAdminMenu = ref<number>(0)

  function updateAdminCategory(newValue: CategoryDishes[]) {
    if (!newValue) return
    adminMenu.value = [...newValue]
  }

  function updateAdminDishes(newValue: MenuDishResponse[]) {
    if (!newValue) return
    adminDishes.value = [...newValue]
  }

  function updateAdminDishesItem(newValue: MenuDishResponse, id: number) {
    if (!newValue) return
    adminDishes.value[id] = newValue
    
  }

  function updateEditDish(id: number) {
    adminEditDish.value = JSON.parse(JSON.stringify(adminDishes.value[id]))
  }

  function delateCharacteristics(index: number) {
    adminEditDish.value?.characteristics.splice(index, 1)
  }

  function addCharacteristics() {
    const characteristic = {
      size: '',
      price: '',
      measure: '',
      quantity: ''
    }
    adminEditDish.value?.characteristics.push(characteristic)
  }

  function updateLengthAdminMenu() {
      lengthAdminMenu.value = adminMenu.value.length
  }

  function updateFieldEditDish(field: string, value: unknown) {
    if (!adminEditDish.value[field]) return
    adminEditDish.value[field] = value  
  }

  function addAdminCategory() {
    const newId = adminMenu.value[adminMenu.value.length - 1].id + 1
    adminMenu.value.push({ id: newId, name: '' })
  }

  function updateAdminIngredient(index: number, value: string) {
    if (!adminEditDish.value) return
    adminEditDish.value.composition[index] = value
  }
  
  function delateAdminComposition(index: number) {
    if (!adminEditDish.value) return
    adminEditDish.value.composition.splice(index, 1)
  }
  
  function addAdminComposition() {
    if (!adminEditDish.value) return
    adminEditDish.value.composition.push('')
  }
  function taggleStatusDish() {
    if (!('dish_status' in adminEditDish.value)) return
    adminEditDish.value.dish_status = !adminEditDish.value?.dish_status
  }

  return {
    adminMenu,
    adminDishes: readonly(adminDishes),
    adminEditDish,
    lengthAdminMenu,
    updateAdminDishes,
    updateAdminCategory,
    addAdminCategory,
    updateEditDish,
    taggleStatusDish,
    updateFieldEditDish,
    delateCharacteristics,
    addCharacteristics,
    updateAdminIngredient,
    delateAdminComposition,
    addAdminComposition,
    updateLengthAdminMenu,
    updateAdminDishesItem,
  }
})
