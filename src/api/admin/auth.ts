
import { ofetch } from 'ofetch'

const authAPI = () => {
  const login = async (credentials) => {
    return await ofetch('https://pizzaabh.ru/api/auth/login', {
      method: 'POST',
      body: credentials,
    })
  }

  const logout = async (credentials: string) => {
    const refreshToken = localStorage.getItem('refreshToken')
    return await ofetch('https://pizzaabh.ru/api/auth/logout', {
      method: 'POST',
      body: credentials,
      headers: { 'refresh-token': refreshToken },
    })
  }


  const refresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    return await ofetch('https://pizzaabh.ru/api/auth/refresh', {
      method: 'POST',
      headers: { 'refresh-token': refreshToken },
    })
  }

  return { login, refresh, logout }
}

export { authAPI }
