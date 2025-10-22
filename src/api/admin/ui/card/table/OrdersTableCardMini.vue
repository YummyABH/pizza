<script setup lang="ts">
import { normalizeTime } from '@/utility/normalizeData'

defineProps({
  order: Object,
})

const activeDish = defineModel('activeDish')
</script>

<template>
  <div
    @click="order.id === activeDish ? (activeDish = null) : (activeDish = order.id)"
    :class="order.status ? 'bg-green-500' : 'bg-yellow-600'"
    class="font-medium px-3 py-2 max-sm:text-sm text-white rounded-xl flex flex-col"
  >
    <div class="flex gap-x-2 flex-col text-center border-b border-b-white">
      <span>Номер заказа: </span>
      <span>{{ order.id }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b border-b-white">
      <span>Дата: </span>
      <span>{{ normalizeTime(order.created_at) }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b border-b-white">
      <span>Имя: </span>
      <span>{{ order.name }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b border-b-white">
      <span>Адрес: </span>
      <span>{{ order.delivery.status ? order.delivery.address : 'Самовывоз' }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center">
      <span>Номер: </span>
      <span>{{ order.phone }}</span>
    </div>
  </div>
</template>
