import { $fetch } from 'ofetch'

export const APIInstance = $fetch.create({
  baseURL: 'https://cemubribepit.beget.app',
  headers: {
    'Content-Type': 'application/json',
  },
})
