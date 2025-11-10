import { $fetch } from 'ofetch'
import { authAPI } from './auth'
import { useLogout } from '@/components/composible/useLogout'

const { refresh } = authAPI()
const { handlerLogout } = useLogout()

const APIInstanceAdminBase = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  async onRequest({ options }) {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return
    options.headers.set('Authorization', `Bearer ${accessToken}`)
  },
})

export const APIInstanceAdmin = async (url, options = {}) => {
  try {
    return await APIInstanceAdminBase(url, options)
  } catch (error) {
    if (error.response?.status === 401) {
      // handlerLogout()
    }
    if (error.response?.status === 403) {
      try {
        const refreshResponse = await refresh()
        if (!refreshResponse.accessToken) {
          throw new Error('No access token received after refresh')
        }
        localStorage.setItem('accessToken', refreshResponse.accessToken)
        return await APIInstanceAdminBase(url, { ...options, _retryAttempted: true })
      } catch (refreshError) {
        console.error('Refresh token error: ', refreshError)
        throw refreshError
      }
    }
    throw error
  }
}
