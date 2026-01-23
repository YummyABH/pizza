import { orderAPI } from '@/api/apiOrder';
import { ref, onMounted } from 'vue';

export function usePushNotifications() {
  const isSupported = ref('PushManager' in window && 'serviceWorker' in navigator);
  const subscription = ref(null);
  const registration = ref(null);
  const headers = { 'Content-Type': 'application/json' };
  const accessToken = localStorage.getItem('accessToken');
  headers['Secret-Key'] = localStorage.getItem('secretKey');
  headers['Authorization'] = `Bearer ${accessToken}`;

  // Конвертация VAPID ключа в Uint8Array
  function urlBase64ToUint8Array(base64String) {
      const cleaned = base64String.trim().replace(/\s/g, '').replace(/"/g, '');
      const padding = '='.repeat((4 - cleaned.length % 4) % 4);
      const base64 = (cleaned + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
    }

  async function registerServiceWorker() {
    try {
      registration.value = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker зарегистрирован');
      return registration.value;
    } catch (error) {
      console.error('Ошибка регистрации Service Worker:', error);
      return null;
    }
  }

  async function subscribeToPush() {
    if (!registration.value) {
      await registerServiceWorker();
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Разрешение не предоставлено');
      }

      // Получение подписки
      subscription.value = await registration.value.pushManager.getSubscription();
      
      if (subscription.value) {
        return subscription.value;
      }

      // Подписка с VAPID ключом
      const response = await orderAPI.getPublicKeyNotification();
      
      const convertedVapidKey = urlBase64ToUint8Array(response);

      subscription.value = await registration.value.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });

      // Отправка подписки на сервер
      await sendSubscriptionToServer(subscription.value);
      
      return subscription.value;
    } catch (error) {
      console.error('Ошибка подписки:', error);
      return null;
    }
  }

  // Отправка подписки на сервер
  async function sendSubscriptionToServer(subscription) {
    const response = await orderAPI.notificationSubscribeAdmin(subscription)  
    return response;
  }

  // Отписка от уведомлений
  async function unsubscribeFromPush() {
    if (subscription.value) {
      await subscription.value.unsubscribe();
      await orderAPI.notificationUnsubscribe(subscription.value.endpoint)
      subscription.value = null;
    }
  }

  // Проверка текущей подписки
  async function checkSubscription() {
    if (registration.value) {
      subscription.value = await registration.value.pushManager.getSubscription();
    }
  }

  onMounted(async () => {
    if (isSupported.value) {
      await registerServiceWorker();
      await checkSubscription();
    }
  });

  return {
    isSupported,
    subscription,
    registerServiceWorker,
    subscribeToPush,
    unsubscribeFromPush,
    checkSubscription
  };
}