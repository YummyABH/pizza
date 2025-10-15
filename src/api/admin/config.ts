import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  async onResponse({ response }) {
    return response
  },
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
