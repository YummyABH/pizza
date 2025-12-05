<script setup lang="ts">
import { categoriesAPI } from '@/api/apiGetDish'
import IconEdit from '@/components/icons/IconEdit.vue'
import { onMounted } from 'vue'

const props = defineProps({
  dish: Object,
})
// onMounted(() => {
//   categoriesAPI.updateDish(props.dish)
// })
</script>

<template>
  <div class="grid grid-cols-subgrid col-span-6 border-b border-t">
    <div class="flex px-5 py-3 justify-self-center w-max">{{ dish?.dish_id }}</div>
    <div
      class="flex px-5 py-3 justify-self-center w-max max-md:col-span-2 max-sm:col-span-3 max-sm:text-xs"
    >
      {{ dish?.dish_name }}
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max col-start-5">
      <!-- {{ dish?.dish_status ? 'Активно' : 'Не активно' }} -->
      <div
        @click.stop="store.updateStatusOrder(dish.dish_id)"
        :class="dish.dish_status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
        class="cursor-pointer px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
      >
        {{ dish.dish_status ? 'Активно' : 'Скрыт' }}
      </div>
    </div>
    <router-link to="/admin-menu/dishes/edit/1">
      <div class="flex px-5 py-3 justify-self-center w-max col-start-6"><IconEdit /></div>
    </router-link>
    <!-- <div class="flex px-5 py-3 justify-self-center w-max"><IconEye /></div> -->
    <!-- <slot></slot> -->
  </div>
</template>
