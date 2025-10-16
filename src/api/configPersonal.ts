import { $fetch } from 'ofetch'

export const APIInstancePersonal = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    secret_key:
      'eyJhZG1pbl9pZCI6MywidXNlcm5hbWUiOiJrZW5ueSIsInJvbGUiOjEsImlhdCI6MTc2MDYxNzUwOCwiZXhwIjoxNzYwNjE4NDA4fQ.C2j72W455lnif-C_P5q1NJnIvqcCQeMf1OD7o2__bus',
  },
  async onResponse({ response }) {
    return response
  },
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
