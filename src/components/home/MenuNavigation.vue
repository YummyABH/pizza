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

const hasVisibleDish = computed(() => (index: number) => {
  return store.dishes[index].dishes.find((dish) => dish.dish_status === true)
})
</script>

<template>
  <ul class="flex gap-3 overflow-x-scroll max-w-full ">
    <li
      v-show="hasVisibleDish(index) && category.status"
      @click="$emit('scroll', category.category_id)"
      v-for="(category, index) in store.dishes"
      :key="category.category_id"
      :class="styleMenuCategories(category.category_id)"
      class="px-2 py-1 rounded-2xl min-w-max"
    >
      <div>
        {{ category.category_name }}
      </div>
    </li>
  </ul>
</template>
