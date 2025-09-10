<script setup lang="ts">
import MenuListCard from './MenuListCard.vue'
</script>

<template>
  <div class="max-sm:pt-10 pt-12">
    <h2 class="mb-6 text-2xl font-semibold">Роллы</h2>
    <div
      class="w-full grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
    >
      <MenuListCard />
      <MenuListCard />
      <MenuListCard />
      <MenuListCard />
      <MenuListCard />
    </div>
  </div>
</template>
