<script setup lang="ts">
import BaseMenu from '@/components/home/BaseMenu.vue'
import { categoriesAPI } from '@/api/apiGetDish'
import { useDishesStore } from '@/stores/dishesStore'
import { onMounted, ref } from 'vue'

const store = useDishesStore()
const baseMenu = ref(null)

onMounted(async () => {
  const dishesList = await categoriesAPI.getDishes()  
  store.updateDishes(dishesList)
})
</script>

<template>
  <BaseMenu ref="baseMenu" />
</template>
