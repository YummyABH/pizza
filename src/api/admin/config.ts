import { $fetch } from 'ofetch'

export const APIInstanceAdmin = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MywidXNlcm5hbWUiOiJrZW5ueSIsInJvbGUiOjEsImlhdCI6MTc2MDYzOTcwOCwiZXhwIjoxNzYwNjQxNTA4fQ.Ba7MFDBw2LKM7ucyKK_gPlL9RPjNPXUXkyeTapjl0Sg',
  },
  async onResponse({ response }) {
    return response
  },
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
