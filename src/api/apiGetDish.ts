import { APIInstanceAdmin } from './admin/config'
import { APIInstance } from './config'
import type { MenuCategory, CategoryDishes, MenuDishResponse } from '@/types/api'

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
    return await APIInstanceAdmin(url, {
      method: 'GET',
    }) as MenuDishResponse[]
  }
}
