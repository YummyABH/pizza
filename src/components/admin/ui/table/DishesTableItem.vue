<script setup lang="ts">
import { categoriesAPI } from '@/api/apiGetDish'
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import IconEdit from '@/components/icons/IconEdit.vue'

const adminMenuStore = useAdminMenuStore()

const props = defineProps({
  dish: Object,
})

async function updateStatus() {
  try {
    const formData = new FormData()

    const status = props.dish.dish_status ? false : true
    formData.append('id', props.dish.id)
    formData.append('dish_status', status)
    const response = await categoriesAPI.updateDish(formData)
    adminMenuStore.updateAdminDishesItem(response[0], props.dish.id)
    // console.log(adminMenuStore.adminDishes[response.id][0].dish_status);
  } catch (error) {
    toastCreate('Произошла ошибка изменения статуса', 'error')
    console.log(error)
  }
}
</script>

<template>
  <div class="grid grid-cols-subgrid col-span-6 border-b border-t">
    <div class="flex px-5 py-3 justify-self-center w-max">{{ dish?.id }}</div>
    <div
      class="flex px-5 py-3 justify-self-center w-max max-md:col-span-2 max-sm:col-span-3 max-sm:text-xs"
    >
      {{ dish?.name }}
    </div>
    <div class="flex px-5 py-3 justify-self-center w-max col-start-5">
      <div
        @click="updateStatus()"
        :class="dish.dish_status ? 'bg-green-500 text-white' : 'bg-yellow-500'"
        class="cursor-pointer px-2 py-0.5 rounded-xl max-sm:px-1.5 max-sm:text-[12px]"
      >
        {{ dish.dish_status ? 'Активно' : 'Скрыт' }}
      </div>
    </div>
    <router-link :to="`/admin-menu/dishes/edit/${dish.id}`">
      <div class="flex px-5 py-3 justify-self-center w-max col-start-6"><IconEdit /></div>
    </router-link>
  </div>
</template>
