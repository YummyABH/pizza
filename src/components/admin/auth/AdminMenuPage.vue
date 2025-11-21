<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore'

const storeAdmin = useAdminStore()
</script>

<template>
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-md:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <h1 class="mb-8 text-2xl text-center font-medium">Блюда</h1>
      <div class="max-md:hidden bg-[#111827] rounded-xl p-5 max-w-full overflow-x-au">
        <div class="min-w-300 grid grid-cols-7 w-full justify-between gap-x-3">
          <div class="grid grid-cols-subgrid col-span-7 border-b border-t">
            <div class="flex px-5 py-3 justify-self-center w-max">Номер блюда</div>
            <div class="flex px-5 py-3 justify-self-center w-max">Название</div>
            
            
            <div class="flex px-5 py-3 justify-self-center col-start-6 w-max">Статус</div>
            <div class="flex px-5 py-3 justify-self-center w-max"></div>
          </div>
          <!-- <OrderTableItem
            v-for="order in store.allHistoryOrder"
            :key="order.id"
            :order="order"
            v-model:active-dish="activeDish"
          >
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
              <OrdersDishCard v-for="dish in order?.dishes" :key="dish.id" :dish="dish" />
            </div>
          </OrderTableItem> -->
        </div>
      </div>
    </div>
  </div>
</template>
