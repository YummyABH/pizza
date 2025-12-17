import { categoriesAPI } from '@/api/apiGetDish'
import type { CategoryDishes } from '@/types/api'
import { toRaw } from 'vue'

export async function addCatigories(categories: CategoryDishes[]) {
  const categoriesRaw = toRaw(categories)
  let statusResponse: boolean = true
  const response = null

  try {
    await categoriesAPI.updateCategory({ categories: categoriesRaw })
  } catch (error) {
    statusResponse = false
  }

  return { response, statusResponse }
}
