<script setup lang="ts">
import { useAdminMenuStore } from '@/stores/adminMenuStore';

const props = defineProps({
    indexSetting: Number,
    indexCity: Number
})

const adminMenuStore = useAdminMenuStore()
console.log(props.indexCity);

</script>

<template>
    <div class="col-span-full border-y border-y-gray-500 grid grid-cols-subgrid bg-gray-700 px-5 py-3">
        <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> От (₽) : </label>
            <input
                class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                type="text" v-model="adminMenuStore.adminPrices[indexCity].prices[indexSetting].from" />
        </div>
        <div class="col-span-1 p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> До (₽) : </label>
            <input
                class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                type="text" v-model="adminMenuStore.adminPrices[indexCity].prices[indexSetting].to" />
        </div>
        <div class="p-2 rounded-lg max-md:col-span-full">
            <label class="text-xl inline-block mb-3"> Цена : </label>
            <input
                class="block w-full border-gray-600 border-[1px] bg-gray-800 rounded-lg px-3 py-2 focus:outline-0 focus-within:border focus-within:border-gray-600"
                type="text" v-model="adminMenuStore.adminPrices[indexCity].prices[indexSetting].price" />
        </div>
    </div>
</template>