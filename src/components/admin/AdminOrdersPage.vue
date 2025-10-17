<script setup lang="ts">
import { orderAPI } from '@/api/apiOrder'
import IconEye from '@/components/icons/IconEye.vue'
import { useAdminStore } from '@/stores/adminStore'
import { useOrderAllStore } from '@/stores/orderAllStore'
import { onMounted, ref } from 'vue'

const store = useOrderAllStore()
const storeAdmin = useAdminStore()
const activeDish = ref(null)

onMounted(async () => {
  const allHistoryOrder = await orderAPI.getAllOrder()
  store.updateAllHistoryOrder(allHistoryOrder)
})

function normalizeTime(time: string) {
  const date = new Date(time)
  const pad = (n: number) => n.toString().padStart(2, '0')
  const formatted = `${pad(date.getHours())}:${pad(date.getMinutes())} ${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  return formatted
}
</script>

<template>
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0">
      <h1 class="mb-8 text-2xl font-medium">Заказы</h1>
      <!-- <div class="grid grid-cols-4 gap-7"></div> -->
      <div class="bg-[#111827] rounded-xl p-5 max-w-full overflow-x-scroll">
        <div class="min-w-300 grid grid-cols-7 w-full justify-between gap-x-3">
          <div class="grid grid-cols-subgrid col-span-7 border-b border-t">
            <div class="flex px-5 py-3 justify-self-center w-max">Номер заказа</div>
            <div class="flex px-5 py-3 justify-self-center w-max">Имя</div>
            <div class="flex px-5 py-3 justify-self-center w-max">Дата заказа</div>
            <div class="flex px-5 py-3 justify-self-center w-max">Адрес</div>
            <div class="flex px-5 py-3 justify-self-center w-max">Сумма</div>
            <div class="flex px-5 py-3 justify-self-center w-max">Статус</div>
            <div class="flex px-5 py-3 justify-self-center w-max"></div>
          </div>
          <div
            v-for="order in store.allHistoryOrder"
            :key="order.id"
            @click="order.id === activeDish ? (activeDish = null) : (activeDish = order.id)"
            class="grid grid-cols-subgrid col-span-7 border-b border-t"
          >
            <div class="flex px-5 py-3 justify-self-center w-max">{{ order.id }}</div>
            <div class="flex px-5 py-3 justify-self-center w-max">{{ order.name }}</div>
            <div class="flex px-5 py-3 justify-self-center w-max">
              {{ normalizeTime(order.created_at) }}
            </div>
            <div class="flex px-5 py-3 justify-self-center w-max">
              {{ order.delivery.status ? order.delivery.address : 'Самовывоз' }}
            </div>
            <div class="flex px-5 py-3 justify-self-center w-max">
              <div
                :class="order.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
                class="px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
              >
                {{ order.status ? 'Доставлен' : 'В процессе' }}
              </div>
            </div>
            <div class="flex px-5 py-3 justify-self-center w-max">{{ order.total_price }}</div>
            <div class="flex px-5 py-3 justify-self-center w-max"><IconEye /></div>
            <div
              @click.stop
              class="col-span-7 justify-between px-5 py-7 grid grid-cols-3 gap-4 bg-[#6760c4]"
              v-show="activeDish === order.id"
            >
              <div class="col-span-3 gap-x-3 grid grid-cols-8 rounded-xl bg-[#1b233a] px-5 py-3">
                <div class="text-lg col-span-2 flex gap-4 py-1">
                  <h3 class="text-blue-200">Приборы:</h3>
                  <span>{{
                    order.cutlery_status ? order.cutlery_quantity + ' шт.' : 'Не нужны'
                  }}</span>
                </div>
                <div class="text-lg col-span-3 flex gap-4 py-1">
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
              <div
                v-for="dish in order?.dishes"
                :key="dish.id"
                class="rounded-xl flex gap-x-3 bg-[#1b233a]"
              >
                <img
                  :src="`https://restik-street-style.onrender.com/uploads/${dish?.image}`"
                  class="aspect-1/1 object-cover w-25 rounded-lg"
                />
                <div class="">
                  <h3 class="mb-1 font-medium max-sm:text-base text-start">
                    <span class="font-normal">Название:</span> {{ dish.name }}
                  </h3>
                  <div
                    class="flex gap-x-3 gap-y-1.5 max-sm:text-sm max-sm:gap-x-1.5 max-sm:mb-3 max-sm:flex-wrap"
                  >
                    <span class="font-medium"
                      ><span class="font-normal">Количество:</span> {{ dish.quantity }}</span
                    >
                    |
                    <span class="font-medium"
                      ><span class="font-normal">Размер:</span> {{ dish.size }}</span
                    >
                  </div>
                  <div
                    class="flex my-3 gap-x-3 gap-y-1.5 max-sm:text-sm max-sm:gap-x-1.5 max-sm:mb-3 max-sm:flex-wrap"
                  >
                    <span class="font-medium flex gap-x-3"
                      ><span class="font-normal">Статус:</span>
                      <div
                        :class="dish.status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
                        class="px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
                      >
                        {{ dish.status ? 'Доставлен' : 'В процессе' }}
                      </div></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
