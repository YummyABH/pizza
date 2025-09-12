<script setup lang="ts">
import IconBasket from '../icons/IconBasket.vue'
</script>

<template>
  <div class="fixed w-full h-full bg-black/50 z-10"></div>
  <div class="fixed z-20 right-0 top-0 bg-white h-full p-6 min-w-125">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-medium">Заказ</h2>
      <div
        class="relative w-5 h-5 after:absolute after:w-full after:h-0.5 after:top-1/2 after:left-1/2 after:bg-black after:transform after:-translate-1/2 after:rotate-45 before:absolute before:w-full before:h-0.5 before:left-1/2 before:top-1/2 before:bg-black before:transform before:-translate-1/2 before:-rotate-45"
      ></div>
    </div>
    <div class="flex justify-between mb-4">
      <div class="text-xl font-medium">3 блюда</div>
      <IconBasket />
    </div>
    <div class="flex flex-col gap-y-6">
      <div class="flex gap-x-3">
        <div class="w-14 h-14">
          <img class="w-full h-full object-cover aspect-1/1" src="/pattern_food.jpg" alt="" />
        </div>
        <div class="flex text-sm flex-col w-full">
          <div class="">Перец болгарский на мангале</div>
          <div class="text-[#808080]">100 г</div>
          <div class="flex mt-2 justify-between">
            <div class="font-medium">1 180 ₽</div>
            <div class="flex gap-x-2 items-center">
              <div
                class="relative w-6 h-6 p-1 rounded-full cursor-pointer after:w-3 after:h-0.5 after:bg-black after:absolute after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
              ></div>
              <div class="font-medium">1 шт</div>
              <div
                class="relative w-6 h-6 p-1 rounded-full cursor-pointer before:h-3 before:w-0.5 before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-1/2 before:bg-black after:bg-black after:absolute after:w-3 after:h-0.5 after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-lg font-medium flex justify-between mt-6">
      <span>Итого:</span>
      <span>1 200 ₽</span>
    </div>
  </div>
</template>
