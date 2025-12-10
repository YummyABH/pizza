<script setup lang="ts">
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import { ref } from 'vue'

const urlImg = ref<string>('')
const store = useAdminMenuStore()

function delateImg() {
  store.updateFieldEditDish('image', null)
  urlImg.value = ''
}

function handleChange(event: Event) {
  if (!event.target?.files[0]) return
  store.updateFieldEditDish('image', event.target?.files[0])
  urlImg.value = URL.createObjectURL(event.target?.files[0])
}

function handleDrop(event: DragEvent) {
  if (event.dataTransfer?.files[0]) {
    store.updateFieldEditDish('image', event.dataTransfer?.files[0])
    urlImg.value = URL.createObjectURL(event.dataTransfer?.files[0])
  }
}
</script>

<template>
  <div class="">
    <div
      @drop.prevent="handleDrop"
      @dragover.prevent
      class="w-full h-50 max-lg:h-35 max-sm:h-20 rounded-xl overflow-hidden border border-gray-600 relative"
    >
      <label for="file" class="inline-block z-20 absolute top-3 left-3 text-white">
        Нажмите для выбора файла или перенесите его в данную область
      </label>
      <img v-show="urlImg || store.adminEditDish?.image" :src="urlImg || `https://cemubribepit.beget.app/uploads/${store.adminEditDish?.image}`" class="w-full h-full" />
      <input
        accept="image/*"
        id="file"
        name="file"
        class="opacity-0 absolute top-0 left-0 w-full h-full"
        type="file"
        @change="handleChange"
      />
      <div
        v-show="urlImg || store.adminEditDish?.image"
        @click="delateImg"
        class="absolute right-3 top-3 z-20 rounded-full p-1 border border-white cursor-pointer duration-200 hover:bg-red-700 bg-red-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  </div>
</template>
