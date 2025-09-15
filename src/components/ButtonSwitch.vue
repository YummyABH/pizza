<script setup lang="ts">
import { computed, ref } from 'vue'

const statusButton = ref(false)

const styleButton = computed(() => ({
  position: statusButton.value === true ? 'right-1' : 'left-1',
  background: statusButton.value === true ? 'bg-black' : 'bg-black/40',
}))
</script>

<template>
  <div
    @click="statusButton = !statusButton"
    class="cursor-pointer duration-300 relative w-14 flex p-1 h-7 rounded-xl bg-gray-300"
  >
    <div
      :class="[styleButton.background, styleButton.position]"
      class="absolute duration-300 h-5 w-5 rounded-full"
    ></div>
  </div>
</template>
