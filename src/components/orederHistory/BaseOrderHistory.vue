<script setup lang="ts">
import { useOrderHistoryStore } from '@/stores/orderHistoryStore'
import HistoryOrderCard from '@/components/orederHistory/HistoryOrderCard.vue'

const historyOrderStore = useOrderHistoryStore()
</script>

<template>
  <div class="text-center px-10 w-full mt-25 py-12 bg-white rounded-2xl">
    <h1 class="text-3xl font-semibold mb-12">Ваши заказы</h1>
    <div
      class="max-sm:pt-6 pt-8"
      v-for="(historyOrder, indexOrder) in historyOrderStore.historyOrder"
      :key="indexOrder"
    >
      <h2 class="mb-1 text-xl text-start font-normal">
        Номер заказа: <span class="font-semibold">{{ historyOrder.id }}</span>
      </h2>
      <h2 class="mb-6 text-xl text-start font-normal">
        Итоговая сумма: <span class="font-semibold">{{ historyOrder.total_price }} ₽</span>
      </h2>
      <div
        class="w-full grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-sm:gap-4 max-sm:gap-y-8 max-lg:grid-cols-2"
      >
        <HistoryOrderCard
          v-for="(dish, indexDish) in historyOrder.dishes"
          :key="indexDish"
          :dish="dish"
        />
      </div>
    </div>
  </div>
</template>
