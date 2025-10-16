import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderAllStore = defineStore('orderAll', () => {
  const allHistoryOrder = ref([])

  function updateAllHistoryOrder(newValue) {
    if (!newValue) return

    allHistoryOrder.value = [...newValue]
  }
  return { allHistoryOrder, updateAllHistoryOrder }
})
