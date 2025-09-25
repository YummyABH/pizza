<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDishesStore } from '@/stores/dishesStore'

const store = useDishesStore()
const route = useRoute()

const styleMenuCategories = computed(() => (id: string) => {
  return route.hash === id ? 'text-white bg-black' : 'bg-white text-black'
})
</script>

<template>
  <section class="min-h-full bg-white rounded-l-4xl">
    <ul
      class="sticky top-16 pr-8 py-8 pl-12 max-lg:pl-4 max-lg:pr-4 flex flex-col gap-1 text-lg font-semibold"
    >
      <li
        v-for="category in store.dishes"
        :key="category.categoryId"
        :class="styleMenuCategories(`#${category.categoryId}`)"
        class="cursor-pointer px-3 py-2 min-w-full rounded-3xl w-max"
      >
        <a :href="`#${category.categoryId}`">
          {{ category.category_name }}
        </a>
      </li>
    </ul>
  </section>
</template>
