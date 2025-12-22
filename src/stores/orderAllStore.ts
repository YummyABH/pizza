import { orderAPI } from '@/api/apiOrder'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CreateOrderResponse } from '@/types/api'

export const useOrderAllStore = defineStore('orderAll', () => {
  const allHistoryOrder = ref<CreateOrderResponse[]>([])

  function updateAllHistoryOrder(newValue: CreateOrderResponse[]) {
    if (!newValue) return

    allHistoryOrder.value = [...newValue]
  }

  function addHistoryOrder(newValue: CreateOrderResponse) {
    if (!newValue) return

    allHistoryOrder.value.unshift(newValue)
  }

  async function updateStatusOrder(newValue: CreateOrderResponse, id: number) {
    const idUpdatedOrder: number = allHistoryOrder.value.findIndex((item) => item.id === id)
    allHistoryOrder.value[idUpdatedOrder] = newValue
  }

  return { allHistoryOrder, updateAllHistoryOrder, addHistoryOrder, updateStatusOrder }
})
