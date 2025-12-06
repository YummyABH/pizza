import { categoriesAPI } from "@/api/apiGetDish";
import type { CategoryDishes } from "@/types/api";

export function addCatigories(categories:CategoryDishes[], lengthCategories: number) {
    console.log(categories);
    
    if (categories.length > lengthCategories) {
        console.log(categories.slice(lengthCategories, categories.length));
        
        // categoriesAPI.addCategory(categories.slice(lengthCategories, categories.length))
    }
}