<script setup lang="ts">
import { computed, ref } from 'vue'

const statusDescription = ref(false)
const styleDescription = computed(() => {
  return statusDescription.value ? '' : 'truncate'
})

const statusIngredients = ref(false)
const styleIngredients = computed(() => {
  return statusIngredients.value ? '' : '[&>li:nth-child(n+5)]:hidden'
})
</script>

<template>
  <div class="fixed flex justify-center items-end top-0 left-0 w-full h-full bg-black/50 z-10">
    <div
      class="fixed z-10 left-0 bottom-0 w-full p-3 flex gap-x-8 bg-white border-t border-t-gray-400"
    >
      <div class="flex justify-between items-center w-full">
        <div
          class="relative w-8 h-8 p-1 rounded-full cursor-pointer after:w-3 after:h-px bg-red-300 after:bg-black after:absolute after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
        ></div>
        <div class="flex flex-col text-center">
          <span class="font-medium">1 шт</span><span>33 390 ₽</span>
        </div>
        <div
          class="relative w-8 h-8 p-1 rounded-full bg-[#64f77c] cursor-pointer before:h-3 before:w-px before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-1/2 before:bg-black after:bg-black after:absolute after:w-3 after:h-px after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
        ></div>
      </div>
      <div
        class="bg-[#64f77c] cursor-pointer py-2 px-2 rounded-3xl text-lg w-full text-center font-medium"
      >
        Добавить
      </div>
    </div>
    <div
      class="relative max-h-9/10 pb-20 max-sm:max-w-full max-sm:pb-4 min-h-4/5 bg-white max-w-128 flex flex-col overflow-hidden rounded-2xl"
    >
      <div class="w-12 h-12 rounded-full bg-white absolute right-3 top-3">
        <div
          class="relative cursor-pointer w-full h-full after:absolute after:top-1/2 after:left-1/2 after:w-4 after:h-0.5 after:transform after:-translate-1/2 after:bg-black after:rotate-45 before:absolute before:top-1/2 before:left-1/2 before:w-4 before:h-0.5 before:transform before:-translate-1/2 before:bg-black before:-rotate-45"
        ></div>
      </div>
      <div
        class="absolute max-sm:hidden left-0 bottom-0 w-full p-4 flex gap-x-16 bg-white border-t border-t-gray-400"
      >
        <div class="flex justify-between items-center w-full">
          <div
            class="relative w-9 h-9 p-1 rounded-full cursor-pointer after:w-4 after:h-px bg-red-300 after:bg-black after:absolute after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
          ></div>
          <div class="flex flex-col"><span class="font-medium">1 шт</span><span>390 ₽</span></div>
          <div
            class="relative w-9 h-9 p-1 rounded-full bg-[#64f77c] cursor-pointer before:h-4 before:w-px before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-1/2 before:bg-black after:bg-black after:absolute after:w-4 after:h-px after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
          ></div>
        </div>
        <div
          class="bg-[#64f77c] cursor-pointer py-2.5 px-5 rounded-3xl text-xl w-full text-center font-medium"
        >
          Добавить
        </div>
      </div>
      <div class="min-w-full min-h-full h-full w-full overflow-hidden">
        <img class="w-full aspect-1/1 object-cover" src="/pattern_food.jpg" alt="" />
      </div>
      <div
        class="overflow-y-scroll scrollbar-hidden py-6 px-5 rounded-2xl flex flex-col gap-2 -mt-3 bg-white"
      >
        <div class="text-2xl font-medium">690 ₽</div>
        <div class="text-lg font-semibold">Салат Цезаря</div>
        <div class="text-xl font-medium text-[#8C959B]">220 г</div>
        <div class="">
          <span class="text-base inline-block max-w-full" :class="styleDescription">
            <span class="text-base font-semibold">Описание:</span>
            кусочки куриного шашлыка, спелые томаты, копчёный сыр сулугуни, салатные листья и
            гренки, заправленные орехово-сырным соусом
          </span>
          <span
            v-show="!statusDescription"
            @click="statusDescription = true"
            class="text-base underline cursor-pointer font-semibold"
            >Развернуть</span
          >
          <span
            v-show="statusDescription"
            @click="statusDescription = false"
            class="text-base underline font-semibold cursor-pointer"
            >Свернуть</span
          >
        </div>
        <ul
          :class="styleIngredients"
          class="max-w-full flex gap-x-3 gap-y-1.5 items-baseline flex-wrap"
        >
          <li class="text-base font-semibold">Ингредиенты:</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
          <li class="min-w-max px-2 rounded-2xl border">ингредиент</li>
        </ul>
        <span
          v-show="!statusIngredients"
          @click="statusIngredients = true"
          class="text-base underline cursor-pointer font-semibold"
          >Развернуть</span
        >
        <span
          v-show="statusIngredients"
          @click="statusIngredients = false"
          class="text-base underline font-semibold cursor-pointer"
          >Свернуть</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hidden {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari и другие на WebKit */
}
</style>
