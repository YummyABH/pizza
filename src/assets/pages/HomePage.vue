<script setup lang="ts">
import BaseMenu from '@/components/home/BaseMenu.vue'
import { categoriesAPI } from '@/api/apiGetDish'
import { useDishesStore } from '@/stores/dishesStore'
import { onMounted } from 'vue'

const store = useDishesStore()

onMounted(async () => {
  const dishesList = await categoriesAPI.getDishes()
  store.updateDishes(dishesList)
})
</script>

<template>
  <BaseMenu />
</template>
