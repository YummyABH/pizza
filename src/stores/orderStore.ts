import { defineStore } from 'pinia'
import { orderAPI } from '@/api/apiOrder'
import { reactive, ref, watch } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const savedOrder = localStorage.getItem('order')
  const initialOrder = savedOrder ? JSON.parse(savedOrder) : null

  const dataAddress = ref([])

  const order = reactive(
    initialOrder || {
      name: '',
      phone: '',
      delivery: {
        status: true,
        address: '',
        comment: '',
      },
      dishes: [],
      cutlery_status: false,
      cutlery_quantity: 1,
      order_comment: '',
    },
  )

  watch(
    order,
    (newOrder) => {
      console.log(order)

      localStorage.setItem('order', JSON.stringify(newOrder))
    },
    { deep: true },
  )

  function cutleryAdd() {
    return order.cutlery_quantity >= 50 ? (order.cutlery_quantity = 50) : order.cutlery_quantity++
  }

  function cutleryReduce() {
    return order.cutlery_quantity <= 1 ? (order.cutlery_quantity = 1) : order.cutlery_quantity--
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

  function deleteDish(removeDish: object) {
    order.dishes = order.dishes.filter(
      (dish) => JSON.stringify(dish) !== JSON.stringify(removeDish),
    )
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

  function normalizeDishOrder(dish: object) {
    return {
      id: dish.id,
      quantity: dish.quantity,
      size: dish.characteristics[dish.default_characteristics].size,
    }
  }

  async function postOrder() {
    try {
      const data = { ...order }
      data.dishes = data.dishes.map((dish) => normalizeDishOrder(dish))
      const result = await orderAPI.postOrder(data)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  function createDebouncedGeoRequest() {
    let timer = null

    return () => {
      clearTimeout(timer)

      timer = setTimeout(async () => {
        try {
          const result = await orderAPI.getAddress(order.delivery.address)
          const addresses = result.results.filter(
            (country) => country.address.component[0].name === 'Абхазия',
          )
          dataAddress.value = addresses.map((item) => {
            return item.address.formatted_address
          })
        } catch (error) {
          console.log('error', error)
        }
      }, 500)
    }
  }

  const debouncedRequestGeo = createDebouncedGeoRequest()

  return {
    order,
    dataAddress,
    cutleryAdd,
    cutleryReduce,
    clearDishesInOrder,
    dishAdd,
    dishReduce,
    addDishItem,
    deleteDish,
    postOrder,
    debouncedRequestGeo,
  }
})
