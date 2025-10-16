import { APIInstancePersonal } from './configPersonal'
import { APIInstance } from './config'
import { APIYandexInstance } from './yandexConfig'
import { APIInstanceAdmin } from '@/api/admin/config'

export const orderAPI = {
  async postOrder(data: object) {
    const url = '/api/orders/create'
    return await APIInstancePersonal(url, {
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
    const url = '/api/orders/user-orders'
    return await APIInstancePersonal(url, {
      method: 'GET',
    })
  },
  async getAllOrder() {
    const url = '/api/orders/read-all'
    return await APIInstanceAdmin(url, {
      method: 'GET',
    })
  },
}
