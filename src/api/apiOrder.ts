import { APIInstance } from './config'

export const orderAPI = {
  async postOrder(data: object) {
    const url = '/api/orders/create'
    return await APIInstance(url, {
      method: 'POST',
      body: data,
    })
  },
}
