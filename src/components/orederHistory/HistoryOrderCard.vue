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
        :src="`https://restik-street-style.onrender.com/uploads/${dish.image}`"
        class="max-sm:aspect-3/2 w-full h-full object-cover"
      />
    </div>
    <div class="flex flex-col justify-between flex-1">
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
        <div
          class="flex my-3 gap-x-3 gap-y-1.5 max-sm:text-sm max-sm:gap-x-1.5 text-gray-600 max-sm:mb-3 max-sm:flex-wrap"
        >
          <span class="font-medium flex gap-x-3"
            ><span class="font-normal">Статус:</span>
            <div
              :class="dish.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
              class="px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
            >
              {{ dish.status ? 'Доставлен' : 'В процессе' }}
            </div></span
          >
        </div>
      </div>

      <div
        class="cursor-pointer w-full items-center hover:bg-gray-600 duration-200 justify-center flex gap-4 py-2 px-4 font-semibold rounded-3xl text-white bg-gray-700"
      >
        <span>{{ dish.price }} ₽</span>
      </div>
    </div>
  </div>
</template>
