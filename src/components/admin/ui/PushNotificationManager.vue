<script setup lang="ts">
import { usePushNotifications } from '@/components/composible/usePushNotifications';
import { onMounted, ref } from 'vue';

const loading = ref(false);
const error = ref(null);

const {
    isSupported,
    subscriptionAdmin,
    subscribeToPush,
    registerServiceWorker,
    unsubscribeFromPush,
    checkSubscription,
} = usePushNotifications();

async function toggleNotifications() {
    loading.value = true;
    error.value = null;    
    try {
        if (subscriptionAdmin.value) {            
            return await unsubscribeFromPush('admin')
            // return subscriptionAdmin.value = null
        }        
        await subscribeToPush('admin');
    } catch (err) {        
        error.value = err.message;
    } finally {        
        loading.value = false;
    }
}

onMounted(async () => {
  if (isSupported.value) {      
    await registerServiceWorker();
    await checkSubscription(); // Указываем роль
  }
});
</script>
      
<template>
    <div v-if="isSupported" class="push-notification-manager">
        <button @click="toggleNotifications" :disabled="loading" class="notification-btn">
            {{ subscriptionAdmin ? 'Отключить уведомления' : 'Включить уведомления' }}
        </button>

        <p v-if="!isSupported" class="error">
            Ваш браузер не поддерживает push-уведомления
        </p>

        <div v-if="error" class="error">
            {{ error }}
        </div>
    </div>
</template>

<style scoped>
.push-notification-manager {
  margin: 20px 0;
}

.notification-btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.notification-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #ff4757;
  margin-top: 10px;
}
</style>