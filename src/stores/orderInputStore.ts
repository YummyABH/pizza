import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore.ts'

export const useOrderInputStore = defineStore('orderInput', () => {
  const orderStore = useOrderStore()

  //#region fields
  // Ошибки для полей
  const formErrors = {
    name: ref(null),
    phone: ref(null),
    address: ref(null),
    comment: ref(null),
    order_comment: ref(null),
  }

  //#endregion

  //#region masks
  const displayFields = {
    address: computed(() => orderStore.order.delivery.status),
    comment: computed(() => orderStore.order.delivery.status),
  }

  const nameMask = {
    mask: '*'.repeat(32),
    tokens: {
      '*': { pattern: /[А-Яа-яЁё\s-]/ }, // Разрешаем кириллицу, пробел и дефис
    },
  }

  const addressMask = {
    mask: '*'.repeat(100),
    tokens: {
      '*': { pattern: /^[а-яА-Яa-zA-Z0-9\s.,\/\\\-№#]+$/ }, // Разрешаем кириллицу, пробел и дефис
    },
  }
  //#endregion

  //#region validation
  const validationRules = {
    name: (value) => (value.trim().length > 1 ? null : 'Заполните поле'),
    phone: (value) =>
      value.replace(/\D/g, '').length === 11 ? null : 'Введите корректный номер телефона',
    address: (value) =>
      value.trim().length > 3 ? null : `Введите адрес, значение с ошибкой: ${value}, вот`,
    comment: (value) => (value.trim().length >= 0 ? null : ''),
    order_comment: (value) => (value.trim().length >= 0 ? null : ''),
  }

  function validateForm() {
    let isValid = true

    for (const field in validationRules) {
      if (field in displayFields && !displayFields[field].value) continue

      const error =
        field === 'address' || field === 'comment'
          ? validationRules[field](orderStore.order.delivery[field])
          : validationRules[field](orderStore.order[field])

      console.log(error)

      formErrors[field].value = error

      if (error) isValid = false
    }

    return isValid
  }

  function clearError(field) {
    formErrors[field] ? (formErrors[field].value = null) : ''
  }
  //#endregion

  return { formErrors, nameMask, addressMask, clearError, validateForm }
})
