<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOrderInputStore } from '@/stores/orderInputStore.ts'
import { useOrderStore } from '@/stores/orderStore.ts'
import { vMaska } from 'maska/vue'
import { computed } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  label: String,
  selecte: String,
  mask: {
    type: [Object, String],
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  typeInput: {
    type: String,
    default: 'text',
  },
  minDate: {
    type: String,
    default: '',
  },
  maxDate: {
    type: String,
    default: '',
  },
})

const orderStore = useOrderStore()
const orderInputStore = useOrderInputStore()

const formClass = computed(() => ({
  'top-3': !orderStore.order[props.selecte],
  '-top-[10px] bg-black-381 px-1': orderStore.order[props.selecte],
}))
</script>

<template>
  <div class="relative">
    <input
      :placeholder="placeholder"
      :required="required"
      :min="minDate"
      :max="maxDate"
      v-maska="mask"
      v-model="orderStore.order[props.selecte]"
      class="peer autofill:bg-transparent block z-10 w-full px-1 py-3 border-b-[1px] border-black-299 rounded-none appearance-none bg-transparent focus:outline-hidden focus:ring-0"
      :class="{ 'border-red-500': orderInputStore.formErrors[props.selecte] }"
      :type="typeInput"
      :title="title"
      @input="orderInputStore.clearError(selecte)"
    />
    <label
      :class="formClass"
      class="peer-focus:-top-[10px] left-0 peer-focus:left-0 peer-focus:px-1 cursor-text select-none duration-200 absolute block text-sm font-medium"
      for="name"
      >{{ label }}</label
    >
  </div>
</template>

<style scoped>
.border-red {
  border: 2px solid rgb(235, 59, 59) !important;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
