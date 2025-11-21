<script setup lang="ts">
</script>

<template>
    <div
      class="grid grid-cols-subgrid col-span-7 border-b border-t"
    >
      <div class="flex px-5 py-3 justify-self-center w-max">{{ order.id }}</div>
      <div class="flex px-5 py-3 justify-self-center w-max">{{ order.name }}</div>
      
      <div class="flex px-5 py-3 justify-self-center w-max">
        {{ order.delivery.status ? order.delivery.address : 'Самовывоз' }}
      </div>
      <div class="flex px-5 py-3 justify-self-center w-max">
        <div
          @click.stop="store.updateStatusOrder(order.id)"
          :class="order.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
          class="cursor-pointer px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
        >
          {{ order.status ? 'Доставлен' : 'В процессе' }}
        </div>
      </div>
      <div class="flex px-5 py-3 justify-self-center w-max">{{ order.total_price }}</div>
      <div class="flex px-5 py-3 justify-self-center w-max"><IconEye /></div>
      <slot></slot>
    </div>
  </template>