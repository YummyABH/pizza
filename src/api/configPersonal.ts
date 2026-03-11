import { $fetch } from 'ofetch'

let APIInstancePersonal: ReturnType<typeof $fetch.create> | null = null

export function getAPIInstance() {
  if (!APIInstancePersonal) {
    APIInstancePersonal = $fetch.create({
      baseURL: 'https://pizzaabh.ru',
      headers: {
        'Content-Type': 'application/json',
      },
      async onRequest({ request, options }) {
        const secretKey = localStorage.getItem('secretKey')
        if (secretKey) {
          options.headers = {
            ...options.headers,
            'secret-key': secretKey
          }
        }
      },
      async onResponseError({ response }) {
        return Promise.reject(response)
      },
    })
  }
  return APIInstancePersonal
}
