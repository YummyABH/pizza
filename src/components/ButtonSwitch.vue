<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

const store = useOrderStore()

const styleButton = computed(() => ({
  position: store.order.cutlery_status === true ? 'right-1' : 'left-1',
  background: store.order.cutlery_status === true ? 'bg-black' : 'bg-black/40',
}))
</script>

<template>
  <div
    @click="store.order.cutlery_status = !store.order.cutlery_status"
    class="cursor-pointer duration-300 relative w-14 flex p-1 h-7 rounded-xl bg-gray-300"
  >
    <div
      :class="[styleButton.background, styleButton.position]"
      class="absolute duration-300 h-5 w-5 rounded-full"
    ></div>
  </div>
</template>
