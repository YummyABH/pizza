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
  }

  const displayFields = {
    address: computed(() => {
      return orderStore
    }),
  }
  //#endregion

  //#region masks
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
  }

  function validateForm() {
    let isValid = true

    for (const field in validationRules) {
      if (field in displayFields && !displayFields[field]) continue
      console.log('orderStore.order.delivery[field]: ', orderStore.order.delivery[field])

      const error =
        field === 'address' || field === 'comment'
          ? validationRules[field](orderStore.order.delivery[field])
          : validationRules[field](orderStore.order[field])
      formErrors[field].value = error
      console.log('field: ', field)
      console.log('error: ', error)

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
