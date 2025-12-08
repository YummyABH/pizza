<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore'
import { categoriesAPI } from '@/api/apiGetDish'
import { onMounted, ref, watch } from 'vue'
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import BaseDelateItem from '@/components/ui/BaseDelateItem.vue'
import { addCatigories } from '@/utility/addCategories'
import { useRouter } from 'vue-router'
import BaseCategoryItem from './BaseCategoryItem.vue'

const router = useRouter()
const idActiveCategory = ref<number | null>(null)
const storeAdmin = useAdminStore()
const adminMenuStore = useAdminMenuStore()

const loadingStatus = ref<boolean>(false)
const isOpenDelateModal = ref<boolean>(false)

function updateCategories() {
  addCatigories(adminMenuStore.adminMenu, adminMenuStore.lengthAdminMenu)
}

async function deleteCategory(id: number) {
  try {
    loadingStatus.value = true
    const indexDelete = adminMenuStore.adminMenu.findIndex((el) => el.id === id)

    if (indexDelete < adminMenuStore.lengthAdminMenu) {
      await categoriesAPI.delateCategory(id)
    }
    adminMenuStore.deleteCategoriesItem(id)
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
      <div class="bg-[#111827] rounded-xl p-5 max-w-full max-sm:px-2 text-base">
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
</template>
