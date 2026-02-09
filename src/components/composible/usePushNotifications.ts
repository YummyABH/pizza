import { orderAPI } from '@/api/apiOrder';
import { ref } from 'vue';

export function usePushNotifications() {
  const isSupported = ref('PushManager' in window && 'serviceWorker' in navigator);
  const subscriptionAdmin = ref<PushSubscription | null>(null);
  const subscriptionUser = ref<PushSubscription | null>(null);
  const registration = ref<ServiceWorkerRegistration | null>(null);
  
  const headers = { 'Content-Type': 'application/json' };
  const accessToken = localStorage.getItem('accessToken');
  headers['Secret-Key'] = localStorage.getItem('secretKey');
  headers['Authorization'] = `Bearer ${accessToken}`;

  // Конвертация VAPID ключа в Uint8Array
  function urlBase64ToUint8Array(base64String: string) {
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

  async function subscribeToPush(role: 'user' | 'admin') {
    if (!registration.value) {
      await registerServiceWorker();
    }
    
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Разрешение не предоставлено');
      }

      // Важный момент: получаем все существующие подписки
      const existingSubscription = await registration.value!.pushManager.getSubscription();
      
      // Если подписка уже существует, проверяем её endpoint
      if (existingSubscription) {
        // Проверяем, есть ли сохраненная подписка для этой роли в localStorage
        const savedSubscription = getSavedSubscription(role);
        
        if (savedSubscription && savedSubscription.endpoint === existingSubscription.endpoint) {
          // Это наша сохраненная подписка для этой роли
          if (role === 'admin') {
            subscriptionAdmin.value = existingSubscription;
          } else {
            subscriptionUser.value = existingSubscription;
          }
          console.log(`${role}: Используем существующую подписку`);
          return existingSubscription;
        } else {
          // Это подписка от другой роли - отписываемся
          console.log(`${role}: Отписываемся от чужой подписки`);
          await existingSubscription.unsubscribe();
        }
      }

      // Получаем VAPID ключ для подписки
      const response = await orderAPI.getPublicKeyNotification();
      const convertedVapidKey = urlBase64ToUint8Array(response);
      
      // Создаем новую подписку
      const subscription = await registration.value!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
      });

      // Сохраняем подписку для текущей роли
      if (role === 'admin') {
        subscriptionAdmin.value = subscription;
        saveSubscription(subscription, 'admin');
        // Отправляем на сервер с идентификатором роли
        await sendSubscriptionToServer(subscription, 'admin');
      } else {
        subscriptionUser.value = subscription;
        saveSubscription(subscription, 'user');
        await sendSubscriptionToServer(subscription, 'user');
      }

      console.log(`${role}: Новая подписка создана`);
      return subscription;
    } catch (error) {
      console.error(`Ошибка подписки для ${role}:`, error);
      return null;
    }
  }

  // Сохраняем подписку в localStorage
  function saveSubscription(subscription: PushSubscription, role: 'admin' | 'user') {
    const subscriptionData = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))),
        auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!)))
      },
      role: role
    };
    
    localStorage.setItem(`pushSubscription_${role}`, JSON.stringify(subscriptionData));
  }

  // Получаем сохраненную подписку из localStorage
  function getSavedSubscription(role: 'admin' | 'user'): { endpoint: string; keys: any; role: string } | null {
    const saved = localStorage.getItem(`pushSubscription_${role}`);
    return saved ? JSON.parse(saved) : null;
  }

  // Отправка подписки на сервер
  async function sendSubscriptionToServer(subscription: PushSubscription, role: 'admin' | 'user') {
    let response;
    // Отправляем с дополнительным полем role
    const subscriptionWithRole = {
      ...subscription.toJSON(),
      role: role
    };
    
    if (role === 'admin') {
      response = await orderAPI.notificationSubscribeAdmin(subscriptionWithRole);
    } else {
      response = await orderAPI.notificationSubscribeUser(subscriptionWithRole);
    }
    return response;
  }

  // Отписка от уведомлений
  async function unsubscribeFromPush(role: 'admin' | 'user') {
    try {
      // Получаем текущую подписку из registration
      const currentSubscription = await registration.value!.pushManager.getSubscription();
      
      if (currentSubscription) {
        // Проверяем, что это подписка для нужной роли
        const savedSubscription = getSavedSubscription(role);
        
        if (savedSubscription && savedSubscription.endpoint === currentSubscription.endpoint) {
          await currentSubscription.unsubscribe();
          // Удаляем с сервера с указанием роли
          await orderAPI.notificationUnsubscribe(currentSubscription.endpoint, role);
          
          // Очищаем локальное хранилище
          localStorage.removeItem(`pushSubscription_${role}`);
          
          // Обнуляем соответствующую ref
          if (role === 'admin') {
            subscriptionAdmin.value = null;
          } else {
            subscriptionUser.value = null;
          }
          
          console.log(`${role}: Подписка отменена`);
        } else {
          console.log(`${role}: Текущая подписка не принадлежит этой роли`);
        }
      }
    } catch (error) {
      console.error(`Ошибка отписки для ${role}:`, error);
    }
  }

  // Проверка текущей подписки
  async function checkSubscription() {
    if (!registration.value) {
      await registerServiceWorker();
    }

    // Проверяем сохраненные подписки для обеих ролей
    const savedAdmin = getSavedSubscription('admin');
    const savedUser = getSavedSubscription('user');
    
    // Получаем текущую активную подписку из браузера
    const currentSubscription = await registration.value!.pushManager.getSubscription();
    
    if (currentSubscription) {
      // Сравниваем с сохраненными
      if (savedAdmin && savedAdmin.endpoint === currentSubscription.endpoint) {
        subscriptionAdmin.value = currentSubscription;
        console.log('Активна подписка администратора');
      } else if (savedUser && savedUser.endpoint === currentSubscription.endpoint) {
        subscriptionUser.value = currentSubscription;
        console.log('Активна подписка пользователя');
      } else {
        // Подписка есть, но не сохранена - вероятно, от другой роли
        console.log('Обнаружена неподтвержденная подписка');
      }
    } else {
      // Нет активных подписок
      subscriptionAdmin.value = null;
      subscriptionUser.value = null;
    }
  }

  return {
    isSupported,
    subscriptionAdmin,
    subscriptionUser,
    registerServiceWorker,
    subscribeToPush,
    unsubscribeFromPush,
    checkSubscription
  };
}