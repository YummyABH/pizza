<script setup lang="ts">
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import IconCrass from '../icons/IconCrass.vue'
import BaseDelateItem from '../ui/BaseDelateItem.vue'
import { ref } from 'vue'

defineProps({
  indexSetting: Number,
  indexCity: Number,
})

const isOpen = ref<boolean>(false)
const adminMenuStore = useAdminMenuStore()

function deletePrice(indexCity: number, indexSetting: number) {
  adminMenuStore.delatePrice(indexCity, indexSetting)
}
</script>

<template>
  <BaseDelateItem
    @delete-item="deletePrice(indexCity, indexSetting)"
    v-model:is-open-delate-modal="isOpen"
  />
  <div
    class="col-span-full border-y relative border-y-gray-500 grid grid-cols-subgrid bg-gray-700 px-5 py-3"
  >
    <div @click="isOpen = true" class="absolute right-2 top-2 p-px rounded-full bg-red-500">
      <IconCrass />
    </div>
    <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
      <label class="text-xl inline-block mb-3"> От (₽) : </label>
      <input
        class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
        type="number"
        v-model="adminMenuStore.adminPrices[indexCity].prices[indexSetting].from"
      />
    </div>
    <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
      <label class="text-xl inline-block mb-3"> До (₽) : </label>
      <input
        class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
        type="number"
        v-model="adminMenuStore.adminPrices[indexCity].prices[indexSetting].to"
      />
    </div>
    <div class="p-2 rounded-lg max-md:col-span-full">
      <label class="text-xl inline-block mb-3"> Цена : </label>
      <input
        class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
        type="number"
        v-model="adminMenuStore.adminPrices[indexCity].prices[indexSetting].price"
      />
    </div>
  </div>
</template>
