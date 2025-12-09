import { useOrderHistoryStore } from '@/stores/orderHistoryStore'

let ws: WebSocket | null = null

function connectWebSocket() {
  const store = useOrderHistoryStore()

  if (ws) return ws

  ws = new WebSocket(
    `wss://restik-street-style.onrender.com/ws?secret_key=${localStorage.getItem('secretKey')}`,
  )

  ws.onopen = () => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'user-orders' }))
    }
  }

  ws.onmessage = async (event) => {
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
        setTimeout(connectWebSocket, 2000)
      } catch (error) {}
    }
    console.log('Обновления заказов:', data)
  }

  ws.onerror = (err) => {
    console.log('WS ошибка:', err)
  }

  ws.onclose = async (err) => {
    console.log('закрылось ', err)
    try {
      setTimeout(connectWebSocket, 2000)
    } catch (error) {}
  }

  return ws
}
export { connectWebSocket }
