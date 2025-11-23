<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue';

defineProps({
  dish: Object
})
</script>

<template>
    <div
      class="grid grid-cols-subgrid col-span-7 border-b border-t"
    >
      <div class="flex px-5 py-3 justify-self-center w-max">{{ dish?.id }}</div>
      <div class="flex px-5 py-3 justify-self-center w-max">{{ dish?.name }}</div>
      <div class="flex px-5 py-3 justify-self-center w-max col-start-6">
        {{ dish?.dish_status ? 'Активно' : 'Не активно' }}
        <!-- <div
          @click.stop="store.updateStatusOrder(order.id)"
          :class="order.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
          class="cursor-pointer px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
        >
          {{ order.status ? 'Активно' : '' }}
        </div> -->
      </div>
      <router-link to="/admin-menu/dishes/edit/1">
        <div class="flex px-5 py-3 justify-self-center w-max col-start-7"><IconEdit/></div>
      </router-link>
      <!-- <div class="flex px-5 py-3 justify-self-center w-max"><IconEye /></div> -->
      <!-- <slot></slot> -->
    </div>
  </template>