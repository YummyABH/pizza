import type { MenuDishResponse } from "@/types/api"

export function normalizeData(data:MenuDishResponse) {
    const formData = new FormData()

    formData.append('category_id', data.category_id)
    formData.append('category_name', data.category_name)
    formData.append('description', data.description)
    formData.append('dish_id', data.dish_id)
    formData.append('dish_name', data.dish_name)
    formData.append('dish_status', data.dish_status)
    formData.append('characteristics', JSON.stringify(data.characteristics))
    formData.append('composition', JSON.stringify(data.composition))
    formData.append('image', data.image)

    // if (data.image instanceof File || data.image instanceof Blob) {
    //     // Это файл или blob - добавляем как есть
    //     formData.append('image', data.image)
    // } else if (typeof data.image === 'string') {
    //     // Это строка (возможно base64 или путь к файлу)
    //     // Нужно преобразовать в File или Blob
    //     console.warn('Image is a string, need to convert to File/Blob')
        
    //     // Если это base64 строка
    //     if (data.image.startsWith('data:image/')) {
    //         const blob = base64ToBlob(data.image)
    //         formData.append('image', blob, 'image.jpg')
    //     } else {
    //         // Если это просто путь/имя файла
    //         throw new Error('Image must be a File/Blob object, not a string path')
    //     }
    // } else {
    //     throw new Error(`Invalid image type: ${typeof data.image}`)
    // }
    
    // function base64ToBlob(base64: string) {
    //     const parts = base64.split(';base64,')
    //     const contentType = parts[0].split(':')[1]
    //     const raw = window.atob(parts[1])
    //     const rawLength = raw.length
    //     const uInt8Array = new Uint8Array(rawLength)
        
    //     for (let i = 0; i < rawLength; ++i) {
    //         uInt8Array[i] = raw.charCodeAt(i)
    //     }
        
    //     return new Blob([uInt8Array], { type: contentType })
    // }
    return formData
}