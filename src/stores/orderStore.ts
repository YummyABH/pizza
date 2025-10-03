import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const savedOrder = localStorage.getItem('order')
  const initialOrder = savedOrder ? JSON.parse(savedOrder) : null

  const order = reactive(
    initialOrder || {
      phone: '',
      name: '',
      delivery: {
        status: true,
        address: '',
        comment: '',
      },
      dishes: [],
      cutlery_status: false,
      number_cutlery: 1,
      payment_card: null,
      order_comment: '',
      status: true,
      price: 0,
    },
  )

  watch(
    order,
    (newOrder) => {
      localStorage.setItem('order', JSON.stringify(newOrder))
    },
    { deep: true },
  )

  function cutleryAdd() {
    return order.number_cutlery >= 50 ? (order.number_cutlery = 50) : order.number_cutlery++
  }

  function cutleryReduce() {
    return order.number_cutlery <= 1 ? (order.number_cutlery = 1) : order.number_cutlery--
  }

  function dishAdd(id: number, default_characteristics: number) {
    const dish = order.dishes.find(
      (dish) => dish.id === id && dish.default_characteristics === default_characteristics,
    )
    return dish.quantity >= 99 ? (dish.quantity = 99) : dish.quantity++
  }

  function dishReduce(id: number, default_characteristics: number) {
    const dish = order.dishes.find(
      (dish) => dish.id === id && dish.default_characteristics === default_characteristics,
    )
    return dish.quantity <= 1 ? (dish.quantity = 1) : dish.quantity--
  }

  function clearDishesInOrder() {
    order.dishes = []
  }

  function addDishItem(newDish: object, indexCharacteristics?: string) {
    const addDish = { ...newDish }
    let status = false

    for (const dish of order.dishes) {
      if (dish.id === addDish.id && dish.default_characteristics === indexCharacteristics) {
        status = true
        return
      }
    }

    if (status) return

    addDish.default_characteristics = indexCharacteristics
    order.dishes = [...order.dishes, addDish]
  }

  return { order, cutleryAdd, cutleryReduce, clearDishesInOrder, dishAdd, dishReduce, addDishItem }
})
