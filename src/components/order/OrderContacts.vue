<script setup lang="ts">
import FormInput from '@/components/ui/FormInput.vue'
import { vMaska } from 'maska/vue'
import { ref } from 'vue'
import OrderMethodOptaining from './OrderMethodOptaining.vue'

const phoneNumber = ref('')
const name = ref('')
const REGEX_NAME = ref(/^[а-яА-ЯёЁ ]{0,32}$/)
</script>

<template>
  <div class="pt-4 border-t flex flex-col gap-10 border-t-gray-400">
    <div class="">
      <h2 class="text-xl mb-4 font-medium">Контакты</h2>
      <div class="flex flex-col gap-5">
        <FormInput
          id="phone"
          v-maska="'+ 7 (###) ###-##-##'"
          label="Телефон"
          type="tel"
          v-model="phoneNumber"
          required
        />
        <FormInput
          id="name"
          label="Имя"
          type="text"
          v-model="name"
          required
          :pattern="REGEX_NAME"
        />
      </div>
    </div>
    <OrderMethodOptaining />
  </div>
</template>
