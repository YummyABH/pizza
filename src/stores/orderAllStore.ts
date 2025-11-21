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

    allHistoryOrder.value.push(newValue)
  }

  async function updateStatusOrder(id: number) {
    await orderAPI.postUpdateStatus(id)
  }

  return { allHistoryOrder, updateAllHistoryOrder, addHistoryOrder, updateStatusOrder }
})
