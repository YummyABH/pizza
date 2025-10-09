<script setup lang="ts">
import FormInput from '../ui/FormInput.vue'
import { computed, ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import BaseInput from '../ui/BaseInput.vue'
import { useOrderInputStore } from '@/stores/orderInputStore'
import BaseMap from './BaseMap.vue'

const store = useOrderStore()
const orderInputStore = useOrderInputStore()
const REGEX_ADRESS = ref(/^[a-zA-Zа-яА-ЯёЁ0-9\s\.,\-\/№]+$/)
const REGEX_ADRESS_COMMENT = ref(/^[а-яА-ЯёЁ ]{0,255}$/)
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
        <BaseInput
          id="address"
          title="Введите адрес"
          selecte="address"
          v-model="store.order.delivery.address"
          label="Адрес доставки"
          :mask="addressMask"
        />
        <BaseMap/>
        <BaseInput
          id="delivery-comment"
          title="Введите адрес"
          selecte="comment"
          v-model="store.order.delivery.comment"
          label="Комментарий к адресу"
          :mask="addressMask"
        />
      </div>
      <div v-show="!store.order.delivery.status" class="flex flex-col gap-y-5">
        <label class="flex gap-x-4 text-lg items-center">
          <!-- <input
            type="radio"
            name="adress"
            class="inline-block h-3.5 w-3.5 text-white border-gray-800 appearance-none border rounded-full checked:bg-green-600 checked:border-green-400 focus:outline-none focus:ring-2"
          /> -->
          <span class="font-medium">Адрес:</span>
          <span>Сухум, Абаза амҩа, 33</span>
        </label>
      </div>
    </div>
  </div>
</template>
