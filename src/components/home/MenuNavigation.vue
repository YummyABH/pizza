<script setup lang="ts">
import { computed } from 'vue'
import { useDishesStore } from '@/stores/dishesStore'

const store = useDishesStore()
const props = defineProps({
  activeCategory: Number,
})

const styleMenuCategories = computed(() => (id: string) => {
  console.log(id, props.activeCategory)

  return props.activeCategory === id ? 'text-white bg-black' : 'bg-white text-black'
})
</script>

<template>
  <ul class="flex gap-3 overflow-x-scroll max-w-full pb-1 mt-4 md:hidden">
    <li
      @click="$emit('scroll', category.categoryId)"
      v-for="category in store.dishes"
      :key="category.categoryId"
      :class="styleMenuCategories(category.categoryId)"
      class="px-2 py-1 rounded-2xl min-w-max"
    >
      <div>
        {{ category.category_name }}
      </div>
    </li>
  </ul>
</template>
