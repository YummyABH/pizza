import { $fetch, ofetch } from 'ofetch'
import { authAPI } from './auth'

const { refresh } = authAPI()

export const APIInstanceAdmin = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  async onRequest({ options }) {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return
    options.headers.append('Authorization', `Bearer ${accessToken}`)
  },

  async onResponse(response) {
    // const accessToken = response
    // console.log('response: ', accessToken)
    // localStorage.setItem('accessToken', accessToken)
  },
  async onResponseError({ response, request, options }) {
    if (response.status === 403) {
      try {
        await refresh()
        await ofetch.raw(request, options)
      } catch (error) {}
    }
  },
})
