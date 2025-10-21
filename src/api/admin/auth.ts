import { refreshInstance } from '@/api/admin/configAuth.ts'
import { ofetch } from 'ofetch'

const authAPI = () => {
  const login = async (credentials) => {
    return await ofetch('https://restik-street-style.onrender.com/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
  }

  const logout = async (credentials) => {
    return await APIInstance('/auth/login', {
      method: 'POST',
      body: credentials,
    })
  }

  const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    return await ofetch('https://restik-street-style.onrender.com/api/auth/refresh', {
      method: 'POST',
      body: { token: refreshToken },
    })
  }

  return { login, refresh }
}

export { authAPI }
