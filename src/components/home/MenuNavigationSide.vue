<script setup lang="ts">
import { computed } from 'vue'
import { useDishesStore } from '@/stores/dishesStore'

const store = useDishesStore()
const props = defineProps({
  activeCategory: Number,
})

const styleMenuCategories = computed(() => (id: string) => {
  return props.activeCategory === id ? 'text-white bg-black' : 'bg-white text-black'
})
</script>

<template>
  <section class="min-h-full bg-white rounded-l-4xl">
    <ul
      class="sticky top-20 pr-8 py-8 pl-12 max-lg:pl-4 max-lg:pr-4 flex flex-col gap-1 text-lg font-semibold"
    >
      <li
        v-show="category.dishes.length"
        @click="$emit('scroll', category.category_id)"
        v-for="category in store.dishes"
        :key="category.category_id"
        :class="styleMenuCategories(category.category_id)"
        class="cursor-pointer px-3 py-2 min-w-full rounded-3xl w-max"
      >
        <div>
          {{ category.category_name }}
        </div>
      </li>
    </ul>
  </section>
</template>
