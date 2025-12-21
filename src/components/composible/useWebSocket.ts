import { authAPI } from '@/api/admin/auth'
import { useOrderAllStore } from '@/stores/orderAllStore'
import { useRouter } from 'vue-router'
import { useLogout } from './useLogout'
import { ref } from 'vue'

const ws: WebSocket | null = ref(null)
const { handlerLogout } = useLogout()

function resetWs() {
  if (ws.value) {
    if (ws.value && (ws.value.readyState === WebSocket.OPEN || ws.value.readyState === WebSocket.CONNECTING)) {
      ws.value.close()
    }
    ws.value = null
  }
}

function connectWebSocket() {
  const { refresh } = authAPI()
  const router = useRouter()
  const store = useOrderAllStore()

  if (ws.value) return ws

  ws.value = new WebSocket(`wss://cemubribepit.beget.app/ws?token=${localStorage.getItem('accessToken')}`)

  ws.value.onopen = () => {
    if (ws.value?.readyState === WebSocket.OPEN) {
      ws.value.send(JSON.stringify({ type: 'all-orders' }))
    }
  }

  ws.value.onmessage = async (event) => {
    const data = JSON.parse(event.data)
    
    if (data.type === 'orders' && data.changeType === 'added') {
      store.addHistoryOrder(data.orders[0])
    }
    if (data.type === 'orders' && data.changeType === 'updated') {
      store.updateAllHistoryOrder(data.orders)
    }
    if (data.type === 'orders' && data.changeType === 'update_status') {
      store.updateStatusOrder(data.orders[0], data.orders[0].id)
    }

    if (data.type === 'error') {
      try {
        const response = await refresh()
        localStorage.setItem('accessToken', response.accessToken)

        resetWs()

        setTimeout(connectWebSocket, 1000)
      } catch (error) {
        console.error('Refresh failed:', error)
        resetWs()
        handlerLogout(router)
      }
    }
  }

  ws.value.onerror = async (err) => {
    console.log('WS ошибка:', err)
    try {
      const response = await refresh()
      localStorage.setItem('accessToken', response.accessToken)

      resetWs()
      setTimeout(connectWebSocket, 3000)
      console.log('пытаюсь переподключиться после ошибки')
    } catch (error) {
      console.error('Refresh failed:', error)
      resetWs()
      handlerLogout(router)
    }
  }

  ws.value.onclose = async (err) => {
    console.log('закрылось ', err)
    try {
      // const response = await refresh()
      // localStorage.setItem('accessToken', response.accessToken)

      resetWs()
      // setTimeout(connectWebSocket, 1000)
      console.log('пытаюсь переподключиться')
    } catch (error) {
      console.error('Refresh failed:', error)
      resetWs()
      handlerLogout(router)
    }
  }

  return ws
}
export { connectWebSocket, resetWs }
