<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore'
import { useDishesStore } from '@/stores/dishesStore'
import { computed } from 'vue'
import { toastCreate } from '@/utility/createToast'

const store = useOrderStore()
const storeDish = useDishesStore()
const statusModalDish = defineModel('statusModalDish')
const props = defineProps({
  dishList: Object,
  indexCategory: Number,
  indexDish: Number,
})

const indexCharacteristics = computed(() => props.dishList.default_characteristics)

function addDishInOrder() {
  const statusAdd = !store.addDishItem(props.dishList, indexCharacteristics.value)

  if (statusAdd) return toastCreate('Блюдо добавлено в заказ !', 'success')
  toastCreate('Блюдо уже было добавлено в заказ', 'info')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div
      @click="statusModalDish = true"
      class="cursor-pointer block h-46 max-sm:h-auto max-sm:rounded-2xl mb-3 rounded-3xl overflow-hidden"
    >
      <img
        :src="`https://cemubribepit.beget.app/uploads/${dishList.image}`"
        class="max-sm:aspect-3/2 w-full h-full object-cover"
      />
    </div>

    <div class="flex flex-col flex-1 justify-between h-full">
      <div class="">
        <h3 class="text-lg mb-1 font-medium max-sm:text-base">{{ dishList.name }}</h3>
        <div
          class="flex flex-wrap gap-x-3 gap-y-1.5 max-sm:text-sm max-sm:gap-x-1.5 text-gray-600 mb-3 max-sm:mb-3 max-sm:flex-wrap"
        >
          <span
            >{{ dishList.characteristics[indexCharacteristics].quantity }}
            {{ dishList.characteristics[indexCharacteristics].measure }}.</span
          >
          <div class="flex gap-x-2 cursor-pointer" v-if="dishList.characteristics.length > 1">
            <div
              v-for="(item, index) in dishList.characteristics"
              @click="storeDish.updateDefaultCharacteristics(index, indexCategory, indexDish)"
              :key="index"
              :class="index === indexCharacteristics ? 'bg-green-500 text-white' : ''"
              class="px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
            >
              {{ item.size }}
            </div>
          </div>
        </div>
      </div>

      <div
        @click="addDishInOrder"
        class="cursor-pointer w-full items-center hover:bg-gray-600 duration-200 justify-center flex gap-4 py-2 px-4 font-semibold rounded-3xl text-white bg-gray-700"
      >
        
        <span>{{ dishList.characteristics[indexCharacteristics]?.price }} ₽</span>
      </div>
    </div>
  </div>
</template>
