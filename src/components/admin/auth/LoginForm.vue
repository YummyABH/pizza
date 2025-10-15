<script setup lang="ts">
import { useAdminAuthStore } from '@/stores/authStore'
import FormInput from '@/components/ui/FormInput.vue'

const authStore = useAdminAuthStore()

// const handleLogin = async () => {
//   try {
//     console.log({ email: email.value, password: password.value })

//     await authStore.login({ email: email.value, password: password.value })
//   } catch (error) {
//     console.error('Ошибка входа:', error)
//   }
// }
</script>

<template>
  <form class="space-y-4">
    <FormInput
      id="login"
      label="Логин"
      type="text"
      v-model="authStore.authData.username"
      required
      pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    />
    <FormInput
      id="password"
      label="Пароль"
      type="password"
      v-model="authStore.authData.password"
      required
      :minlength="8"
    />
    <button
      @click.prevent="authStore.loginAdmin"
      type="submit"
      class="cursor-pointer duration-200 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700"
    >
      Войти
    </button>
    <!-- <p class="text-center text-sm mt-2 hover:underline">
      <router-link to="/forgot-password" class="text-blue-500 hover:text-gray-700 active:green-400">
        Забыли пароль?
      </router-link>
    </p> -->
  </form>
</template>
