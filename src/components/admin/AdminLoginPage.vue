<script setup lang="ts">
import LoginForm from '@/components/admin/auth/LoginForm.vue'
</script>

<template>
  <div
    class="relative text-white bg-[#353535] w-sceen h-screen flex justify-center"
    style="background-image: url(/public/pattern2.svg)"
  >
    <div class="flex m-auto flex-col min-w-85 w-1/4 px-8 py-10 bg-[#04041f] rounded-xl">
      <h1 class="text-center mb-4 text-2xl">Авторизуйтесь в административной панели</h1>
      <div class="mt-2">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
