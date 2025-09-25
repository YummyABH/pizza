<script setup lang="ts">
defineProps({
  dishList: Object,
})
</script>

<template>
  <div class="">
    <div
      class="cursor-pointer block h-46 max-sm:h-auto max-sm:rounded-2xl mb-3 rounded-3xl overflow-hidden"
    >
      <img
        :src="`https://restik-street-style.onrender.com/uploads/${dishList.image}`"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col justify-between min-h-36 max-sm:min-h-26">
      <div class="cursor-pointer">
        <h3 class="text-lg mb-1 font-medium max-sm:text-base">{{ dishList.name }}</h3>
        <div
          class="flex gap-x-3 max-sm:text-sm max-sm:gap-x-1.5 text-gray-600 mb-3 max-sm:mb-3 max-sm:flex-wrap"
        >
          <span>{{ dishList.dish_weight }} г.</span>
        </div>
      </div>

      <div
        class="cursor-pointer w-full items-center hover:bg-gray-600 duration-200 justify-center flex gap-4 py-2 px-4 font-semibold rounded-3xl text-white bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span>{{ dishList.price }} ₽</span>
      </div>
    </div>
  </div>
</template>
