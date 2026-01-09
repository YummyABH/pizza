import { $fetch } from 'ofetch'

export const APIInstancePersonal = $fetch.create({
  baseURL: 'https://pizzaabh.ru',
  headers: {
    'Content-Type': 'application/json',
    'secret-key': localStorage.getItem('secretKey'),
  },
  async onResponse() {},
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
