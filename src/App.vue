<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayoutAdmin from './AppLayoutAdmin.vue'
import AppLayoutUser from './AppLayoutUser.vue'

const route = useRoute()

const layoutComponent = computed(() => {
  return route.meta.layout === 'user' ? AppLayoutUser : AppLayoutAdmin
})
</script>

<template>
  <component :is="layoutComponent"></component>
</template>
