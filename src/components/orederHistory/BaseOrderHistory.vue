<script setup lang="ts">
import { useOrderHistoryStore } from '@/stores/orderHistoryStore'
import HistoryOrderCard from '@/components/orederHistory/HistoryOrderCard.vue'

const historyOrderStore = useOrderHistoryStore()
</script>

<template>
  <div class="text-center px-10 max-sm:px-3 w-full mt-25 max-md:py-6 py-12 bg-white rounded-2xl">
    <h1 class="text-3xl font-semibold mb-0">Ваши заказы</h1>
    <div class="max-sm:pt-6 pt-8" v-for="(historyOrder, indexOrder) in historyOrderStore.historyOrder"
      :key="indexOrder">
      <div
        class="flex my-3 items-end gap-x-3 max-sm:text-sm max-sm:gap-x-1.5 text-gray-600  max-sm:flex-wrap">
        <span class=" text-xl flex gap-x-3"><span class="font-medium">Статус:</span>
          <span v-show="historyOrder.current_status === 'Готов'"
            class="bg-green-500 flex items-center text-white px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]">{{
              historyOrder.current_status }}</span>
          <span v-show="historyOrder.current_status === 'В процессе'"
            class="bg-yellow-500 text-white flex items-center px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]">{{
              historyOrder.current_status }}</span>
          <span v-show="historyOrder.current_status === 'Отменён'"
            class="bg-red-500 text-white flex items-center px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]">{{ historyOrder.current_status
            }}</span>
        </span>
      </div>
      <h2 class="mb-1 text-xl text-start font-normal">
        Номер заказа: <span class="font-semibold">{{ historyOrder.id }}</span>
      </h2>
      <h2 class="mb-6 text-xl text-start font-normal">
        Итоговая сумма: <span class="font-semibold">{{ historyOrder.total_price }} ₽</span>
      </h2>
      <div class="w-full grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-sm:gap-4 max-sm:gap-y-8 max-lg:grid-cols-2">
        <HistoryOrderCard v-for="(dish, indexDish) in historyOrder.dishes" :key="indexDish" :dish="dish" />
      </div>
    </div>
  </div>
</template>
