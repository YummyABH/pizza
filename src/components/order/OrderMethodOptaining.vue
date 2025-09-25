<script setup lang="ts">
import { computed, ref } from 'vue'
import FormInput from '../ui/FormInput.vue'

const REGEX_ADRESS = ref(/^[a-zA-Zа-яА-ЯёЁ0-9\s\.,\-\/№]+$/)
const REGEX_ADRESS_COMMENT = ref(/^[а-яА-ЯёЁ ]{0,255}$/)

const statusDelivery = ref(true)
const adress = ref('')
const adressComment = ref('')
const classDelivery = computed(() => {
  return {
    delivery: statusDelivery.value ? 'before:w-24.5' : 'before:w-0',
    pickup: statusDelivery.value ? 'before:w-0' : 'before:w-32',
  }
})
</script>

<template>
  <div class="">
    <h2 class="text-xl mb-4 font-medium">Способ получения</h2>
    <div class="flex flex-col gap-5">
      <div class="flex font-medium group text-lg">
        <div
          @click="statusDelivery = true"
          :class="classDelivery.delivery"
          class="cursor-pointer duration-200 group-hover:after:bg-green-500 hover:before:bg-green-500 relative before:absolute pb-1 before:bottom-0 before:right-0 pr-3 hover:before:w-24.5 before:duration-300 before:h-0.5 before:bg-green-600 after:absolute after:transform after:translate-x-2 after:right-0 after:bottom-0 after:w-0.5 after:h-8 after:bg-green-600 after:rotate-30"
        >
          Доставка
        </div>
        <div
          @click="statusDelivery = false"
          :class="classDelivery.pickup"
          class="pl-6 peer relative duration-200 cursor-pointer before:bg-green-600 hover:before:bg-green-500 before:absolute pb-1 before:bottom-0 before:-left-0.5 hover:before:w-32 before:duration-300 before:h-0.5"
        >
          Самовывоз
        </div>
      </div>
      <div v-show="statusDelivery" class="flex flex-col gap-y-5">
        <FormInput
          id="adress"
          label="Адрес"
          type="text"
          v-model="adress"
          required
          :pattern="REGEX_ADRESS"
        />
        <FormInput
          id="delivery-comment"
          label="Комментарий к адресу"
          type="adressComment"
          v-model="adressComment"
          required
          :pattern="REGEX_ADRESS_COMMENT"
        />
      </div>
      <div v-show="!statusDelivery" class="flex flex-col gap-y-5">
        <label class="flex gap-x-4 text-lg font-medium items-center">
          <input
            type="radio"
            name="adress"
            class="inline-block h-3.5 w-3.5 text-white border-gray-800 appearance-none border rounded-full checked:bg-green-600 checked:border-green-400 focus:outline-none focus:ring-2"
          />
          Адрес самовывоза
        </label>
      </div>
    </div>
  </div>
</template>
