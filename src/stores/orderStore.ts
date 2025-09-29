import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const savedOrder = localStorage.getItem('order')
  const initialOrder = savedOrder ? JSON.parse(savedOrder) : null

  const order = reactive(
    initialOrder || {
      phone: '',
      name: '',
      delivery: {
        status: true,
        address: '',
        comment: '',
      },
      dishes: [
        {
          quantity: 1,
          id: 1,
          name: 'Маргарита',
          categoryName: 'Пицца',
          price: 650,
          description: 'Классическая пицца с томатным соусом и моцареллой',
          dish_status: true,
          composition: ['Томатный соус', 'Моцарелла', 'Базилик'],
          dish_weight: '400',
          image: 'margherita.jpg',
          categoryid: 1,
          size: ['30', '40'],
        },
        {
          quantity: 1,
          id: 2,
          name: 'Пепперони',
          categoryName: 'Пицца',
          price: 800,
          description: 'Пицца с острой колбасой пепперони и сыром',
          dish_status: true,
          composition: ['Томатный соус', 'Пепперони', 'Моцарелла'],
          dish_weight: '450',
          image: 'pepperoni.jpg',
          categoryid: 1,
          size: ['30', '40'],
        },
      ],
      cutlery_status: false,
      number_cutlery: 1,
      payment_card: null,
      order_comment: '',
      status: true,
      price: 0,
    },
  )

  watch(
    order,
    (newOrder) => {
      localStorage.setItem('order', JSON.stringify(newOrder))
    },
    { deep: true },
  )

  function cutleryAdd() {
    return order.number_cutlery >= 50 ? (order.number_cutlery = 50) : order.number_cutlery++
  }

  function cutleryReduce() {
    return order.number_cutlery <= 1 ? (order.number_cutlery = 1) : order.number_cutlery--
  }

  function dishAdd(id: number) {
    const dish = order.dishes.find((dish) => dish.id === id)
    return dish.quantity >= 99 ? (dish.quantity = 99) : dish.quantity++
  }

  function dishReduce(id: number) {
    const dish = order.dishes.find((dish) => dish.id === id)
    return dish.quantity <= 1 ? (dish.quantity = 1) : dish.quantity--
  }

  function clearDishesInOrder() {
    order.dishes = []
  }

  return { order, cutleryAdd, cutleryReduce, clearDishesInOrder, dishAdd, dishReduce }
})
