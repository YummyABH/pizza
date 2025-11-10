import { APIInstance } from './config'
import type { MenuCategory, CategoryDishes } from '@/types/api'

export const categoriesAPI = {
  async getCategories() {
    const url = '/api/categories/read-all'
    return await APIInstance<CategoryDishes[]>(url, {
      method: 'GET',
    })
  },
  async getDishes() {
    const url = '/api/categories/read-with-dishes'
    return await APIInstance<MenuCategory>(url, {
      method: 'GET',
    })
  },
}
