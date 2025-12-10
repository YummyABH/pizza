import { defineStore } from 'pinia'
import { orderAPI } from '@/api/apiOrder'
import { reactive, ref, watch } from 'vue'
import type { OrderState } from '@/types/stores'
import type { MenuDishResponse, BaseDish } from '@/types/api'
import { toastCreate } from '@/utility/createToast'

export const useOrderStore = defineStore('order', () => {
  const savedOrder = localStorage.getItem('order')
  const initialOrder: OrderState | null = savedOrder ? JSON.parse(savedOrder) : null
  const isOpenOrderModal = ref<boolean>(false)

  const dataAddress = ref([])

  const order = reactive<OrderState>(
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
      localStorage.setItem('order', JSON.stringify(newOrder))
    },
    { deep: true },
  )

  function taggleOrderModal() {
    isOpenOrderModal.value = !isOpenOrderModal.value
  }

  function cutleryAdd(): number {
    return order.cutlery_quantity >= 50 ? (order.cutlery_quantity = 50) : order.cutlery_quantity++
  }

  function cutleryReduce(): number {
    return order.cutlery_quantity <= 1 ? (order.cutlery_quantity = 1) : order.cutlery_quantity--
  }

  function dishAdd(id: number, default_characteristics: number): number | void {
    const dish = order.dishes.find(
      (dish) => dish.id === id && dish.default_characteristics === default_characteristics,
    )
    if (dish) {
      return dish.quantity >= 99 ? (dish.quantity = 99) : dish.quantity++
    }
  }

  function dishReduce(id: number, default_characteristics: number): number | void {
    const dish = order.dishes.find(
      (dish) => dish.id === id && dish.default_characteristics === default_characteristics,
    )
    if (dish) {
      return dish.quantity <= 1 ? (dish.quantity = 1) : dish.quantity--
    }
  }

  function deleteDish(removeDish: MenuDishResponse): void {
    order.dishes = order.dishes.filter(
      (dish) => JSON.stringify(dish) !== JSON.stringify(removeDish),
    )
  }

  function clearDishesInOrder(): void {
    order.dishes = []
  }

  function addDishItem(newDish: MenuDishResponse, indexCharacteristics: number): boolean {
    const addDish = { ...newDish }
    let status: boolean = false

    for (const dish of order.dishes) {
      if (dish.id === addDish.id && dish.default_characteristics === indexCharacteristics) {
        status = true
        return status
      }
    }

    if (status) return status

    addDish.default_characteristics = indexCharacteristics
    order.dishes = [...order.dishes, addDish]
    return status
  }

  function normalizeDishOrder(dish: MenuDishResponse): BaseDish {
    return {
      id: dish.id,
      quantity: dish.quantity,
      size: dish.characteristics[dish.default_characteristics].size,
    }
  }

  async function postOrder() {
    try {
      const rawData = { ...order }
      const normalizeData = {
        ...rawData,
        dishes: rawData.dishes.map((dish) => normalizeDishOrder(dish)),
      }
      const result = await orderAPI.postOrder(normalizeData)
      toastCreate('Заказ успешно создан !', 'success')
      return result
    } catch (error) {
      toastCreate('Произошла ошибка, повторите попытку.', 'error')
      console.log(error)
    }
  }

  function createDebouncedGeoRequest() {
    let timer: number | undefined = undefined

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
    isOpenOrderModal,
    cutleryAdd,
    cutleryReduce,
    clearDishesInOrder,
    dishAdd,
    dishReduce,
    addDishItem,
    deleteDish,
    postOrder,
    debouncedRequestGeo,
    taggleOrderModal,
  }
})
