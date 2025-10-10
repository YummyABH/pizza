<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import IconBag from '@/components/icons/IconBag.vue'
import IconOrderHistory from './icons/IconOrderHistory.vue'
</script>

<template>
  <router-view />
  <div class="w-full z-10 fixed top-0 left-0 py-6 bg-gray-800 text-white">
    <ContentContainer>
      <div class="flex justify-between">
        <router-link to="/">
          <div class="font-bold text-3xl">ЛОГОТИП</div>
        </router-link>
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
          <router-link
            to="order-history"
            class="w-12 max-sm:p-2 max-sm:w-10 border rounded-full p-3 duration-200 hover:bg-gray-600 cursor-pointer hover:border-gray-600"
          >
            <div>
              <IconOrderHistory />
            </div>
          </router-link>
          <router-link
            to="order"
            class="w-12 max-sm:p-2 max-sm:w-10 border rounded-full p-3 duration-200 hover:bg-gray-600 cursor-pointer hover:border-gray-600"
          >
            <div>
              <IconBag />
            </div>
          </router-link>
        </div>
      </div>
    </ContentContainer>
  </div>
</template>
