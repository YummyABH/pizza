import { $fetch } from 'ofetch'

export const APIInstanceAdmin = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MywidXNlcm5hbWUiOiJrZW5ueSIsInJvbGUiOjEsImlhdCI6MTc2MDYyNDczNSwiZXhwIjoxNzYwNjI1NjM1fQ.4nKLP2_M2mMyEJbsuGEYLjfX5gtAtgmLZAleYbfMKh0',
  },
  async onResponse({ response }) {
    return response
  },
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
