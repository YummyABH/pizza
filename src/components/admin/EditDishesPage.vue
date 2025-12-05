<script setup lang="ts">
import { useAdminStore } from '@/stores/adminStore'
import { useAdminMenuStore } from '@/stores/adminMenuStore'
import { ref } from 'vue'
import { categoriesAPI } from '@/api/apiGetDish'
import { useRoute, useRouter } from 'vue-router'
import IconBasket from '../icons/IconBasket.vue'
import DragAndDropFile from './ui/table/DragAndDropFile.vue'
import IconLongArrow from '../icons/IconLongArrow.vue'
import BaseDelateItem from '../ui/BaseDelateItem.vue'

const isOpenDelateModal = ref<boolean>(false)
const router = useRouter()
const route = useRoute()
const adminMenuStore = useAdminMenuStore()
const storeAdmin = useAdminStore()

const idEditDish = route.fullPath.split('/')[4]
const idOpenCharacteristics = ref<number | null>(null)

const response = await categoriesAPI.getAllDishes()
adminMenuStore.updateAdminDishes(response)
adminMenuStore.updateEditDish(Number(idEditDish))
</script>

<template>
  <BaseDelateItem v-model:is-open-delate-modal="isOpenDelateModal" name="Пицца" />
  <div
    :class="storeAdmin.openSidebar ? 'pl-70 max-2xl:pl-50 max-md:pl-0' : 'pl-0'"
    class="w-screen flex justify-self-end text-white"
  >
    <div class="mx-7 px-20 w-full p-5 rounded-2xl max-2xl:px-0 max-md:mx-0">
      <div @click="router.back" class="flex items-center gap-x-4 cursor-pointer">
        <IconLongArrow />
        <span class="text-xl">Назад</span>
      </div>
      <h1 class="mb-8 text-2xl text-center font-medium">Редактирование блюда</h1>
      <div class="bg-[#111827] rounded-xl p-5 max-w-full">
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
              @click="isOpenDelateModal = true"
              class="px-2 py-1 rounded-lg cursor-pointer hover:bg-red-600 duration-200 bg-red-500 text-xl"
            >
              Удалить
            </div>
            <div
              class="px-2 py-1 rounded-lg cursor-pointer hover:bg-green-600 duration-200 bg-green-500 text-xl"
            >
              Сохранить
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 w-full justify-between gap-x-10 max-lg:gap-x-2">
          <div class="col-span-full">
            <label class="text-xl inline-block mb-3"> Название: </label>
            <DragAndDropFile class="col-span-full" />
          </div>
          <div class="p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> Название: </label>
            <input
              class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
              type="text"
            />
          </div>
          <div class="p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> Категория: </label>
            <select
              class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
            >
              <option value="pizza">Пицца</option>
              <option value="burger">Бургер</option>
              <option value="drink">Напиток</option>
            </select>
          </div>
          <div class="p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> Позиция: </label>
            <input
              class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
              type="number"
            />
          </div>
          <div class="p-2 rounded-lg flex flex-col col-span-full">
            <label class="text-xl inline-block mb-3"> Описание: </label>
            <textarea
              name="description"
              id="des"
              class="col-span-full rounded-xl p-2 bg-gray-800 border border-gray-600 focus:outline-0 focus-within:border focus-within:border-gray-600"
            ></textarea>
          </div>
          <div class="col-span-full text-2xl text-center mt-3 mb-4">Характеристики</div>
          <div
            @click="
              idOpenCharacteristics === 1
                ? (idOpenCharacteristics = null)
                : (idOpenCharacteristics = 1)
            "
            class="p-2 bg-gray-800 col-span-full cursor-pointer hover:bg-gray-700 duration-200 border-b border-b-gray-600"
          >
            1 характеристика
          </div>
          <div class="grid grid-cols-subgrid col-span-full">
            <div
              v-show="1 === idOpenCharacteristics"
              class="col-span-full grid grid-cols-subgrid bg-gray-700"
            >
              <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
                <label class="text-xl inline-block mb-3"> Цена (₽) : </label>
                <input
                  class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                  type="number"
                />
              </div>
              <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
                <label class="text-xl inline-block mb-3"> Размер : </label>
                <input
                  class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                  type="text"
                />
              </div>
              <div class="p-2 rounded-lg max-md:col-span-full">
                <label class="text-xl inline-block mb-3"> Количество : </label>
                <input
                  class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                  type="text"
                />
              </div>
              <div class="p-2 rounded-lg max-md:col-span-full max-md:mb-3">
                <label class="text-xl inline-block mb-3"> Мера количества : </label>
                <input
                  class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div
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
          <div class="col-span-full p-2 max-md:px-0 flex flex-wrap">
            <div class="px-2 py-1 flex items-center">
              <input
                class="inline-block w-min border-gray-600 border-[1px] bg-gray-800 rounded-l-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                type="text"
              />
              <div
                class="px-1 h-full border-[1px] border-gray-600 flex items-center bg-gray-900 rounded-r-lg"
              >
                <IconBasket />
              </div>
            </div>
            <div
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
      </div>
    </div>
  </div>
</template>
