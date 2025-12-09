import { categoriesAPI } from '@/api/apiGetDish'
import type { CategoryDishes } from '@/types/api'
import { toRaw } from 'vue'

export async function addCatigories(categories: CategoryDishes[], lengthCategories: number) {
  const categoriesRaw = toRaw(categories)
  const lengthCategoriesRaw = toRaw(lengthCategories)
  let response = null
  if (categoriesRaw.length > lengthCategories) {
    const addCategoriesRequest = categories.slice(lengthCategoriesRaw, categories.length)

    const newCategoriesRequest = addCategoriesRequest.map((obj) => {
      const copy = { ...obj }
      delete copy['id']
      return copy
    })
    response = await categoriesAPI.addCategory({ categories: newCategoriesRequest })
  }

  const updateCategoriesRequest = categories.slice(0, lengthCategoriesRaw)
  await categoriesAPI.updateCategory({ categories: updateCategoriesRequest })

  return response
}
