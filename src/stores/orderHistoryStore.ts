import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CreateOrderResponse } from '@/types/api'

export const useOrderHistoryStore = defineStore('orderHistory', () => {
  const historyOrder = ref<CreateOrderResponse[]>([])

  function addHistoryOrder(newValue: CreateOrderResponse) {
    if (!newValue) return

    historyOrder.value.unshift(newValue)
  }

  async function updateStatusOrder(newValue: CreateOrderResponse, id: number) {
    const idUpdatedOrder: number = historyOrder.value.findIndex(item => item.id === id)
    console.log('historyOrder.value[idUpdatedOrder]: ', historyOrder.value[idUpdatedOrder]);
    console.log('newValue: ', newValue);
    
    historyOrder.value[idUpdatedOrder] = newValue
  }

  function updateHistoryOrder(newValue: CreateOrderResponse[]): void {
    if (!newValue) return

    historyOrder.value = [...newValue]
  }
  return { historyOrder, updateHistoryOrder, addHistoryOrder, updateStatusOrder }
})
