import { APIInstance, refreshInstance } from '@/api/admin/configAuth.ts'
import { ofetch } from 'ofetch'

const authAPI = () => {
  const login = async (credentials) => {
    return await APIInstance('/auth/login', {
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

  const refresh = async (refreshToken) => {
    return await refreshInstance('/auth/refresh', {
      method: 'POST',
      body: { refreshToken: refreshToken },
    })
  }

  const check = async (accessToken) => {
    return await ofetch('https://apsny-billboard-production.up.railway.app/api/auth/token-check', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  return { logout, login, getIP, refresh, check }
}

export { authAPI }
