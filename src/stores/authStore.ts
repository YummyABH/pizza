import { authAPI } from '@/api/admin/auth'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const { login } = authAPI()

  const authData = reactive({
    password: '',
    username: '',
  })

  async function loginAdmin() {
    await login(authData)
  }

  return { authData, loginAdmin }
})
