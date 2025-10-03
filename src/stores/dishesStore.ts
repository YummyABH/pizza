import { defineStore } from 'pinia'
import { readonly, ref, watch } from 'vue'

export const useDishesStore = defineStore('dishes', () => {
  const dishes = ref([])

  function updateDishes(newValue) {
    if (!newValue) return

    dishes.value = [...newValue]
  }

  function updateDefaultCharacteristics(
    newDefaultCharacteristics: number,
    indexCategory: number,
    indexDish: number,
  ) {
    if (!dishes.value[indexCategory].dishes[indexDish]) return
    dishes.value[indexCategory].dishes[indexDish].default_characteristics =
      newDefaultCharacteristics
  }

  return { updateDishes, updateDefaultCharacteristics, dishes: readonly(dishes) }
})
