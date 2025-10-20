import { $fetch } from 'ofetch'

export const APIInstanceAdmin = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
},
  async onRequest({ options }) {
    const accessToken = localStorage.getItem('accessToken')
    console.log('accessToken: ', accessToken)

    if (!accessToken) return
    options.headers.append('Authorization', `Bearer ${accessToken}`) 
  },

  async onResponse() {},
  async onResponseError({ response }) {
    if (response?.detail === 'jwt must be provided') {
      
    }
  },
})
