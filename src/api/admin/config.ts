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
    options.headers.set('Authorization', `Bearer ${accessToken}`)
  },

  async onResponseError({ response, request, options }) {
    if (response.status === 403) {
      try {
        const refreshResponse = await refresh()
        localStorage.setItem('accessToken', refreshResponse.accessToken)
        const newOptions = { ...options, retry: true }

        const newResponse = await ofetch.raw(request, newOptions)

        Object.assign(response, newResponse)
        console.log('newResponse._data: ', newResponse._data)
        console.log('response._data: ', response._data)

        response.status = newResponse.status
        response._data = newResponse._data
      } catch (error) {
        console.log('error: ', error)
      }
    }
  },
})
