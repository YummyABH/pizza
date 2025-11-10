import { $fetch } from 'ofetch'

export const APIInstancePersonal = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    secret_key: localStorage.getItem('secretKey'),
  },
  async onResponse() {},
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
