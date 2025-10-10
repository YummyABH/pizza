import { APIInstance } from './config'
import { APIYandexInstance } from './yandexConfig'

export const orderAPI = {
  async postOrder(data: object) {
    const url = '/api/orders/create'
    return await APIInstance(url, {
      method: 'POST',
      body: data,
    })
  },
  async getAddress(address: string) {
    const url = `/suggest?text=${address}&print_address=1&lang=ru&apikey=08dac8be-4652-4524-acf3-cdbf7c3c02e3`
    return await APIYandexInstance(url, {
      method: 'GET',
    })
  },
  async getHistoryOrder() {
    const url = '/api/orders/read-all'
    return await APIInstance(url, {
      method: 'GET',
    })
  },
}
