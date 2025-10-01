<script setup lang="ts">
import MenuListCard from './MenuListCard.vue'
import MenuDishModal from './MenuDishModal.vue'
import { useDishesStore } from '@/stores/dishesStore'
import { ref } from 'vue'

const store = useDishesStore()

const statusModalDish = ref(false)
const dishModal = ref({})

function updateDishModal(newDish) {
  if (!newDish) return
  
  dishModal.value = {...newDish}
}
</script>

<template>
  <MenuDishModal
    v-show="statusModalDish"
    v-model:dishModal="dishModal"
    v-model:statusModalDish="statusModalDish"
  />

  <div
    class="max-sm:pt-6 pt-8"
    v-for="dishList in store.dishes"
    :key="dishList.categoryId"
    :id="`${dishList.categoryId}`"
  >
    <h2 class="mb-6 text-2xl font-semibold">{{ dishList.category_name }}</h2>
    <div
      class="w-full grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-sm:gap-4 max-sm:gap-y-8 max-lg:grid-cols-2"
    >
      <MenuListCard
        v-for="dish in dishList.dishes"
        @click="updateDishModal(dish)"
        v-model:statusModalDish="statusModalDish"
        :key="dish"
        :dishList="dish"
      />
    </div>
  </div>
</template>
