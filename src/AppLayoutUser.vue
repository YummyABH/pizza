<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import OrderModalSide from './components/order/OrderModalSide.vue'
import { useOrderStore } from './stores/orderStore'
import { onMounted } from 'vue'
import { categoriesAPI } from './api/apiGetDish'

const storeOrder = useOrderStore()

function generateSecretKey(length = 32) {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}

if (!localStorage.getItem('secretKey')) {
  const secretKey = generateSecretKey()
  const normalizeSecretKey = secretKey.replace(/\+/g, '')
  localStorage.setItem('secretKey', normalizeSecretKey)
}

onMounted(async () => {
  const response = await categoriesAPI.getPrices()
  storeOrder.updateOpenTime({
    closes_at: response.closes_at,
    opens_at: response.opens_at,
  })
})
</script>

<template>
  <Suspense>
    <template #fallback></template>
    <RouterView v-slot="{ Component, route }">
      <OrderModalSide />
      <AppHeader v-if="!route.meta.noHeader"></AppHeader>
      <main>
        <component :is="Component"></component>
      </main>
      <AppFooter v-if="!route.meta.noFooter" />
    </RouterView>
  </Suspense>
</template>
