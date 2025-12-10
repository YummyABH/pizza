<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useDishesStore } from '@/stores/dishesStore'
import { useOrderStore } from '@/stores/orderStore'
import { toastCreate } from '@/utility/createToast'

const storeDishes = useDishesStore()
const storeOrder = useOrderStore()
const props = defineProps({
  indexDishModal: Number,
  indexCategoryModal: Number,
})

const backgroundPage = ref(null)
const body = document.body
const statusIngredients = ref(false)
const statusDescription = ref(false)
const statusModalDish = defineModel('statusModalDish')
const dish = computed(
  () => storeDishes.dishes[props.indexCategoryModal]?.dishes[props.indexDishModal],
)
const indexCharacteristics = computed(() => dish.value.default_characteristics)

const sumPrice = computed(
  () => dish.value.characteristics[indexCharacteristics.value].price * dish.value.quantity,
)

const styleDescription = computed(() => {
  return statusDescription.value ? '' : 'truncate'
})

const styleIngredients = computed(() => {
  return statusIngredients.value ? '' : '[&>li:nth-child(n+5)]:hidden'
})

function goHome(event: Event) {
  if (event.target === backgroundPage.value) {
    statusModalDish.value = false
  }
}

onMounted(() => {
  body.addEventListener('click', goHome)
})
onBeforeUnmount(() => {
  body.removeEventListener('click', goHome)
})

function addDishInOrder() {
  const statusAdd = !storeOrder.addDishItem(dish.value, indexCharacteristics.value)

  if (statusAdd) return toastCreate('Блюдо добавлено в заказ !', 'success')
  toastCreate('Блюдо уже было добавлено в заказ', 'info')
}
</script>

