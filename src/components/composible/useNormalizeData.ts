import type { MenuDishResponse } from "@/types/api"

export function normalizeData(data:MenuDishResponse, type: string = 'update') {
    const formData = new FormData()

    formData.append('category_id', data.category_id)
    formData.append('description', data.description)
    if (type !== 'create') {
        formData.append('id', data.id)
    }
    formData.append('name', data.name)
    formData.append('dish_status', data.dish_status)
    formData.append('characteristics', JSON.stringify(data.characteristics))
    formData.append('composition', JSON.stringify(data.composition))    
    if (typeof data.image === 'object') {
        formData.append('image', data.image)
    }
    return formData
}