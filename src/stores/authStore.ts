import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const authData = reactive({
    password: '',
    login: '',
  })

  return { authData }
})
