<script setup lang="ts">
import { onMounted } from 'vue'
import AppSideBar from './components/admin/AppSideBar.vue'
import { useAdminMenuStore } from './stores/adminMenuStore'
import { categoriesAPI } from './api/apiGetDish'

const adminMenuStore = useAdminMenuStore()

onMounted(async () => {
  const response = await categoriesAPI.getPrices()
  adminMenuStore.updateAdminPrices(response[0].price_list)
  adminMenuStore.updateOpeningHours({
    closes_at: response[0].closes_at,
    opens_at: response[0].opens_at,
  })
})
</script>

<template>
  <Suspense>
    <template #fallback></template>
    <RouterView v-slot="{ Component, route }">
      <AppSideBar v-if="!route.meta.noSidebar" />
      <main>
        <component :is="Component"></component>
      </main>
    </RouterView>
  </Suspense>
</template>
