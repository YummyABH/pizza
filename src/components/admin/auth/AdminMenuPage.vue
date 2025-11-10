<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore'

const storeAdmin = useAdminStore()
</script>

<template>
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-md:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <h1 class="mb-8 text-2xl text-center font-medium">Блюда</h1>
      <div class=""></div>
    </div>
  </div>
</template>
