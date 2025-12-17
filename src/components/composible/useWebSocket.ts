import { authAPI } from '@/api/admin/auth'
import { useOrderAllStore } from '@/stores/orderAllStore'
import { useRouter } from 'vue-router'
import { useLogout } from './useLogout'

let ws: WebSocket | null = null
const { handlerLogout } = useLogout()

function resetWs() {
  if (ws) {
    if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
      ws.close()
    }
    ws = null
  }
}

function connectWebSocket() {
  const { refresh } = authAPI()
  const router = useRouter()
  const store = useOrderAllStore()

  if (ws) return ws

  ws = new WebSocket(`wss://cemubribepit.beget.app/ws?token=${localStorage.getItem('accessToken')}`)

  ws.onopen = () => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'all-orders' }))
    }
  }

  ws.onmessage = async (event) => {
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

  ws.onerror = async (err) => {
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

  ws.onclose = async (err) => {
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
