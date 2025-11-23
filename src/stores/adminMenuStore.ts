import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'
import type { MenuCategory, MenuDishResponse } from '@/types/api'

export const useAdminMenuStore = defineStore('adminMenu', () => {
    const adminMenu = ref<MenuCategory[]>([])
    const adminDishes = ref<MenuDishResponse[]>([])

    function updateAdminMenu(newValue: MenuCategory[]) {
        if (!newValue) return
    
        adminMenu.value = [...newValue]
    }
    
    function updateAdminDishes(newValue: MenuDishResponse[]) {
        if (!newValue) return
    
        adminDishes.value = [...newValue]
    }

    return {adminMenu: readonly(adminMenu), adminDishes: readonly(adminDishes), updateAdminDishes, updateAdminMenu}
})
