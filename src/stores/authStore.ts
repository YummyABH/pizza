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
    const response = await login(authData)
    const accessToken = response.accessToken || null
    const refreshToken = response.refreshToken || null
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('username', JSON.stringify(authData.username))
  }

  return { authData, loginAdmin }
})
