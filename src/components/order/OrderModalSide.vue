<script setup lang="ts">
import ButtonSwitch from '../ButtonSwitch.vue'
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
    <div class="flex items-center justify-between mt-4">
      <div class="flex gap-6">
        <div class="p-2 bg-gray-200 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="25" fill="none">
            <path
              fill="url(#cutlery23_svg__a)"
              d="m10.502 7-.25-7h-1.75l-.25 7h-1.62l-.25-7h-1.76l-.25 7h-1.62l-.25-7H.752l-.25 7-.06 1.59c-.03.83.29 1.64.88 2.23l1.8 1.8c.56.56.88 1.33.88 2.12V24h3v-9.26c0-.8.32-1.56.88-2.12l1.8-1.8c.59-.59.91-1.4.88-2.23z"
            ></path>
            <path
              fill="url(#cutlery23_svg__b)"
              d="M18.002 9.25V0h-3v9.25c0 1.98-4 1.75-4 6.75 0 4.55 2.83 8.25 5.5 8.25s5.5-3.7 5.5-8.25c0-5-4-4.77-4-6.75"
            ></path>
            <path
              fill="url(#cutlery23_svg__c)"
              d="M10.562 8.59c.03.83-.28 1.63-.87 2.22l-2.77 2.77c-.78.78-2.05.78-2.83 0l-2.77-2.77c-.59-.59-.9-1.39-.87-2.22L.502 7l.25-7h1.75l.25 7h1.63l.24-7h1.76l.24 7h1.63l.25-7h1.75l.25 7z"
            ></path>
            <path
              fill="url(#cutlery23_svg__d)"
              d="M16.502 10.5c-2.5 0-5.5 1.5-5.5 5.5 0 4.55 2.83 8.25 5.5 8.25s5.5-3.7 5.5-8.25c0-4-3-5.5-5.5-5.5"
            ></path>
            <defs>
              <linearGradient
                id="cutlery23_svg__a"
                x1=".443"
                x2="10.561"
                y1="12"
                y2="12"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".35" stop-color="#70D614"></stop>
                <stop offset=".55" stop-color="#24B23E"></stop>
                <stop offset=".65" stop-color="#00A06E"></stop>
              </linearGradient>
              <linearGradient
                id="cutlery23_svg__b"
                x1="11.002"
                x2="22.002"
                y1="12.125"
                y2="12.125"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".35" stop-color="#70D614"></stop>
                <stop offset=".55" stop-color="#24B23E"></stop>
                <stop offset=".65" stop-color="#00A06E"></stop>
              </linearGradient>
              <linearGradient
                id="cutlery23_svg__c"
                x1="9.598"
                x2="2.14"
                y1="12.116"
                y2="-.802"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#70D614"></stop>
                <stop offset=".667" stop-color="#24B23E"></stop>
                <stop offset="1" stop-color="#00A06E"></stop>
              </linearGradient>
              <linearGradient
                id="cutlery23_svg__d"
                x1="21.866"
                x2="11.635"
                y1="14.052"
                y2="19.959"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#70D614"></stop>
                <stop offset=".667" stop-color="#24B23E"></stop>
                <stop offset="1" stop-color="#00A06E"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="">
          <span>Приборы</span>
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
      <ButtonSwitch />
    </div>
    <div class="text-lg font-medium flex justify-between mt-6">
      <span>Итого:</span>
      <span>1 200 ₽</span>
    </div>
  </div>
</template>
