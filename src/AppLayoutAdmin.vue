<script setup lang="ts">
import AppSideBar from './components/admin/AppSideBar.vue'
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
