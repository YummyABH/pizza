<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const styleMenuCategories = computed(() => (id: string) => {
  return route.hash === id ? 'text-white bg-black' : 'bg-white text-black'
})
</script>

<template>
  <ul class="flex gap-3 overflow-x-scroll max-w-full pb-1 mt-4 md:hidden">
    <li :class="styleMenuCategories('#3')" class="px-2 py-1 rounded-2xl min-w-max">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">Другое блюдо</li>
    <li class="min-w-max px-2 py-1 rounded-2xl">Другое блюдо</li>
  </ul>
</template>
