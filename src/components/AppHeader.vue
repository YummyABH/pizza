<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import IconBag from '@/components/icons/IconBag.vue'
import IconMap from './icons/IconMap.vue'
</script>

<template>
  <div class="w-full py-6 bg-gray-800 text-white">
    <ContentContainer>
      <div class="flex justify-between">
        <div class="font-bold text-3xl">ЛОГОТИП</div>
        <div class="flex gap-x-10 max-md:gap-x-5 items-center">
          <!-- <div
            class="px-6 py-3 font-bold max-md:hidden rounded-4xl hover:bg-gray-600 hover:text-current bg-white text-black duration-200 cursor-pointer text-xl"
          >
            Выбрать место доставки
          </div> -->

          <!-- <div
            class="w-12 max-sm:p-2 max-sm:w-10 md:hidden border rounded-full p-3 duration-200 hover:bg-gray-600 cursor-pointer hover:border-gray-600"
          >
            <IconMap />
          </div> -->
          <div
            class="w-12 max-sm:p-2 max-sm:w-10 border rounded-full p-3 duration-200 hover:bg-gray-600 cursor-pointer hover:border-gray-600"
          >
            <IconBag />
          </div>
        </div>
      </div>
    </ContentContainer>
  </div>
</template>
