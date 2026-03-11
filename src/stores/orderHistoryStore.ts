import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CreateOrderResponse } from '@/types/api'

export const useOrderHistoryStore = defineStore('orderHistory', () => {
  const historyOrder = ref<CreateOrderResponse[]>([])
  const isView = ref(0)

  function isViewAdd() {
    isView.value++
  }
  
  function isViewReset() {
    isView.value = 0
  }
  
  function addHistoryOrder(newValue: CreateOrderResponse) {
    if (!newValue) return

    historyOrder.value.unshift(newValue)
  }

  async function updateStatusOrder(newValue: CreateOrderResponse, id: number) {
    const idUpdatedOrder: number = historyOrder.value.findIndex(item => item.id === id)
    
    historyOrder.value[idUpdatedOrder] = newValue
  }

  function updateHistoryOrder(newValue: CreateOrderResponse[]): void {
    if (!newValue) return

    historyOrder.value = [...newValue]
  }
  return { historyOrder, isView, updateHistoryOrder, addHistoryOrder, updateStatusOrder, isViewAdd, isViewReset }
})
