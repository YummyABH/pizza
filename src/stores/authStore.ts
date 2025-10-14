import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const authData = reactive({
    password: '',
    login: '',
  })

  return { authData }
})
