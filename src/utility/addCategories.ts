import { categoriesAPI } from '@/api/apiGetDish'
import type { CategoryDishes } from '@/types/api'
import { toRaw } from 'vue'

export function addCatigories(categories: CategoryDishes[], lengthCategories: number) {
  const categoriesRaw = toRaw(categories)
  const lengthCategoriesRaw = toRaw(lengthCategories)
  if (categoriesRaw.length > lengthCategories) {
    const addCategoriesRequest = categories.slice(lengthCategoriesRaw, categories.length)

    const newCategoriesRequest = addCategoriesRequest.map((obj) => {
      const copy = { ...obj }
      delete copy['id']
      return copy
    })
    categoriesAPI.addCategory({ categories: newCategoriesRequest })
  }

  const updateCategoriesRequest = categories.slice(0, lengthCategoriesRaw)
  categoriesAPI.updateCategory({ categories: updateCategoriesRequest })
  console.log(updateCategoriesRequest)
}
