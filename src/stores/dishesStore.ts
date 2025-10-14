import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'

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

  function dishAdd(indexCategory: number, indexDish: number) {
    const dish = dishes.value[indexCategory].dishes[indexDish]
    if (!dish) return

    return dish.quantity >= 99 ? (dish.quantity = 99) : dish.quantity++
  }

  function dishReduce(indexCategory: number, indexDish: number) {
    const dish = dishes.value[indexCategory].dishes[indexDish]
    if (!dish) return

    return dish.quantity <= 1 ? (dish.quantity = 1) : dish.quantity--
  }

  return {
    updateDishes,
    updateDefaultCharacteristics,
    dishAdd,
    dishReduce,
    dishes: readonly(dishes),
  }
})
