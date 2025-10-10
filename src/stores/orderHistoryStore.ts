import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderHistoryStore = defineStore('orderInput', () => {
  const historyOrder = ref([])

  function updateHistoryOrder(newValue) {
    if (!newValue) return

    historyOrder.value = [...newValue]
  }
  return { historyOrder, updateHistoryOrder }
})
