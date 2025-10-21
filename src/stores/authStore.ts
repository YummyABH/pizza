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
    console.log('response ', response)

    const accessToken = response.accessToken || null
    const refreshToken = response.refreshToken || null

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  return { authData, loginAdmin }
})
