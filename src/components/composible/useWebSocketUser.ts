import { useOrderHistoryStore } from '@/stores/orderHistoryStore'
import { ref } from 'vue'

const ws: WebSocket | null = ref(null)

function connectWebSocket() {
  const store = useOrderHistoryStore()

  function resetWs() {
    if (ws.value) {
      if (ws.value && (ws.value.readyState === WebSocket.OPEN || ws.value.readyState === WebSocket.CONNECTING)) {
        ws.value.close()
      }
      ws.value = null
    }
  }

  if (ws.value) return ws

  ws.value = new WebSocket(
    `wss://cemubribepit.beget.app/ws?secret_key=${localStorage.getItem('secretKey')}`,
  )

  ws.value.onopen = () => {
    if (ws.value?.readyState === WebSocket.OPEN) {
      ws.value.send(JSON.stringify({ type: 'user-orders' }))
    }
  }

  ws.value.onmessage = async (event) => {
    const data = JSON.parse(event.data)

    if (data.type === 'orders' && data.changeType === 'added') {
      store.addHistoryOrder(data.orders[0])
    }
    if (data.type === 'orders' && data.changeType === 'updated') {
      console.log(data.orders)

      store.updateHistoryOrder(data.orders)
    }
    if (data.type === 'orders' && data.changeType === 'update_status') {
      store.updateStatusOrder(data.orders[0], data.orders[0].id)
    }

    if (data.type === 'error') {
      try {
        resetWs()
        setTimeout(connectWebSocket, 2000)
      } catch (error) {}
    }
    console.log('Обновления заказов:', data)
  }

  ws.value.onerror = (err) => {
    resetWs()
    console.log('WS ошибка:', err)
  }

  ws.value.onclose = async (err) => {
    console.log('закрылось ', err)
    try {
      resetWs()
      setTimeout(connectWebSocket, 2000)
    } catch (error) {}
  }

  return ws
}
export { connectWebSocket }
