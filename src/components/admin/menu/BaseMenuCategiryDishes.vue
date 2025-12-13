<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore'
import { categoriesAPI } from '@/api/apiGetDish'
import { onMounted, ref, watch } from 'vue'
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import BaseDelateItem from '@/components/ui/BaseDelateItem.vue'
import { addCatigories } from '@/utility/addCategories'
import { useRouter } from 'vue-router'
import BaseCategoryItem from './BaseCategoryItem.vue'
import { toastCreate } from '@/utility/createToast'

const router = useRouter()
const idActiveCategory = ref<number | null>(null)
const storeAdmin = useAdminStore()
const adminMenuStore = useAdminMenuStore()

const loadingStatus = ref<boolean>(false)
const isOpenDelateModal = ref<boolean>(false)

async function updateCategories() {
  const { response, statusResponse } = await addCatigories(
    adminMenuStore.adminMenu,
    adminMenuStore.lengthAdminMenu,
  )
  console.log(response)

  if (response) {
    adminMenuStore.updateAdminCategory(response)
  }
  if (!statusResponse) return toastCreate('Произошла ошибка сохранения', 'error')
  return toastCreate('Сохранение успешно', 'success')
}

async function deleteCategory(id: number) {
  try {
    loadingStatus.value = true
    const indexDelete = adminMenuStore.adminMenu.findIndex((el) => el.id === id)

    if (indexDelete < adminMenuStore.lengthAdminMenu) {
      await categoriesAPI.delateCategory(id)
    }
    adminMenuStore.deleteCategoriesItem(id)
    adminMenuStore.updateLengthAdminMenu()
  } catch (error) {
  } finally {
    loadingStatus.value = false
    isOpenDelateModal.value = false
  }
}

onMounted(async () => {
  const response = await categoriesAPI.getCategories()
  adminMenuStore.updateAdminCategory(response)
  adminMenuStore.updateLengthAdminMenu()
})
</script>

<template>
  <div
    v-show="loadingStatus"
    class="w-screen h-screen bg-black/35 flex fixed top-0 left-0 z-100 justify-center items-center"
  >
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400"></div>
  </div>
  <BaseDelateItem
    @delete-item="deleteCategory(idActiveCategory)"
    v-model:is-open-delate-modal="isOpenDelateModal"
  />
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-md:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <h1 class="mb-8 text-2xl text-center font-medium">Категории блюд</h1>
      <div class="bg-[#111827]  rounded-xl p-5 max-w-full max-sm:px-2 text-base">
        <div class="flex justify-self-end mb-4 gap-6 flex-wrap">
          <div
            @click="updateCategories"
            class="text-lg rounded-lg px-3 py-2 cursor-pointer bg-gray-600 duration-200 hover:bg-blue-600"
          >
            Сохранить
          </div>
          <div
            @click="adminMenuStore.addAdminCategory()"
            class="text-lg rounded-lg px-3 py-2 cursor-pointer bg-green-600 duration-200 hover:bg-green-500"
          >
            Добавить
          </div>
        </div>
        <div class="flex justify-between border-y py-3 px-5">
          <div>Номер</div>
          <div>Название</div>
        </div>
        <div class="overflow-auto">
          <BaseCategoryItem
            v-for="(category, index) in adminMenuStore.adminMenu"
            :key="category.id"
            v-model:category="adminMenuStore.adminMenu[index]"
            v-model:is-open-delate-modal="isOpenDelateModal"
            v-model:id-active-category="idActiveCategory"
            class="flex justify-between border-y py-3 px-5 text-lg max-md:text-lg font-medium max-sm:text-sm max-sm:font-normal"
          />
        </div>
      </div>
    </div>
  </div>
</template>
