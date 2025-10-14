<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { useOrderInputStore } from '@/stores/orderInputStore'
import BaseInput from '../ui/BaseInput.vue'
import SelectMenu from '@/components/ui/SelectMenu.vue'

const store = useOrderStore()
const orderInputStore = useOrderInputStore()
const addressMask = orderInputStore.addressMask

const classDelivery = computed(() => {
  return {
    delivery: store.order.delivery.status ? 'before:w-24.5' : 'before:w-0',
    pickup: store.order.delivery.status ? 'before:w-0' : 'before:w-32',
  }
})
</script>

<template>
  <div class="">
    <h2 class="text-xl mb-4 font-medium">Способ получения</h2>
    <div class="flex flex-col gap-5">
      <div class="flex font-medium group text-lg">
        <div
          @click="store.order.delivery.status = true"
          :class="classDelivery.delivery"
          class="cursor-pointer duration-200 group-hover:after:bg-green-500 hover:before:bg-green-500 relative before:absolute pb-1 before:bottom-0 before:right-0 pr-3 hover:before:w-24.5 before:duration-300 before:h-0.5 before:bg-green-600 after:absolute after:transform after:translate-x-2 after:right-0 after:bottom-0 after:w-0.5 after:h-8 after:bg-green-600 after:rotate-30"
        >
          Доставка
        </div>
        <div
          @click="store.order.delivery.status = false"
          :class="classDelivery.pickup"
          class="pl-6 peer relative duration-200 cursor-pointer before:bg-green-600 hover:before:bg-green-500 before:absolute pb-1 before:bottom-0 before:-left-0.5 hover:before:w-32 before:duration-300 before:h-0.5"
        >
          Самовывоз
        </div>
      </div>
      <div v-show="store.order.delivery.status" class="flex flex-col gap-y-5">
        <SelectMenu
          @input="store.debouncedRequestGeo"
          :options="store.dataAddress"
          select="address"
          v-model="store.order.delivery.address"
          label="Адрес доставки"
        />

        <BaseInput
          id="delivery-comment"
          title="Введите адрес"
          select="comment"
          v-model="store.order.delivery.comment"
          label="Комментарий к адресу"
          :mask="addressMask"
        />
      </div>
      <div v-show="!store.order.delivery.status" class="flex flex-col gap-y-5">
        <label class="flex gap-x-4 text-lg items-center">
          <span class="font-medium">Адрес:</span>
          <span>Сухум, Абаза амҩа, 33</span>
        </label>
      </div>
    </div>
  </div>
</template>
