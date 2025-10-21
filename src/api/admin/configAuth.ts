import { $fetch } from 'ofetch'
import { authAPI } from '@/api/admin/auth.ts'

// const { refresh, logout, check } = authAPI()

export const refreshInstance = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com/api',

  async onRequest({ request, options }) {
    // const token = localStorage.getItem('refresh_token')
    // if (token) {
    //   options.headers = request?.headers || {}
    //   options.headers['Authorization'] = `Bearer ${token}`
    // }
  },
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  },
})
