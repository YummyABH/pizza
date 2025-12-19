import { APIInstanceAdmin } from './admin/config'
import { APIInstance } from './config'
import type { MenuCategory, CategoryDishes, MenuDishResponse, CategoryDishes } from '@/types/api'

export const categoriesAPI = {
  async getCategories() {
    const url = '/api/categories/read-all'
    return await APIInstance<CategoryDishes[]>(url, {
      method: 'GET',
    })
  },
  async getDishes() {
    const url = '/api/categories/read-with-dishes'
    return await APIInstance<MenuCategory[]>(url, {
      method: 'GET',
    })
  },
  async getAllDishes() {
    const url = '/api/dishes/read-all'
    return (await APIInstanceAdmin(url, {
      method: 'GET',
    })) as MenuDishResponse[]
  },

  async addCategory(data) {
    const url = '/api/categories/create'
    return (await APIInstanceAdmin(url, {
      method: 'POST',
      body: data,
    })) as CategoryDishes[]
  },
  async updateCategory(data) {
    const url = '/api/categories/update'
    return (await APIInstanceAdmin(url, {
      method: 'POST',
      body: data,
    })) as CategoryDishes[]
  },
  async delateDish(id: number) {
    const url = `/api/dishes/delete?dishId=${id}`
    return (await APIInstanceAdmin(url, {
      method: 'DELETE',
    })) as MenuDishResponse[]
  },
  async delateCategory(id: number) {
    const url = `/api/categories/delete?id=${id}`
    return (await APIInstanceAdmin(url, {
      method: 'DELETE',
    })) as MenuDishResponse[]
  },
  async updateDish(data) {
    const url = '/api/dishes/update'
    return (await APIInstanceAdmin(
      url,
      {
        method: 'POST',
        body: data,
      },
      'multipart/form-data',
    )) as MenuDishResponse[]
  },
  async createDish(data) {
    const url = '/api/dishes/create'
    return (await APIInstanceAdmin(
      url,
      {
        method: 'POST',
        body: data,
      },
      'multipart/form-data',
    )) as MenuDishResponse[]
  },
  async getPrices() {
    const url = '/api/cfg/read'
    return await APIInstanceAdmin(url, {
      method: 'GET',
    })
  },
  async updatePrices(data) {
    const url = '/api/cfg/update-price-list'
    return await APIInstance(url, {
      method: 'POST',
      body: { price_list: data },
    })
  },
  async updateTime(open, close) {
    const url = '/api/cfg/change-time'
    return await APIInstanceAdmin(url, {
      method: 'POST',
      body: { opens_at: open, closes_at: close },
    })
  },
}
