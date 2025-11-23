import { authAPI } from '@/api/admin/auth'
import { useOrderAllStore } from '@/stores/orderAllStore'
import { useRouter } from 'vue-router'
import { useLogout } from './useLogout'

let ws: WebSocket | null = null

function connectWebSocket() {
  const { refresh } = authAPI()
  const router = useRouter()
  const store = useOrderAllStore()

  if (ws) return ws

  ws = new WebSocket(
    `wss://restik-street-style.onrender.com/ws?token=${localStorage.getItem('accessToken')}`,
  )

  ws.onopen = () => {
    console.log(ws?.readyState);
    
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
          
          connectWebSocket()          
        } catch (error) {
          
        }
      }
    console.log('Обновления заказов:', data)
  }

  ws.onerror = (err) => {
    console.log('WS ошибка:', err)
  }

  ws.onclose = async (err) => {
    console.log('закрылось ', err);
    try {
          const response = await refresh()
          localStorage.setItem('accessToken', response.accessToken)          
          connectWebSocket()
        } catch (error) {
          useLogout()
          router.push('/admin-login')
        }
  }

  return ws
}
export {connectWebSocket}