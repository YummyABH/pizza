<script setup lang="ts">
import { connectWebSocket } from '@/components/composible/useWebSocketUser'
import BaseOrderHistory from '@/components/orederHistory/BaseOrderHistory.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'

const ws = ref<WebSocket>()

onMounted(() => {
  ws.value = connectWebSocket()
})
</script>

<template>
  <div class="max-w-[1580px] mx-auto px-10 max-md:px-5 max-sm:px-0">
    <BaseOrderHistory />
  </div>
</template>
