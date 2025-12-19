<script setup lang="ts">
import MenuListCard from './MenuListCard.vue'
import MenuDishModal from './MenuDishModal.vue'
import { useDishesStore } from '@/stores/dishesStore'
import { computed, ref, toRaw } from 'vue'

const store = useDishesStore()

const listCategory = defineModel('listCategory')
const statusModalDish = ref<boolean>(false)
const indexDishModal = ref<number>(0)
const indexCategoryModal = ref<number>(0)

const setCategoryRefs = (el) => {
  if (el) {
    listCategory.value.push(el)
  }
}

const hasVisibleDish = computed(() => (index: number) => {
  return store.dishes[index].dishes.find((dish) => dish.dish_status === true)
})
</script>

<template>
  <MenuDishModal
    v-show="statusModalDish"
    v-model:statusModalDish="statusModalDish"
    :indexDishModal="indexDishModal"
    :indexCategoryModal="indexCategoryModal"
  />

  <div
    v-show="dishList.status && hasVisibleDish(indexCategory)"
    :ref="setCategoryRefs"
    class="max-sm:pt-6 pt-8"
    v-for="(dishList, indexCategory) in store.dishes"
    :key="dishList.category_id"
    :id="`${dishList.category_id}`"
  >
    <h2 class="mb-6 text-2xl font-semibold">{{ dishList.category_name }}</h2>
    <div
      class="w-full grid auto-rows-fr grid-cols-4 gap-10 max-xl:grid-cols-3 max-sm:gap-4 max-sm:gap-y-8 max-lg:grid-cols-2"
    >
      <MenuListCard
        v-show="dish.dish_status"
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
