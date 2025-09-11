<script setup lang="ts">
import SearchInput from '../ui/SearchInput.vue'
import MenuList from './MenuList.vue'
import MenuNavigation from './MenuNavigation.vue'
import MenuNavigationSide from './MenuNavigationSide.vue'
</script>

<template>
  <div class="w-full pt-20 pb-25">
    <div class="max-w-[1900px] mx-auto px-5 flex">
      <MenuNavigationSide class="max-md:hidden" />
      <div
        class="bg-white rounded-r-4xl max-md:rounded-4xl py-8 px-8 max-md:px-6 max-md:py-6 w-full"
      >
        <h1 class="mb-4 text-3xl font-bold">Меню</h1>
        <SearchInput />
        <MenuNavigation />
        <MenuList />
      </div>
    </div>
  </div>
</template>
