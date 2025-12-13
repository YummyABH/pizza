import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuDishResponse, CategoryDishes } from '@/types/api'

export const useAdminMenuStore = defineStore('adminMenu', () => {
  const adminMenu = ref<CategoryDishes[]>([])
  const adminDishes = ref<MenuDishResponse[]>([])
  const adminPrices = ref([])
  const adminEditDish = ref<MenuDishResponse>({
    id: null,
    name: '',
    category_id: 1,
    category_name: null,
    characteristics: [
      {
        size: '',
        price: '',
        measure: '',
        quantity: '',
      },
    ],
    composition: [],
    default_characteristics: 0,
    description: '',
    dish_status: false,
    image: null,
    position: null,
  })

  const lengthAdminMenu = ref<number>(0)

  function resetAdminEditDish() {
    adminEditDish.value = {
      id: null,
      name: '',
      category_id: 1,
      category_name: null,
      characteristics: [
        {
          size: '',
          price: '',
          measure: '',
          quantity: '',
        },
      ],
      composition: [],
      default_characteristics: 0,
      description: '',
      dish_status: false,
      image: null,
      position: null,
    }
  }

  function updateAdminCategory(newValue: CategoryDishes[]) {
    if (!newValue) return
    adminMenu.value = [...newValue]
    updateLengthAdminMenu()
  }

  function updateAdminPrices(newValue) {
    if (!newValue) return
    adminPrices.value = [...newValue]
  }

  function deleteAdminDishesItem(id: number) {
    adminDishes.value = adminDishes.value.filter((item) => item.id !== id)
  }

  function updateAdminDishes(newValue: MenuDishResponse[]) {
    if (!newValue) return
    adminDishes.value = [...newValue]
  }

  function updateAdminDishesItem(newValue: MenuDishResponse, idEdit: number) {
    if (!newValue) return
    adminDishes.value.map((item, index) =>
      item.id === idEdit ? (adminDishes.value[index] = newValue) : '',
    )
  }

  function updateEditDish(id: number) {
    const item = adminDishes.value.find((item) => item.id === id)
    adminEditDish.value = JSON.parse(JSON.stringify(item))
  }

  function delateCharacteristics(index: number) {
    adminEditDish.value?.characteristics.splice(index, 1)
  }

  function addCharacteristics() {
    const characteristic = {
      size: '',
      price: '',
      measure: '',
      quantity: '',
    }
    adminEditDish.value?.characteristics.push(characteristic)
  }

  function addPrice() {
    const characteristic = {
      to: '',
      from: '',
      price: '',
    }
    adminEditDish.value?.characteristics.push(characteristic)
  }

  function updateLengthAdminMenu() {
    lengthAdminMenu.value = adminMenu.value.length
  }

  function updateFieldEditDish(field: string, value: unknown) {
    if (!(field in adminEditDish.value)) return
    adminEditDish.value[field] = value
  }

  function addAdminCategory() {
    const newPosition = adminMenu.value[adminMenu.value.length - 1].position + 1
    const newId = adminMenu.value[adminMenu.value.length - 1].id + 1
    adminMenu.value.push({ position: newPosition, id: newId, name: '', status: false })
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

  function deleteCategoriesItem(id: number) {
    const indexDelete = adminMenu.value.findIndex((el) => el.id === id)
    adminMenu.value.splice(indexDelete, 1)
  }

  function taggleStatusDish() {
    if (!('dish_status' in adminEditDish.value)) return
    adminEditDish.value.dish_status = !adminEditDish.value?.dish_status
  }

  return {
    adminMenu,
    adminDishes,
    adminEditDish,
    lengthAdminMenu,
    adminPrices,
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
    deleteAdminDishesItem,
    resetAdminEditDish,
    deleteCategoriesItem,
    updateAdminPrices,
    addPrice,
  }
})
