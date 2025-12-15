import { authAPI } from '@/api/admin/auth'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { AuthData } from '@/types/stores'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const { login } = authAPI()

  const authData: AuthData = reactive({
    password: '',
    username: '',
  })

  async function loginAdmin(): Promise<void> {
    const response = await login(authData)
    const accessToken = response.accessToken || null
    const refreshToken = response.refreshToken || null
    console.log(accessToken)
    console.log(refreshToken)

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('username', JSON.stringify(authData.username))
  }

  return { authData, loginAdmin }
})
