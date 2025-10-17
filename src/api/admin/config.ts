import { $fetch } from 'ofetch'

export const APIInstanceAdmin = $fetch.create({
  baseURL: 'https://restik-street-style.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwidXNlcm5hbWUiOiJzdXBlcnVzZXIiLCJyb2xlIjoyLCJpYXQiOjE3NjA2OTQ0MDMsImV4cCI6MTc2MDY5NjIwM30.kiH6kb9nzf0PPG5yWTAkAI2bkSqXNyi9S6doMMPFOtc',
  },
  async onResponse() {},
  async onResponseError({ response }) {
    return Promise.reject(response)
  },
})
