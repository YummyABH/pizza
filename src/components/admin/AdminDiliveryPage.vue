<script setup lang="ts">
import { categoriesAPI } from '@/api/apiGetDish'
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import { useAdminStore } from '@/stores/adminStore'
import { onMounted, ref } from 'vue'
import { toastCreate } from '@/utility/createToast'
import BasePricesItem from './BasePricesItem.vue'

const storeAdmin = useAdminStore()
const adminMenuStore = useAdminMenuStore()
const isOpenCity = ref<number | null>(null)

async function updateCfg() {
  try {
    const response = await categoriesAPI.updatePrices(adminMenuStore.adminPrices)
    adminMenuStore.updateAdminPrices(response[0].price_list)
    toastCreate('Успешно сохранено', 'success')
  } catch (error) {
    toastCreate('Произошла ошибка', 'error')
  }
}
</script>

<template>
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-md:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <h1 class="mb-8 text-2xl text-center font-medium">Цены за доставку</h1>
      <div class="bg-[#111827] rounded-xl p-5 max-w-full max-sm:px-2 text-base">
        <div class="flex justify-self-end mb-4 gap-6 flex-wrap">
          <div
            @click="updateCfg"
            class="text-lg rounded-lg px-3 py-2 cursor-pointer bg-gray-600 duration-200 hover:bg-blue-600"
          >
            Сохранить
          </div>
        </div>
        <BasePricesItem
          v-for="(city, index) in adminMenuStore.adminPrices"
          :key="city.city"
          :cityIndex="index"
          v-model:is-open="isOpenCity"
        />
      </div>
    </div>
  </div>
</template>
