import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CreateOrderResponse } from '@/types/api'

export const useOrderHistoryStore = defineStore('orderHistory', () => {
  const historyOrder = ref<CreateOrderResponse[]>([])

  function updateHistoryOrder(newValue: CreateOrderResponse[]): void {
    if (!newValue) return

    historyOrder.value = [...newValue]
  }
  return { historyOrder, updateHistoryOrder }
})
