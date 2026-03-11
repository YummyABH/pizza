import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://pizzaabh.ru',
  headers: {
    'Content-Type': 'application/json',
  },
})
