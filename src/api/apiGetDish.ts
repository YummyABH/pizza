import { APIInstance } from './config'

export const categoriesAPI = {
  async getCategories() {
    const url = '/api/categories/read-all'
    return await APIInstance(url, {
      method: 'GET',
    })
  },
  async getDishes() {
    const url = '/api/categories/read-with-dishes'
    return await APIInstance(url, {
      method: 'GET',
    })
  },
}
