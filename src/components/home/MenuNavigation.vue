<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDishesStore } from '@/stores/dishesStore'

const route = useRoute()
const store = useDishesStore()

const styleMenuCategories = computed(() => (id: string) => {
  console.log('tik')

  return route.hash === id ? 'text-white bg-black' : 'bg-white text-black'
})
</script>

<template>
  <ul class="flex gap-3 overflow-x-scroll max-w-full pb-1 mt-4 md:hidden">
    <li
      v-for="category in store.dishes"
      :key="category.categoryId"
      :class="styleMenuCategories(`#${category.categoryId}`)"
      class="px-2 py-1 rounded-2xl min-w-max"
    >
      <a :href="`#${category.categoryId}`">
        {{ category.category_name }}
      </a>
    </li>
  </ul>
</template>
