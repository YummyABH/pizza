<script setup lang="ts">
import ContentContainer from '../ContentContainer.vue'
import SearchInput from '../ui/SearchInput.vue'
import MenuList from './MenuList.vue'
</script>

<template>
  <div class="w-full pt-20 pb-25">
    <ContentContainer>
      <div class="bg-white py-8 px-8 max-md:px-6 max-md:py-6 rounded-4xl">
        <h1 class="mb-4 text-3xl font-bold">Меню</h1>
        <SearchInput />
        <MenuList />
      </div>
    </ContentContainer>
  </div>
</template>
