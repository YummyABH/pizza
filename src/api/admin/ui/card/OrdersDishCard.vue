<script setup lang="ts">
defineProps({
  dish: Object,
})
</script>

<template>
  <div class="rounded-xl flex gap-x-3 bg-[#1b233a]">
    <img
      :src="`https://cemubribepit.beget.app/uploads/${dish?.image}`"
      class="aspect-1/1 object-cover w-25 rounded-lg"
    />
    <div class="">
      <h3 class="mb-1 font-medium max-sm:text-base text-start">
        <span class="font-normal">Название:</span> {{ dish.name }}
      </h3>
      <div
        class="flex gap-x-3 gap-y-1.5 max-sm:text-sm max-sm:gap-x-1.5 max-sm:mb-3 max-sm:flex-wrap"
      >
        <span class="font-medium"
          ><span class="font-normal">Количество:</span> {{ dish.quantity }}</span
        >
        |
        <span class="font-medium"><span class="font-normal">Размер:</span> {{ dish.size }}</span>
      </div>
    </div>
  </div>
</template>
