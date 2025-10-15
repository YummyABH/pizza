import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { authAPI } from '@/api/admin/auth.ts';

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const { login } = authAPI()

  const authData = reactive({
    password: '',
    username: '',
  })

  async function loginAdmin(body) {
    const result = await login(authData)
  }

  return { authData, loginAdmin }
})