<template>
  <div
    ref="backgroundPage"
    class="fixed flex justify-center max-md:items-end items-center top-0 left-0 w-full h-full bg-black/50 z-10"
  >
    <div
      class="fixed z-10 left-0 sm:hidden bottom-0 w-full p-3 flex gap-x-8 bg-white border-t border-t-gray-400"
    >
      <div class="flex justify-between items-center w-full">
        <div
          @click="storeDishes.dishReduce(indexCategoryModal, indexDishModal)"
          class="relative w-8 h-8 p-1 rounded-full cursor-pointer after:w-3 after:h-px bg-red-300 after:bg-black after:absolute after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
        ></div>
        <div class="flex flex-col text-center">
          <span v-if="dish?.quantity" class="font-medium">{{ dish.quantity }} шт</span
          ><span v-if="dish?.characteristics">
            {{ sumPrice }}
            ₽</span
          >
        </div>
        <div
          @click="storeDishes.dishAdd(indexCategoryModal, indexDishModal)"
          class="relative w-8 h-8 p-1 rounded-full bg-[#64f77c] cursor-pointer before:h-3 before:w-px before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-1/2 before:bg-black after:bg-black after:absolute after:w-3 after:h-px after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
        ></div>
      </div>
      <div
        @click="addDishInOrder"
        class="bg-[#64f77c] cursor-pointer py-2 px-2 rounded-3xl text-lg w-full text-center font-medium"
      >
        Добавить
      </div>
    </div>
    <div
      class="relative max-h-9/10 pb-20 md:min-w-128 max-sm:max-w-full max-sm:pb-18 min-h-4/5 bg-white max-w-128 flex flex-col overflow-hidden rounded-2xl"
    >
      <div
        @click="statusModalDish = false"
        class="cursor-pointer w-12 h-12 rounded-full bg-white absolute right-3 top-3"
      >
        <div
          class="relative cursor-pointer w-full h-full after:absolute after:top-1/2 after:left-1/2 after:w-4 after:h-0.5 after:transform after:-translate-1/2 after:bg-black after:rotate-45 before:absolute before:top-1/2 before:left-1/2 before:w-4 before:h-0.5 before:transform before:-translate-1/2 before:bg-black before:-rotate-45"
        ></div>
      </div>
      <div
        class="absolute max-sm:hidden left-0 bottom-0 w-full p-4 flex gap-x-16 bg-white border-t border-t-gray-400"
      >
        <div class="flex justify-between items-center w-full">
          <div
            @click="storeDishes.dishReduce(indexCategoryModal, indexDishModal)"
            class="relative w-9 h-9 p-1 rounded-full cursor-pointer after:w-4 after:h-px bg-red-300 after:bg-black after:absolute after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
          ></div>
          <div class="flex flex-col">
            <span v-if="dish?.quantity" class="font-medium">{{ dish.quantity }} шт</span
            ><span v-if="dish?.characteristics[indexCharacteristics].price">{{ sumPrice }} ₽</span>
          </div>
          <div
            @click="storeDishes.dishAdd(indexCategoryModal, indexDishModal)"
            class="relative w-9 h-9 p-1 rounded-full bg-[#64f77c] cursor-pointer before:h-4 before:w-px before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-1/2 before:bg-black after:bg-black after:absolute after:w-4 after:h-px after:left-1/2 after:transform after:-translate-1/2 after:top-1/2"
          ></div>
        </div>
        <div
          @click="addDishInOrder"
          class="bg-[#64f77c] cursor-pointer py-2.5 px-5 rounded-3xl text-xl w-full text-center font-medium"
        >
          Добавить
        </div>
      </div>
      <div class="min-w-full min-h-full h-full w-full overflow-hidden">
        <img
          class="w-full aspect-1/1 object-cover"
          :src="`https://cemubribepit.beget.app/uploads/${dish?.image}`"
        />
      </div>
      <div
        class="overflow-y-scroll scrollbar-hidden py-6 px-5 rounded-2xl flex flex-col gap-2 -mt-3 bg-white"
      >
        <div class="text-2xl font-medium" v-if="dish?.characteristics">
          {{ dish.characteristics[indexCharacteristics].price }} ₽
        </div>
        <div class="text-lg font-semibold">{{ dish?.name }}</div>
        <div class="flex gap-x-4">
          <div v-if="dish?.characteristics" class="text-xl font-medium text-[#8C959B]">
            {{ dish.characteristics[indexCharacteristics].quantity }}
            {{ dish.characteristics[indexCharacteristics].measure }}
          </div>
          <div class="flex gap-x-2 cursor-pointer" v-if="dish?.characteristics.length > 1">
            <div
              v-for="(item, index) in dish.characteristics"
              @click="
                storeDishes.updateDefaultCharacteristics(index, indexCategoryModal, indexDishModal)
              "
              :key="index"
              :class="index === indexCharacteristics ? 'bg-green-500 text-white' : ''"
              class="px-2 py-0.5 rounded-xl"
            >
              {{ item.size }}
            </div>
          </div>
        </div>
        <div class="">
          <span
            v-if="dish?.description"
            class="text-base inline-block max-w-full"
            :class="styleDescription"
          >
            <span class="text-base font-semibold">Описание:</span>
            {{ dish.description }}
          </span>
          <span
            v-show="!statusDescription && dish?.description"
            @click="statusDescription = true"
            class="block text-base underline cursor-pointer font-semibold"
            >Развернуть</span
          >
          <span
            v-show="statusDescription && dish?.description"
            @click="statusDescription = false"
            class="text-base underline font-semibold cursor-pointer"
            >Свернуть</span
          >
        </div>
        <ul
          v-show="dish?.composition.length"
          :class="styleIngredients"
          class="max-w-full flex gap-x-3 gap-y-1.5 items-baseline flex-wrap"
        >
          <li class="text-base font-semibold">Ингредиенты:</li>
          <li
            class="min-w-max px-2 rounded-2xl border"
            v-for="ingredient in dish?.composition"
            :key="ingredient"
          >
            {{ ingredient }}
          </li>
        </ul>
        <span
          v-show="!statusIngredients && dish?.composition.length"
          @click="statusIngredients = true"
          class="text-base underline cursor-pointer font-semibold"
          >Развернуть</span
        >
        <span
          v-show="statusIngredients && dish?.composition.length"
          @click="statusIngredients = false"
          class="text-base underline font-semibold cursor-pointer"
          >Свернуть</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hidden {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari и другие на WebKit */
}
</style>
