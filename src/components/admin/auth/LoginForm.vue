<script setup lang="ts">
import { useAdminAuthStore } from '@/stores/authStore'
import FormInput from '@/components/ui/FormInput.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAdminAuthStore()
const classButton = ref(false)

const handlerLogin = async () => {
  try {
    classButton.value = true
    await authStore.loginAdmin()

    router.push('/admin-orders')
  } catch (error) {
  } finally {
    classButton.value = false
  }
}
</script>

<template>
  <form class="space-y-4">
    <FormInput
      :disabled="classButton"
      id="login"
      label="Логин"
      type="text"
      v-model="authStore.authData.username"
      required
      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    />
    <FormInput
      :disabled="classButton"
      id="password"
      label="Пароль"
      type="password"
      v-model="authStore.authData.password"
      required
      :minlength="8"
    />
    <button
      :class="classButton ? 'bg-blue-600' : 'bg-blue-500 cursor-pointer'"
      :disabled="classButton"
      @click.prevent="handlerLogin"
      type="submit"
      class="duration-200 w-full py-2 px-4 text-white rounded-md hover:bg-blue-600 active:bg-blue-700"
    >
      <span v-show="!classButton"> Войти </span>
      <span v-show="classButton" class="flex justify-center gap-x-3 items-center">
        <svg
          class="w-5 h-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        Загрузка...
      </span>
    </button>
    <!-- <p class="text-center text-sm mt-2 hover:underline">
      <router-link to="/forgot-password" class="text-blue-500 hover:text-gray-700 active:green-400">
        Забыли пароль?
      </router-link>
    </p> -->
  </form>
</template>
