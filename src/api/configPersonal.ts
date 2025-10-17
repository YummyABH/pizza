import { $fetch } from 'ofetch'

export const APIInstancePersonal = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    secret_key:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MywidXNlcm5hbWUiOiJrZW5ueSIsInJvbGUiOjEsImlhdCI6MTc2MDYzNzQyOCwiZXhwIjoxNzYwNjM4MzI4fQ.93oCx49i3HEz1lxK9NXsntPyjsXzs0r_hlAX5M9H-zw',
  },
  async onResponse() {
  },
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
