<script setup lang="ts">
import IconBasket from '@/components/icons/IconBasket.vue'

const category = defineModel('category')
const isOpenDelateModal = defineModel('isOpenDelateModal')
const idActiveCategory = defineModel('idActiveCategory')
</script>

<template>
  <div
    class="flex justify-between border-y py-3 px-5 text-lg max-md:text-lg font-medium max-sm:text-sm max-sm:font-normal"
  >
    <input
      class="block w-15 border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
      type="number"
      v-model="category.position"
    />
    <div class="flex gap-x-6 items-center">
      <div class="flex px-5 py-3 justify-self-center w-max col-start-5">
        <div
          @click="category.status = !category.status"
          :class="category.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
          class="cursor-pointer px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
        >
          {{ category.status ? 'Активно' : 'Скрыт' }}
        </div>
      </div>
      <input
        class="block w-auto max-sm:w-40 border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
        type="text"
        v-model="category.name"
      />
      <div
        @click="((isOpenDelateModal = true), (idActiveCategory = category.id))"
        class="border border-gray-600 bg-gray-800 hover:bg-gray-600 duration-200 cursor-pointer p-2 rounded-lg"
      >
        <IconBasket />
      </div>
    </div>
  </div>
</template>
