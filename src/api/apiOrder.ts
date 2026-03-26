import { APIInstance } from './config'
import { getAPIInstance } from './configPersonal'
import { APIYandexInstance } from './yandexConfig'
import { APIInstanceAdmin } from '@/api/admin/config'
import type { CreateOrderRequest, CreateOrderResponse } from '@/types/api'

const APIInstancePersonal = getAPIInstance()

export const orderAPI = {
  async postOrder(data: CreateOrderRequest) {
    const url = '/api/orders/create'
    console.log(localStorage.getItem('secretKey'));
    
    return await APIInstancePersonal<CreateOrderResponse>(url, {
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
  async postUpdateStatus(id: number) {
    const url = '/api/orders/access-order'
    return await APIInstanceAdmin(url, {
      method: 'POST',
      body: { id: id },
    })
  },
  async getPublicKeyNotification() {
    const url = '/api/push/public-key'
    return await APIInstancePersonal(url, {
      method: 'GET',
    })
  },
  async notificationSubscribeAdmin(subscription) {
    const url = '/api/push/subscribe-admin'
    return await APIInstanceAdmin(url, {
      method: 'POST',
      body: subscription,
    })
  },
  async notificationSubscribeUser(subscription) {
    const url = '/api/push/subscribe-client'
    return await APIInstancePersonal(url, {
      method: 'POST',
      body: subscription,
    })
  },
  async notificationUnsubscribe(endpoint) {
    const url = 'api/push/unsubscribe'
    return await APIInstance(url, {
      method: 'DELETE',
      body: {endpoint},
    })
  },
}
