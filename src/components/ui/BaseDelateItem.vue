<script setup lang="ts">
import IconBasket from '@/components/icons/IconBasket.vue'
import IconCrass from '@/components/icons/IconCrass.vue'

defineProps({
  name: String,
})

const isOpen = defineModel('isOpenDelateModal')

const emits = defineEmits(['deleteItem']);

const deleteItem = () => {
  emits('deleteItem'); // Теперь Vue знает, что это кастомное событие
}
</script>

<template>
  <div
    @click="isOpen = false"
    :class="isOpen ? 'right-0' : '-right-full'"
    class="w-screen bg-black/50 z-50 top-0 h-screen fixed"
  ></div>
  <div
    :class="isOpen ? 'left-1/2 -translate-1/2' : '-right-full'"
    class="z-50 fixed p-6 transition duration-150 rounded-lg border border-gray-700 transform top-1/2 max-w-110 w-full bg-gray-800"
  >
    <div class="relative w-full h-full text-center">
      <IconCrass
        @click="isOpen = false"
        class="cursor-pointer absolute text-gray-500 duration-200 hover:text-white -top-2 -right-2"
      />
      <div class="p-4 rounded-full bg-red-500/25 inline-block mb-5">
        <IconBasket class="text-red-500" />
      </div>
      <div class="text-gray-100 mb-8">Вы уверены, что хотите это сделать?</div>
      <div class="flex gap-x-3 justify-self-center">
        <div
        @click="isOpen = false"
          class="py-2 px-3 text-white rounded-lg border bg-gray-10 border-gray-150 cursor-pointer duration-200 hover:bg-gray-150"
        >
          Отменить
        </div>
        <div
          @click="deleteItem"
          class="py-2 px-3 text-white rounded-lg border border-red-500 bg-red-500 duration-200 hover:bg-red-400 cursor-pointer"
        >
          Подтвердить
        </div>
      </div>
    </div>
  </div>
</template>
