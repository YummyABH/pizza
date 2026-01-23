<script setup lang="ts">
import { usePushNotifications } from '@/components/composible/usePushNotifications';
import { ref } from 'vue';

const loading = ref(false);
const error = ref(null);

const {
    isSupported,
    subscription,
    subscribeToPush,
    unsubscribeFromPush,
} = usePushNotifications();

async function toggleNotifications() {
    loading.value = true;
    error.value = null;
    console.log('чё тут у нас: ', subscription.value);
    
    try {
        if (subscription.value) {
            return await unsubscribeFromPush()
            // return subscription.value = null
        }
        console.log('а ой');
        
        await subscribeToPush();
    } catch (err) {
        console.log('ошибка((');
        
        error.value = err.message;
    } finally {
        console.log('тут вот');
        
        loading.value = false;
    }
}
</script>
      
<template>
    <div v-if="isSupported" class="push-notification-manager">
        <button @click="toggleNotifications" :disabled="loading" class="notification-btn">
            {{ subscription ? 'Отключить уведомления' : 'Включить уведомления' }}
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