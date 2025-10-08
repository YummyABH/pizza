<script setup lang="ts">
import MenuListCard from './MenuListCard.vue'
import MenuDishModal from './MenuDishModal.vue'
import { useDishesStore } from '@/stores/dishesStore'
import { onMounted, ref, watch } from 'vue'

const store = useDishesStore()

const listCategory = defineModel('listCategory')
const statusModalDish = ref(false)
const indexDishModal = ref(0)
const indexCategoryModal = ref(0)

const setCategoryRefs = (el) => {
  if (el) {
    listCategory.value.push(el)
  }
}
</script>

<template>
  <MenuDishModal
    v-show="statusModalDish"
    v-model:statusModalDish="statusModalDish"
    :indexDishModal="indexDishModal"
    :indexCategoryModal="indexCategoryModal"
  />

  <div
    :ref="setCategoryRefs"
    class="max-sm:pt-6 pt-8"
    v-for="(dishList, indexCategory) in store.dishes"
    :key="dishList.categoryId"
    :id="`${dishList.categoryId}`"
  >
    <h2 class="mb-6 text-2xl font-semibold">{{ dishList.category_name }}</h2>
    <div
      class="w-full grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-sm:gap-4 max-sm:gap-y-8 max-lg:grid-cols-2"
    >
      <MenuListCard
        v-for="(dish, indexDish) in dishList.dishes"
        @click="((indexDishModal = indexDish), (indexCategoryModal = indexCategory))"
        v-model:statusModalDish="statusModalDish"
        :key="dish"
        :dishList="dish"
        :indexDish="indexDish"
        :indexCategory="indexCategory"
      />
    </div>
  </div>
</template>
