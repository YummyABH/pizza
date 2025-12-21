<script setup lang="ts">
import { connectWebSocket } from '@/components/composible/useWebSocketUser'
import BaseOrderHistory from '@/components/orederHistory/BaseOrderHistory.vue'
import { useOrderHistoryStore } from '@/stores/orderHistoryStore'
import { onMounted } from 'vue'

const historyOrderStore = useOrderHistoryStore()
let ws

onMounted(() => {
  ws = connectWebSocket()
  historyOrderStore.isViewReset()
})
</script>

<template>
  <div class="max-w-[1580px] mx-auto px-10 max-md:px-5 max-sm:px-0">
    <BaseOrderHistory />
  </div>
</template>
