<script setup lang="ts">
import { orderAPI } from '@/api/apiOrder'
import ContentContainer from '@/components/ContentContainer.vue'
import BaseOrderHistory from '@/components/orederHistory/BaseOrderHistory.vue'
import { useOrderHistoryStore } from '@/stores/orderHistoryStore'
import { onMounted } from 'vue'

const store = useOrderHistoryStore()

onMounted(async () => {
  const historyOrder = await orderAPI.getHistoryOrder()
  store.updateHistoryOrder(historyOrder)
})
</script>

<template>
  <ContentContainer>
    <BaseOrderHistory />
  </ContentContainer>
</template>
