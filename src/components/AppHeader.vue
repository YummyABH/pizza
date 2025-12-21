<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import IconBag from '@/components/icons/IconBag.vue'
import IconOrderHistory from './icons/IconOrderHistory.vue'
import { useOrderStore } from '@/stores/orderStore'
import { useOrderHistoryStore } from '@/stores/orderHistoryStore'

const storeOrder = useOrderStore()
const historyOrderStore = useOrderHistoryStore()
</script>

<template>
  <router-view />
  <div class="w-full z-10 fixed top-0 left-0 py-6 bg-gray-800 text-white">
    <ContentContainer>
      <div class="flex justify-between">
        <router-link to="/">
          <img src="/logo.png" class="w-15" alt="" />
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
            <div class="relative">
              <div
                v-show="historyOrderStore.isView"
                class="absolute top-0 right-0 translate-4/5 text-sm rounded-full px-1.5 bg-green-600"
              >
                {{ historyOrderStore.isView }}
              </div>
              <IconOrderHistory />
            </div>
          </router-link>
          <div
            @click="storeOrder.taggleOrderModal"
            class="w-12 max-sm:p-2 max-sm:w-10 border rounded-full p-3 duration-200 hover:bg-gray-600 cursor-pointer hover:border-gray-600"
          >
            <div class="relative">
              <div
                v-show="storeOrder.order.dishes.length"
                class="absolute top-0 right-0 translate-4/5 text-sm rounded-full px-1.5 bg-green-600"
              >
                {{ storeOrder.order.dishes.length }}
              </div>
              <IconBag />
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  </div>
</template>
