<script setup lang="ts">
defineProps({
  dish: Object,
})
</script>

<template>
  <div class="row-span-1 flex flex-col">
    <div
      class="cursor-pointer block h-46 max-sm:h-auto max-sm:rounded-2xl mb-3 rounded-3xl overflow-hidden"
    >
      <img
        :src="`https://cemubribepit.beget.app/uploads/${dish.image}`"
        class="max-sm:aspect-3/2 w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col">
      <div class="">
        <h3 class="mb-1 font-medium max-sm:text-base text-start">
          <span class="font-normal max-sm:hidden">Название:</span> {{ dish.name }}
        </h3>
        <div
          class="flex gap-x-3 gap-y-1.5 max-sm:text-sm max-2xl:text-sm max-sm:gap-x-1.5 text-gray-600 max-sm:mb-3 max-sm:flex-wrap"
        >
          <span class="font-medium"
            ><span class="font-normal">Количество:</span> {{ dish.quantity }}</span
          >
          <span class="max-sm:hidden">|</span>
          <span class="sm:hidden"></span>
          <span class="font-medium"><span class="font-normal">Размер:</span> {{ dish.size }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
