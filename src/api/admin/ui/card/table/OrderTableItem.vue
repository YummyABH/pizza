<script setup lang="ts">
import IconEye from '@/components/icons/IconEye.vue'
import { normalizeTime } from '@/utility/normalizeData'

defineProps({
  order: Object,
})

const activeDish = defineModel('activeDish')
</script>

<template>
  <div
    @click="order.id === activeDish ? (activeDish = false) : (activeDish = order.id)"
    class="grid grid-cols-subgrid col-span-7 border-b border-t"
  >
    <div class="flex px-5 py-3 justify-self-center w-max">{{ order.id }}</div>
    <div class="flex px-5 py-3 justify-self-center w-max">{{ order.name }}</div>
    <div class="flex px-5 py-3 justify-self-center w-max">
      {{ normalizeTime(order.created_at) }}
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max">
      {{ order.delivery.status ? order.delivery.address : 'Самовывоз' }}
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max">
      <div
        :class="order.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
        class="px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
      >
        {{ order.status ? 'Доставлен' : 'В процессе' }}
      </div>
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max">{{ order.total_price }}</div>
    <div class="flex px-5 py-3 justify-self-center w-max"><IconEye /></div>
    <slot></slot>
  </div>
</template>
