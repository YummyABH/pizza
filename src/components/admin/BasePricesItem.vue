<script setup lang="ts">
import { useAdminMenuStore } from '@/stores/adminMenuStore';
import PricesSetting from './PricesSetting.vue';

const props = defineProps({
    cityIndex: Number
})


const adminMenuStore = useAdminMenuStore()
const isOpen = defineModel('isOpenCity')

</script>

<template>
    <div>
        <h3 class="w-full px-5 py-3 bg-gray-800 hover:bg-gray-700 border-white border-y duration-200" @click="isOpen === cityIndex ? isOpen = null : isOpen = cityIndex">{{ adminMenuStore.adminPrices[cityIndex].city }}</h3>
        <div class="">
            <div class="grid grid-cols-3 " v-show="cityIndex === isOpen">
                <PricesSetting v-for="(price, index) in adminMenuStore.adminPrices[cityIndex]?.prices" :indexCity="cityIndex" :key="price" :indexSetting="index" />
                <div @click="adminMenuStore.addPrice"
                    class="col-span-full p-2 bg-green-700 flex justify-center cursor-pointer hover:bg-green-500 duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>