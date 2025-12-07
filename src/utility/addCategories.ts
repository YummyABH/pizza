import { categoriesAPI } from "@/api/apiGetDish";
import type { CategoryDishes } from "@/types/api";
import { toRaw } from "vue";

export function addCatigories(categories:CategoryDishes[], lengthCategories: number) {
    console.log(categories);
    const categoriesRaw = toRaw(categories)
    const lengthCategoriesRaw = toRaw(lengthCategories)
    if (categoriesRaw.length > lengthCategories) {
        console.log(categories.slice(lengthCategoriesRaw, categoriesRaw.length));
        
        // categoriesAPI.addCategory(categories.slice(lengthCategories, categories.length))
    }
}