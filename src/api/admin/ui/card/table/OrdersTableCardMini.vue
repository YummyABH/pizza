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
    :class="order.status ? 'bg-green-500' : 'bg-white'"
    class="px-3 py-2 max-sm:text-sm text-black rounded-xl flex flex-col"
  >
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Номер заказа: </span>
      <span>{{ order.id }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Дата: </span>
      <span>{{ normalizeTime(order.created_at) }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Имя: </span>
      <span>{{ order.name }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Адрес: </span>
      <span>{{ order.delivery.status ? order.delivery.address : 'Самовывоз' }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center">
      <span class="font-medium">Номер: </span>
      <span>{{ order.phone }}</span>
    </div>
  </div>
</template>
