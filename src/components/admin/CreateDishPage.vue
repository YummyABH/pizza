<script setup lang="ts">
import { categoriesAPI } from '@/api/apiGetDish'
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import { useAdminStore } from '@/stores/adminStore'
import { useRouter } from 'vue-router'
import { normalizeData } from '../composible/useNormalizeData'
import { onMounted, onUnmounted, ref } from 'vue'
import DragAndDropFile from './ui/table/DragAndDropFile.vue'
import IconLongArrow from '../icons/IconLongArrow.vue'
import IconBasket from '../icons/IconBasket.vue'
import { toastCreate } from '@/utility/createToast'

const router = useRouter()
const storeAdmin = useAdminStore()
const adminMenuStore = useAdminMenuStore()

const loadingStatus = ref<boolean>(false)
const idOpenCharacteristics = ref<number | null>(null)

async function saveUpdatingEditDish() {
  try {
    loadingStatus.value = true
    const normalizeDish = normalizeData(adminMenuStore.adminEditDish, 'create')
    await categoriesAPI.createDish(normalizeDish)
    toastCreate('Блюдо создано', 'success')
  } catch (error) {
    toastCreate('Заполните все поля', 'info')
  } finally {
    loadingStatus.value = false
  }
}

onMounted(async () => {
  try {
    document.body.style.overflow = 'hidden'
    loadingStatus.value = true
    const responseCategories = await categoriesAPI.getCategories()
    adminMenuStore.updateAdminCategory(responseCategories)
  } catch (error) {
  } finally {
    loadingStatus.value = false
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  adminMenuStore.resetAdminEditDish()
})
</script>

<template>
  <div
    v-show="loadingStatus"
    class="w-screen h-screen bg-black/35 flex fixed top-0 left-0 z-50 justify-center items-center"
  >
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-400"></div>
  </div>
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-md:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <div @click="router.back" class="flex w-min items-center gap-x-4 cursor-pointer">
        <IconLongArrow />
        <span class="text-xl">Назад</span>
      </div>
      <h1 class="mb-8 text-2xl text-center font-medium">Создание блюда</h1>
      <form class="bg-[#111827] rounded-xl p-5 max-w-full">
        <div
          class="flex flex-wrap gap-y-3 gap-x-10 justify-between items-center pb-4 mb-2 border-b border-b-gray-600"
        >
          <div class="h-full flex gap-x-4">
            <label class="text-xl inline-block mb-3"> Опубликовано: </label>
            <div
              @click="adminMenuStore.taggleStatusDish()"
              :class="adminMenuStore.adminEditDish?.dish_status ? 'justify-end' : 'justify-start'"
              class="flex w-14 h-8 rounded-2xl border p-1 cursor-pointer hover:border-gray-400 duration-200 border-gray-600"
            >
              <div
                :class="adminMenuStore.adminEditDish?.dish_status ? 'bg-green-400' : 'bg-gray-400'"
                class="aspect-1/1 h-full rounded-full"
              ></div>
            </div>
          </div>
          <div class="flex gap-x-6">
            <div
              @click="saveUpdatingEditDish"
              class="px-2 py-1 rounded-lg cursor-pointer hover:bg-green-600 duration-200 bg-green-500 text-xl"
            >
              Создать
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 w-full justify-between gap-x-10 max-lg:gap-x-2">
          <div class="col-span-full">
            <label class="text-xl inline-block mb-3"> Изображение: </label>
            <DragAndDropFile class="col-span-full" />
          </div>
          <div class="p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> Название: </label>
            <input
              v-model="adminMenuStore.adminEditDish.name"
              class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
              type="text"
            />
          </div>
          <div class="p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> Категория: </label>
            <select
              v-model="adminMenuStore.adminEditDish.category_id"
              class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
            >
              <option
                v-for="category in adminMenuStore.adminMenu"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> Позиция: </label>
            <input
              v-model="adminMenuStore.adminEditDish.position"
              class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
              type="number"
            />
          </div>
          <div class="p-2 rounded-lg flex flex-col col-span-full">
            <label class="text-xl inline-block mb-3"> Описание: </label>
            <textarea
              v-model="adminMenuStore.adminEditDish.description"
              name="description"
              id="des"
              class="col-span-full rounded-xl p-2 bg-gray-800 border border-gray-600 focus:outline-0 focus-within:border focus-within:border-gray-600"
            ></textarea>
          </div>
          <div class="col-span-full text-2xl text-center mt-3 mb-4">Характеристики</div>
          <template
            v-for="(characteristic, key) in adminMenuStore.adminEditDish?.characteristics"
            :key="key"
          >
            <div
              @click="
                idOpenCharacteristics
                  ? (idOpenCharacteristics = null)
                  : (idOpenCharacteristics = key)
              "
              class="p-2 bg-gray-800 flex justify-between col-span-full cursor-pointer hover:bg-gray-700 duration-200 border-b border-b-gray-600"
            >
              <span> {{ key + 1 }} характеристика </span>
              <div v-show="key !== 0" @click.stop="adminMenuStore.delateCharacteristics(key)">
                <IconBasket />
              </div>
            </div>
            <div class="grid grid-cols-subgrid col-span-full">
              <div
                v-show="key === idOpenCharacteristics"
                class="col-span-full grid grid-cols-subgrid bg-gray-700"
              >
                <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
                  <label class="text-xl inline-block mb-3"> Цена (₽) : </label>
                  <input
                    class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                    type="text"
                    v-model="characteristic.price"
                  />
                </div>
                <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
                  <label class="text-xl inline-block mb-3"> Размер : </label>
                  <input
                    class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                    type="text"
                    v-model="characteristic.size"
                  />
                </div>
                <div class="p-2 rounded-lg max-md:col-span-full">
                  <label class="text-xl inline-block mb-3"> Количество : </label>
                  <input
                    class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                    type="text"
                    v-model="characteristic.quantity"
                  />
                </div>
                <div class="p-2 rounded-lg max-md:col-span-full max-md:mb-3">
                  <label class="text-xl inline-block mb-3"> Мера количества : </label>
                  <input
                    class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                    type="text"
                    v-model="characteristic.measure"
                  />
                </div>
              </div>
            </div>
          </template>
          <div
            @click="adminMenuStore.addCharacteristics"
            class="col-span-full p-2 bg-green-700 flex justify-center cursor-pointer hover:bg-green-500 duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div class="text-2xl text-center col-span-full mt-3 mb-4">Ингредиенты</div>
          <div class="col-span-full p-2 max-md:px-0 flex flex-wrap gap-y-2">
            <div
              v-for="(ingredient, index) in adminMenuStore.adminEditDish.composition"
              :key="index"
              class="px-2 py-1 flex items-center"
            >
              <input
                class="inline-block w-min border-gray-600 border-[1px] bg-gray-800 rounded-l-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                type="text"
                :value="ingredient"
                @input="adminMenuStore.updateAdminIngredient(index, $event.target.value)"
              />
              <div
                class="px-1 h-full border-[1px] border-gray-600 cursor-pointer duration-200 hover:bg-gray-800 flex items-center bg-gray-900 rounded-r-lg"
              >
                <IconBasket @click="adminMenuStore.delateAdminComposition(index)" />
              </div>
            </div>
            <div
              @click="adminMenuStore.addAdminComposition"
              class="text-lg px-3 py-1 hover:bg-green-700 cursor-pointer duration-200 rounded-xl bg-green-600 w-min flex gap-x-2 items-center"
            >
              Добавить
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
