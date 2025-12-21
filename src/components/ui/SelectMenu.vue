<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Combobox, ComboboxInput, ComboboxOptions, ComboboxOption } from '@headlessui/vue'
import { useOrderStore } from '@/stores/orderStore.ts'
import { useOrderInputStore } from '@/stores/orderInputStore.ts'
import { vMaska } from 'maska/vue'

const props = defineProps({
  label: String,
  options: {
    type: Array,
    required: true,
  },
  selecte: String,
  dependsOn: {
    type: Array,
    default: () => [], // Пустой массив по умолчанию
  },
  validationRule: {
    type: Function,
    default: (value) => value !== '' && value !== undefined && value !== null,
  },
  mask: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['checkAdress'])

const checkAdress = () => {
  emits('checkAdress')
}

const modelValue = defineModel()
const calculationStore = useOrderStore()
const orderInputStore = useOrderInputStore()
const formErrors = storeToRefs(orderInputStore.formErrors)
const error = formErrors[props.selecte]
const displayedItemsCount = ref(100)
const isOpen = ref(false)
let isScrolling = false

const isDependencyFilled = computed(() => {
  if (!props.dependsOn.length) return true

  return props.dependsOn.every((dep) => {
    if (!(dep in calculationStore.order)) return false
    return props.validationRule(calculationStore.order[dep])
  })
})

const visibleItems = computed(() => {
  return props.options.slice(0, displayedItemsCount.value) // Ограничение по количеству отображаемых элементов
})

watch(
  () => modelValue,
  () => {
    displayedItemsCount.value = 100
  },
)

const formClass = computed(() => ({
  'top-3': !modelValue.value,
  '-top-[10px] bg-black-381 px-1': modelValue.value,
}))

const handleScroll = (event) => {
  const { scrollTop, scrollHeight, clientHeight } = event.target
  if (scrollTop + clientHeight >= scrollHeight) {
    if (displayedItemsCount.value < props.options.length) {
      displayedItemsCount.value += 10
    }
  }
}

const handleKeyDown = () => {
  if (visibleItems.value.length < props.options.length && !isScrolling) {
    isScrolling = true
    displayedItemsCount.value += 8

    setTimeout(() => {
      isScrolling = false
    }, 10)
  }
}

function onBlur() {
  // Если инпут пустой, сбрасываем выбор
  if (!modelValue.value) {
    modelValue.value = ''
  } else {    
    modelValue.value = visibleItems.value[0]
  }
  isOpen.value = false
}
</script>

<template>
  <div class="input-container">
    <Combobox v-model="modelValue" v-slot="{ open }" nullable>
      <ComboboxInput
        :disabled="!isDependencyFilled"
        v-maska="mask"
        autocomplete="off"
        @focus="isOpen = true"
        @blur="(onBlur(), checkAdress())"
        :required
        @input="orderInputStore.clearError(selecte)"
        @change="modelValue = $event.target.value"
        @keydown.down="handleKeyDown"
        class="peer autofill:bg-transparent block z-10 w-full px-1 py-3 border-b-[1px] border-black-299 rounded-none appearance-none bg-transparent focus:outline-hidden focus:ring-0"
      />

      <ComboboxOptions
        v-show="open || isOpen"
        class="container-options"
        static
        @scroll="handleScroll"
      >
        <template v-if="options?.length">
          <ComboboxOption
            v-for="(item, index) in visibleItems"
            v-slot="{ active }"
            :value="item"
            :key="index"
            class="option-mark"
          >
            <span :class="active ? 'active item-text' : 'item-text'">
              {{ item }}
            </span>
          </ComboboxOption>
        </template>
        <template v-else>
          <span class="mark-none">К сожалению, по вашим параметрам ничего не найдено.</span>
        </template>
      </ComboboxOptions>
    </Combobox>
    <label
      :class="formClass"
      class="peer-focus:-top-[10px] left-0 peer-focus:left-0 peer-focus:px-1 cursor-text select-none duration-200 absolute block text-sm font-medium"
      for="brand"
      >{{ label }}</label
    >
  </div>
</template>

<style scoped>
.border-red {
  border: 2px solid rgb(235, 59, 59) !important;
}

.container-label {
  display: flex;
  column-gap: 16px;
}

.dependency {
  cursor: auto;
  font-size: medium;
  font-weight: 400;
  color: rgb(255, 64, 64);
}

.item-text {
  border-radius: 12px;
  display: inline-block;
  padding: 3px 8px;
}

.mark-none {
  cursor: auto;
  width: calc(100% - 24px);
  padding: 0px 12px;
  text-align: center;
  display: inline-block;
  font-size: medium;
  font-weight: 500;
}

.container-options {
  position: absolute;
  left: 0;
  bottom: -8px;
  margin: 0;
  width: 100%;
  border-radius: 10px;
  padding: 6px;
  background: rgb(239, 239, 239);
  max-height: 260px;
  overflow-y: scroll;
  transform: translateY(100%);
  z-index: 30;
}

.option-mark {
  cursor: pointer;
  font-size: medium;
  border-radius: 12px;
  transition-duration: 50ms;
}

.option-mark:hover,
.focused-option {
  background: #5e5e5e;
  color: #fff;
}

.active {
  display: block;
  background: #5e5e5e;
  color: #fff;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.calculation-input {
  padding: 0px 20px;
  font-size: 16px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background: #d9d9d9;
  box-sizing: border-box;
}

.calculation-input:hover {
  background: #e8e8e8;
  transition-duration: 300ms;
  border: solid;
  border-width: 1px;
  border-color: #000;
}

.calculation-input:focus {
  background: #fff;
}

@media (max-width: 1280px) {
  .label {
    font-size: 15px;
  }
}

@media (max-width: 1024px) {
  .label {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .label {
    font-size: 18px;
  }
}
</style>
