<script setup lang="ts">
import { normalizeTime } from '@/utility/normalizeData'
import { computed } from 'vue'

const props = defineProps({
  order: Object,
  ws: WebSocket,
})

const activeDish = defineModel('activeDish')
const isActiveStatusMenu = defineModel('isActiveStatusMenu')

const styleStatusOrder = computed(() => {
  let color: string = 'bg-yellow-500'
  if (props.order.current_status === 'Готов') color = 'bg-green-500'
  if (props.order.current_status === 'Отменён') color = 'bg-red-500'
  return color
})

function sendMessage(id: number) {
  const status = event?.target?.textContent
  props.ws.send(JSON.stringify({ type: 'update-status', action: { id: id, status: status } }))
}
</script>

<template>
  <div
    @click="order.id === activeDish ? (activeDish = null) : (activeDish = order.id)"
    :class="order.status ? 'bg-green-500' : 'bg-white'"
    class="px-3 py-2 max-sm:text-sm text-black rounded-xl flex flex-col"
  >
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Номер заказа: </span>
      <span>{{ order.id }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Дата: </span>
      <span>{{ normalizeTime(order.created_at) }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Имя: </span>
      <span>{{ order.name }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Адрес: </span>
      <span>{{ order.delivery.status ? order.delivery.address : 'Самовывоз' }}</span>
    </div>
    <div class="flex gap-x-2 flex-col text-center border-b">
      <span class="font-medium">Номер: </span>
      <span>{{ order.phone }}</span>
    </div>
    <div class="flex gap-x-2 flex-col items-center text-center">
      <span class="font-medium">Статус: </span>
      <div class="flex px-5 py-3 justify-self-center w-max">
        <div
          @click.stop="
            isActiveStatusMenu === order.id
              ? (isActiveStatusMenu = false)
              : (isActiveStatusMenu = order.id)
          "
          :class="styleStatusOrder"
          class="relative text-white cursor-pointer px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
        >
          {{ order.current_status }}
          <div
            @click="sendMessage(order.id)"
            v-show="isActiveStatusMenu === order.id"
            class="absolute w-max overflow-hidden top-full mt-1 left-1/2 transform -translate-x-1/2 flex flex-col rounded-lg"
          >
            <div class="bg-yellow-500 p-1 w-full">В процессе</div>
            <div class="bg-green-500 p-1 w-full">Готов</div>
            <div class="bg-red-500 p-1 w-full">Отменён</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
