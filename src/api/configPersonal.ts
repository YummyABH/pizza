import { $fetch } from 'ofetch'

export const APIInstancePersonal = $fetch.create({
  baseURL: 'https://cemubribepit.beget.app',
  headers: {
    'Content-Type': 'application/json',
    'secret-key': localStorage.getItem('secretKey'),
  },
  async onResponse() {},
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
