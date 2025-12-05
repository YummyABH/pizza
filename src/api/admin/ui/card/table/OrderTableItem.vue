<script setup lang="ts">
import IconEye from '@/components/icons/IconEye.vue'
import { normalizeTime } from '@/utility/normalizeData'
import { computed } from 'vue'

const props = defineProps({
  order: Object,
  ws: WebSocket
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
  props.ws.send(JSON.stringify({ type: 'update-status', action: {id: id, status: status} }))
}
</script>

<template>
  <div
    @click="order.id === activeDish ? (activeDish = false) : (activeDish = order.id)"
    class="grid grid-cols-subgrid col-span-7 max-2xl:col-span-14 border-b border-t"
  >
    <div class="flex max-2xl:col-span-1 px-5 py-3 justify-self-center w-max">{{ order.id }}</div>
    <div class="flex max-2xl:col-span-1 max-2xl:col-start-2 px-5 py-3 justify-self-center w-max">{{ order.name }}</div>
    <div class="flex px-5 py-3 justify-self-center w-max max-2xl:col-span-2 max-2xl:col-start-4">
      {{ normalizeTime(order.created_at) }}
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max max-2xl:col-span-5 max-2xl:col-start-6">
      {{ order.delivery.status ? order.delivery.address : 'Самовывоз' }}
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max max-2xl:col-span-2 max-2xl:col-start-11">
      <div
        @click.stop="isActiveStatusMenu === order.id ? isActiveStatusMenu = false : isActiveStatusMenu = order.id"
        :class="styleStatusOrder"
        class="relative cursor-pointer px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
      >
        {{ order.current_status }}
        <div @click="sendMessage(order.id)" v-show="isActiveStatusMenu === order.id" class="absolute z-50 w-max overflow-hidden top-full mt-1 left-1/2 transform -translate-x-1/2 flex flex-col rounded-lg">          
          <div class="bg-yellow-500 p-1 w-full">В процессе</div>
          <div class="bg-green-500 p-1 w-full">Готов</div>
          <div class="bg-red-500 p-1 w-full">Отменён</div>
        </div>
      </div>
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max max-2xl:col-span-1 max-2xl:col-start-13">{{ order.total_price }}</div>
    <div class="flex px-5 py-3 justify-self-center w-max max-2xl:col-span-1 max-2xl:col-start-14"><IconEye /></div>
    <slot></slot>
  </div>
</template>