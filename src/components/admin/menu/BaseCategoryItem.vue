<script setup lang="ts">
import IconBasket from '@/components/icons/IconBasket.vue'

const category = defineModel('category')
const isOpenDelateModal = defineModel('isOpenDelateModal')
const idActiveCategory = defineModel('idActiveCategory')
</script>

<template>
  <div
    class="flex justify-between border-y max-sm:py-2 max-sm:px-1 py-3 px-5 text-lg max-md:text-lg font-medium max-sm:text-sm max-sm:font-normal"
  >
    <input
      class="block w-15 max-sm:w-8 max-sm:py-0 max-sm:px-1 max-sm:h-8 border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
      type="number"
      v-model="category.position"
    />
    <div class="flex gap-x-6 items-center">
      <div class="flex max-sm:py-1 max-sm:px-1 px-5 py-3 justify-self-center w-max col-start-5">
        <div
          @click="category.status = !category.status"
          :class="category.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
          class="cursor-pointer max-sm:p-1 px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
        >
          {{ category.status ? 'Активно' : 'Скрыт' }}
        </div>
      </div>
      <input
        class="block max-sm:text-xs max-sm:px-1 max-sm:h-8 w-auto max-sm:w-20 border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
        type="text"
        v-model="category.name"
      />
      <div
        @click="((isOpenDelateModal = true), (idActiveCategory = category.id))"
        class="border max-sm:p-1 border-gray-600 bg-gray-800 hover:bg-gray-600 duration-200 cursor-pointer p-2 rounded-lg"
      >
        <IconBasket />
      </div>
    </div>
  </div>
</template>
