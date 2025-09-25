import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

export const useDishesStore = defineStore('dishes', () => {
  const dishes = ref([])

  function updateDishes(newValue) {
    if (!newValue) return

    dishes.value = [...newValue]
  }

  return { updateDishes, dishes: readonly(dishes) }
})
