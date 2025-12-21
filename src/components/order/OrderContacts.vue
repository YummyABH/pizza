<script setup lang="ts">
import OrderMethodOptaining from './OrderMethodOptaining.vue'
import { useOrderStore } from '@/stores/orderStore'
import { useOrderInputStore } from '@/stores/orderInputStore'
import BaseInput from '@/components/ui/BaseInput.vue'
import { toastCreate } from '@/utility/createToast'

const store = useOrderStore()
const orderInputStore = useOrderInputStore()
const storeOrder = useOrderStore()

const addressMask = orderInputStore.addressMask
const nameMask = orderInputStore.nameMask

async function dataRequestCalculation() {
  const isValid = orderInputStore.validateForm()
  if (isValid && store.order.dishes.length) {
    try {
      await store.postOrder()
      storeOrder.clearDishesInOrder()
    } catch (error) {
      
    }
    store.taggleOrderModal()
  } else if (!store.order.dishes.length) {
    toastCreate('Вы не выбрали ни одного блюда', 'info')
  } else {
    toastCreate('Вы заполнили не все обязательные поля', 'info')
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
            select="name"
            v-model="store.order.name"
            label="Имя"
            :mask="nameMask"
          />
          <BaseInput
            id="phone"
            title="Можно вводить только цифры"
            selecte="phone"
            v-model="store.order.phone"
            label="Номер телефон"
            :mask="'+ 7 (###) ###-##-##'"
          />
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
        <BaseInput
          id="order-comment"
          title=""
          selecte="order_comment"
          v-model="store.order.order_comment"
          label="Комментарий к заказу"
          :mask="addressMask"
        />
      </div>
      <div class="text-lg font-medium">
        Время работы:
        <span class="font-normal">
          с {{ store.openTime.opens_at }} до {{ store.openTime.closes_at }}
        </span>
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
