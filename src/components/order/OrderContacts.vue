<script setup lang="ts">
import FormInput from '@/components/ui/FormInput.vue'
import OrderMethodOptaining from './OrderMethodOptaining.vue'
import { vMaska } from 'maska/vue'
import { ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import { useOrderInputStore } from '@/stores/orderInputStore'
import BaseInput from '@/components/ui/BaseInput.vue'

const store = useOrderStore()
const orderInputSore = useOrderInputStore()

const nameMask = orderInputSore.nameMask
const REGEX_NAME = ref(/^[а-яА-ЯёЁ ]{0,32}$/)
const REGEX_ADRESS_COMMENT = ref(/^[а-яА-ЯёЁ ]{0,255}$/)

async function dataRequestCalculation() {
  const isValid = orderInputSore.validateForm()
  if (isValid) {
    // Отправка запроса на бэкенд
    console.log('Форма валидна, отправляем:')
    await store.postOrder()
  } else {
    console.log('Форма содержит ошибки')
  }
}
</script>

<template>
  <form action="">
    <div class="pt-4 border-t flex flex-col gap-10 border-t-gray-400">
      <div class="">
        <h2 class="text-xl mb-4 font-medium">Контакты</h2>
        <div class="flex flex-col gap-5">
          <BaseInput
            id="name"
            title="Можно вводить только русские буквы, пробелы и дефисы"
            selecte="name"
            label="Имя"
            :mask="nameMask"
          />
          <FormInput
            id="phone"
            v-maska="'+ 7 (###) ###-##-##'"
            label="Телефон"
            type="tel"
            v-model="store.order.phone"
            required
          />
          <!-- <FormInput
            id="name"
            :pattern="REGEX_NAME"
            label="Имя"
            type="text"
            v-model="store.order.name"
            required
          /> -->
        </div>
      </div>
      <OrderMethodOptaining />
      <!-- <div class="">
      <h2 class="text-xl mb-4 font-medium">Оплата</h2>
      <label
        @click="store.order.payment_card = true"
        class="flex gap-x-4 text-lg font-medium items-center"
      >
        <input
          type="radio"
          name="pay"
          class="inline-block h-3.5 w-3.5 text-white border-gray-800 appearance-none border rounded-full checked:bg-green-600 checked:border-green-400 focus:outline-none focus:ring-2"
        />
        Картой
      </label>
      <label
        @click="store.order.payment_card = false"
        class="flex gap-x-4 text-lg font-medium items-center"
      >
        <input
          type="radio"
          name="pay"
          class="inline-block h-3.5 w-3.5 text-white border-gray-800 appearance-none border rounded-full checked:bg-green-600 checked:border-green-400 focus:outline-none focus:ring-2"
        />
        Наличными
      </label>
    </div> -->
      <div class="">
        <h2 class="text-xl mb-4 font-medium">Примечание к заказу</h2>
        <FormInput
          id="order-comment"
          label="Комментарий к заказу"
          type="orderComment"
          v-model="store.order.order_comment"
          :pattern="REGEX_ADRESS_COMMENT"
        />
      </div>
    </div>
    <input
      value="Заказать"
      type="submit"
      @click.prevent="dataRequestCalculation()"
      class="mt-8 text-white text-center w-full rounded-3xl duration-300 cursor-pointer bg-gray-700 pt-2 pb-2.5 hover:bg-gray-600 text-3xl font-medium"
    />
  </form>
</template>
