import { $fetch } from 'ofetch'

export const APIYandexInstance = $fetch.create({
  baseURL: 'https://suggest-maps.yandex.ru/v1/',
  async onResponse({ response }) {
    return response
  },
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
