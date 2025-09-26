<script setup lang="ts">
import ButtonSwitch from '../ButtonSwitch.vue'
import IconBasket from '../icons/IconBasket.vue'
import IconCutlery from '../icons/IconCutlery.vue'
import OrderContacts from './OrderContacts.vue'
import { useOrderStore } from '@/stores/orderStore'

const storeOrder = useOrderStore()
</script>

<template>
  <router-link to="/" class="fixed w-full h-full bg-black/50 z-10 top-0 left-0"></router-link>
  <div
    class="fixed scrollbar-hidden z-20 right-0 top-0 bg-white h-full p-6 overflow-scroll min-w-125 max-sm:min-w-auto max-sm:w-full"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-medium">Заказ</h2>
      <router-link
        to="/"
        class="relative w-5 h-5 after:absolute after:w-full after:h-0.5 after:top-1/2 after:left-1/2 after:bg-black after:transform after:-translate-1/2 after:rotate-45 before:absolute before:w-full before:h-0.5 before:left-1/2 before:top-1/2 before:bg-black before:transform before:-translate-1/2 before:-rotate-45"
      ></router-link>
    </div>
    <div class="flex justify-between mb-4">
      <div class="text-xl font-medium"><span>Блюд: </span>{{ storeOrder.order.dishes.length }}</div>
      <IconBasket @click="storeOrder.clearDishesInOrder" />
    </div>
    <div class="flex flex-col gap-y-6">
      <div v-for="dish in storeOrder.order.dishes" :key="dish.categoryid" class="flex gap-x-3">
        <div class="w-14 h-14">
          <img
            class="w-full h-full object-cover aspect-1/1"
            :src="`https://restik-street-style.onrender.com/uploads/${dish.image}`"
          />
        </div>
        <div class="flex text-sm flex-col w-full">
          <div class="">{{ dish.name }}</div>
          <div class="text-[#808080]">{{ dish.dish_weight }} г</div>
          <div class="flex mt-2 justify-between">
            <div class="font-medium">{{ dish.price }} ₽</div>
            <div class="flex gap-x-2 items-center">
              <div
                @click="storeOrder.dishReduce(dish.id)"
                class="relative w-6 h-6 p-1 rounded-full cursor-pointer after:w-3 after:h-0.5 after:bg-black after:absolute after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
              ></div>
              <div class="font-medium">{{ dish.quantity }} шт</div>
              <div
                @click="storeOrder.dishAdd(dish.id)"
                class="relative w-6 h-6 p-1 rounded-full cursor-pointer before:h-3 before:w-0.5 before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-1/2 before:bg-black after:bg-black after:absolute after:w-3 after:h-0.5 after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mt-4">
      <div class="flex gap-6">
        <IconCutlery />
        <div class="flex flex-col justify-center">
          <span>Приборы</span>
          <div v-show="storeOrder.order.cutlery_status" class="flex gap-x-2 items-center">
            <div
              @click="storeOrder.cutleryReduce"
              class="relative w-6 h-6 p-1 rounded-full cursor-pointer after:w-3 after:h-0.5 after:bg-black after:absolute after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
            ></div>
            <div class="font-medium">{{ storeOrder.order.number_cutlery }} шт</div>
            <div
              @click="storeOrder.cutleryAdd"
              class="relative w-6 h-6 p-1 rounded-full cursor-pointer before:h-3 before:w-0.5 before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-1/2 before:bg-black after:bg-black after:absolute after:w-3 after:h-0.5 after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
            ></div>
          </div>
        </div>
      </div>
      <ButtonSwitch />
    </div>
    <div class="text-lg pb-4 font-medium flex justify-between mt-6">
      <span>Итого:</span>
      <span>{{ storeOrder.order.price }} ₽</span>
    </div>
    <OrderContacts />
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
