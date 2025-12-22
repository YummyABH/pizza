<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore'
import { useOrderAllStore } from '@/stores/orderAllStore'
import { onMounted, reactive, ref, watch } from 'vue'
import { connectWebSocket } from '../composible/useWebSocket'
import OrdersDishCard from '@/api/admin/ui/card/OrdersDishCard.vue'
import OrdersTableCardMini from '@/api/admin/ui/card/table/OrdersTableCardMini.vue'
import OrderTableItem from '@/api/admin/ui/card/table/OrderTableItem.vue'
import OrdersModalCard from '@/api/admin/orders/OrdersModalCard.vue'
import IconCrass from '../icons/IconCrass.vue'

let ws

const permission = ref('default') // 'granted', 'denied', 'default'

// Проверяем разрешение при загрузке
if ('Notification' in window) {
  permission.value = Notification.permission

  if (Notification.permission === 'default') {
    Notification.requestPermission().then((result) => {
      permission.value = result
    })
  }
}

console.log(permission.value)

const store = useOrderAllStore()
const storeAdmin = useAdminStore()
const isActiveStatusMenu = ref<boolean>(false)
const activeDish = ref(false)
const dishesList = ref([])
const idActiveModal = ref(false)
const activeOrder = reactive({
  cutlery_status: false,
  cutlery_quantity: 0,
  phone: '',
  delivery: {
    comment: '',
  },
  order_comment: '',
})

function sendMessage(id: number) {
  const status = event?.target?.textContent
  ws.value.send(JSON.stringify({ type: 'update-status', action: { id: id, status: status } }))
}

onMounted(() => {
  ws = connectWebSocket()
})
</script>

