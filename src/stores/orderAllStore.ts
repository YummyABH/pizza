import { orderAPI } from '@/api/apiOrder'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderAllStore = defineStore('orderAll', () => {
  const allHistoryOrder = ref([])

  function updateAllHistoryOrder(newValue) {
    if (!newValue) return

    allHistoryOrder.value = [...newValue]
  }

  function addHistoryOrder(newValue) {
    if (!newValue) return

    allHistoryOrder.value.push(newValue)
  }

  async function updateStatusOrder(id: number) {
    await orderAPI.postUpdateStatus(id)
  }

  return { allHistoryOrder, updateAllHistoryOrder, addHistoryOrder, updateStatusOrder }
})
