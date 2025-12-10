import { categoriesAPI } from '@/api/apiGetDish'
import type { CategoryDishes } from '@/types/api'
import { toRaw } from 'vue'

export async function addCatigories(categories: CategoryDishes[], lengthCategories: number) {
  const categoriesRaw = toRaw(categories)
  const lengthCategoriesRaw = toRaw(lengthCategories)
  let statusResponse: boolean = true
  let response = null
  if (categoriesRaw.length > lengthCategories) {
    const addCategoriesRequest = categories.slice(lengthCategoriesRaw, categories.length)

    const newCategoriesRequest = addCategoriesRequest.map((obj) => {
      const copy = { ...obj }
      delete copy['id']
      return copy
    })
    try {
      response = await categoriesAPI.addCategory({ categories: newCategoriesRequest })
    } catch (error) {
      statusResponse = false
    }
  }

  const updateCategoriesRequest = categories.slice(0, lengthCategoriesRaw)

  try {
    await categoriesAPI.updateCategory({ categories: updateCategoriesRequest })
  } catch (error) {
    statusResponse = false
  }

  return { response, statusResponse }
}
