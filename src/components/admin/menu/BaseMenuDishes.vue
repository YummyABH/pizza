<script setup lang="ts">
import DishesTableItem from '@/components/admin/ui/table/DishesTableItem.vue'
import { categoriesAPI } from '@/api/apiGetDish'
import { useAdminStore } from '@/stores/adminStore'
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import { onMounted } from 'vue'

const adminMenuStore = useAdminMenuStore()
const storeAdmin = useAdminStore()

onMounted(async () => {
  const response = await categoriesAPI.getAllDishes()
  adminMenuStore.updateAdminDishes(response)
})
</script>

<template>
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-md:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <h1 class="mb-8 text-2xl text-center font-medium">Блюда</h1>
      <div class="bg-[#111827] rounded-xl p-5 max-w-full max-sm:px-2">
        <div class="grid grid-cols-6 w-full justify-between gap-x-3">
          <div class="grid grid-cols-subgrid max-sm:text-xs col-span-6 border-b border-t">
            <div class="flex max-sm:px-1 px-5 py-3 justify-self-center w-max">Номер</div>
            <div
              class="flex max-sm:px-1 px-5 py-3 justify-self-center w-max max-md:col-span-2 max-sm:col-span-3"
            >
              Название
            </div>

            <div class="flex max-sm:px-1 px-5 py-3 justify-self-center col-start-5 w-max">
              Статус
            </div>
            <div class="flex max-sm:px-1 px-5 py-3 justify-self-center w-max"></div>
          </div>
          <DishesTableItem v-for="dish in adminMenuStore.adminDishes" :key="dish.id" :dish="dish" />
        </div>
      </div>
    </div>
  </div>
</template>
