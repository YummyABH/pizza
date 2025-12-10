import { $fetch } from 'ofetch'
import { authAPI } from '@/api/admin/auth.ts'

// const { refresh, logout, check } = authAPI()

export const refreshInstance = $fetch.create({
  baseURL: 'https://cemubribepit.beget.app/api',

  async onRequest({ request, options }) {},
  async onResponseError({ response }) {
    return Promise.reject('ошибка ', response)
  },
})
