<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const styleMenuCategories = computed(() => (id: string) => {
  return route.hash === id ? 'text-white bg-black' : 'bg-white text-black'
})
</script>

<template>
  <section class="min-h-full bg-white rounded-l-4xl">
    <ul
      class="sticky top-0 pr-8 py-8 pl-12 max-lg:pl-4 max-lg:pr-4 flex flex-col gap-1 text-lg font-semibold"
    >
      <li
        :class="styleMenuCategories('#3')"
        class="cursor-pointer px-3 py-2 min-w-full rounded-3xl w-max"
      >
        Салаты и закуски
      </li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Завтрак</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Пицца</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Минеральная вода</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Гарниры</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Десерты</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">К вину</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Супы</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Хлеб</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Добавки</li>
      <li class="cursor-pointer px-3 py-2 rounded-3xl min-w-full w-max">Соки</li>
    </ul>
  </section>
</template>
