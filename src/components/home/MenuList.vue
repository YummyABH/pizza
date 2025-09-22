<script setup lang="ts">
import { ref } from 'vue'
import MenuListCard from './MenuListCard.vue'
import { categoriesAPI } from '@/api/apiGetDish.ts'

const dishList = ref(await categoriesAPI.getDishes())
</script>

<template>
  <div
    class="max-sm:pt-6 pt-8"
    v-for="dishList in dishList"
    :key="dishList.categoryId"
    :id="`${dishList.categoryId}`"
  >
    <h2 class="mb-6 text-2xl font-semibold">{{ dishList.category_name }}</h2>
    <div
      class="w-full grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-sm:gap-4 max-sm:gap-y-8 max-lg:grid-cols-2"
    >
      <MenuListCard v-for="dish in dishList.dishes" :key="dish" :dishList="dish" />
    </div>
  </div>
</template>