<template>
  <div
    v-show="idActiveModal"
    class="lg:hidden z-50 overflow-y-scroll fixed h-full left-0 -top-24 text-center px-10 max-sm:px-3 w-full mt-25 max-md:py-6 py-12 bg-white rounded-2xl"
  >
    <div class="bg-white fixed left-0 top-0 z-50 w-full px-10 py-2">
      <div class="flex justify-self-end border rounded-full p-0.5" @click="idActiveModal = false">
        <IconCrass />
      </div>
    </div>
    <div
      class="col-span-3 text-white gap-x-3 grid grid-cols-8 rounded-xl mt-6 py-2 bg-[#1b233a] px-5"
    >
      <div class="text-sm col-span-full border-b flex gap-4 py-1 justify-center">
        <h3 class="text-blue-200">Приборы:</h3>
        <span>{{
          activeOrder.cutlery_status ? activeOrder.cutlery_quantity + ' шт.' : 'Не нужны'
        }}</span>
      </div>
      <div class="text-sm col-span-full flex gap-4 py-1 justify-center pb-1 border-y">
        <h3 class="text-blue-200">Номер телефона:</h3>
        <span>{{ activeOrder.phone }}</span>
      </div>
      <div class="text-sm col-span-full flex gap-4 py-1 justify-center">
        <h3 class="text-blue-200">Цена:</h3>
        <span>{{ activeOrder.total_price }}</span>
      </div>
      <div class="col-span-full flex flex-col text-sm pb-1 border-y">
        <h3 class="text-blue-200">Комментарий к адресу:</h3>
        <span>{{ activeOrder.delivery.comment }}</span>
      </div>
      <div class="col-span-full flex-col text-sm flex pt-1 pb-1">
        <h3 class="text-blue-200">Комментарий к заказу:</h3>
        <span>{{ activeOrder.order_comment }}</span>
      </div>
    </div>
    <h1 class="text-3xl font-semibold mt-4">Заказы</h1>
    <div class="max-sm:pt-6 pt-8">
      <div
        class="w-full grid grid-cols-4 gap-10 max-xl:grid-cols-3 max-sm:gap-4 max-sm:gap-y-8 max-lg:grid-cols-2"
      >
        <OrdersModalCard v-for="(dish, indexDish) in dishesList" :key="indexDish" :dish="dish" />
      </div>
    </div>
  </div>
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-lg:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-2 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <h1 class="mb-8 text-2xl text-center font-medium">Заказы</h1>
      <!-- <div class="grid grid-cols-4 gap-7"></div> -->
      <div class="max-lg:hidden bg-[#111827] rounded-xl p-5 max-w-full">
        <div class="grid grid-cols-7 max-2xl:grid-cols-14 w-full justify-between gap-x-3">
          <div class="grid grid-cols-subgrid max-2xl:col-span-14 col-span-7 border-b border-t">
            <div
              class="flex px-5 max-2xl:col-start-1 max-2xl:col-span-1 py-3 justify-self-center w-max"
            >
              Номер
            </div>
            <div
              class="flex px-5 max-2xl:col-start-2 max-2xl:col-span-1 py-3 justify-self-center w-max"
            >
              Имя
            </div>
            <div
              class="flex px-5 max-2xl:col-start-4 max-2xl:col-span-2 py-3 justify-self-center w-max"
            >
              Дата заказа
            </div>
            <div
              class="flex px-5 max-2xl:col-span-5 max-2xl:col-start-6 py-3 justify-self-center w-max"
            >
              Адрес
            </div>
            <div
              class="flex px-5 max-2xl:col-span-2 max-2xl:col-start-11 py-3 justify-self-center w-max"
            >
              Статус
            </div>
            <div
              class="flex px-5 max-2xl:col-span-1 max-2xl:col-start-13 py-3 justify-self-center w-max"
            >
              Сумма
            </div>
            <div
              class="flex px-5 max-2xl:col-span-2 py-3 max-2xl:col-start-14 justify-self-center w-max"
            ></div>
          </div>
          <OrderTableItem
            v-for="order in store.allHistoryOrder"
            :key="order.id"
            :order="order"
            @send-message="sendMessage"
            v-model:is-active-status-menu="isActiveStatusMenu"
            v-model:active-dish="activeDish"
          >
            <div
              @click.stop
              class="max-2xl:col-span-14 col-span-7 justify-between px-5 py-7 grid grid-cols-3 max-2xl:grid-cols-2 gap-4 bg-[#6760c4]"
              v-show="activeDish === order.id"
            >
              <div
                class="col-span-3 max-2xl:col-span-2 gap-x-3 grid grid-cols-8 rounded-xl bg-[#1b233a] px-5 py-3"
              >
                <div class="text-lg col-span-3 flex gap-4 py-1">
                  <h3 class="text-blue-200">Приборы:</h3>
                  <span>{{
                    order.cutlery_status ? order.cutlery_quantity + ' шт.' : 'Не нужны'
                  }}</span>
                </div>
                <div class="text-lg col-span-5 flex gap-4 py-1">
                  <h3 class="text-blue-200">Номер телефона:</h3>
                  <span>{{ order.phone }}</span>
                </div>
                <div class="col-span-full text-lg flex gap-4 pb-1 border-y">
                  <h3 class="text-blue-200">Комментарий к адресу:</h3>
                  <span>{{ order.delivery.comment }}</span>
                </div>
                <div class="col-span-full text-lg flex gap-4 pt-1 pb-1">
                  <h3 class="text-blue-200">Комментарий к заказу:</h3>
                  <span>{{ order.order_comment }}</span>
                </div>
              </div>
              <OrdersDishCard v-for="dish in order?.dishes" :key="dish.id" :dish="dish" />
            </div>
          </OrderTableItem>
        </div>
      </div>
      <div class="py-6 grid px-4 gap-4 sm:grid-cols-3 lg:hidden [480px]:grid-cols-2 grid-cols-1">
        <OrdersTableCardMini
          v-for="order in store.allHistoryOrder"
          :key="order.id"
          @click="
            ((dishesList = order.dishes),
            idActiveModal ? (idActiveModal = false) : (idActiveModal = true),
            (activeOrder = order))
          "
          :order="order"
          :ws="ws"
          v-model:is-active-status-menu="isActiveStatusMenu"
          v-model:activeDish="activeDish"
        />
      </div>
    </div>
  </div>
</template>
