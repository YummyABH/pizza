import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore.ts'

export const useOrderInputStore = defineStore('orderInput', () => {
  const orderStore = useOrderStore()

  //#region fields
  // Ошибки для полей
  const formErrors = {
    name: ref<null | string>(null),
    phone: ref<null | string>(null),
    address: ref<null | string>(null),
    comment: ref<null | string>(null),
    order_comment: ref<null | string>(null),
  }

  //#endregion

  //#region masks
  const displayFields = {
    address: computed<boolean>(() => orderStore.order.delivery.status),
    comment: computed<boolean>(() => orderStore.order.delivery.status),
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
    name: (value: string): null | string => (value.trim().length > 1 ? null : 'Заполните поле'),
    phone: (value: string): null | string =>
      value.replace(/\D/g, '').length === 11 ? null : 'Введите корректный номер телефона',
    address: (value: string): null | string =>
      value.trim().length > 3 ? null : `Введите адрес, значение с ошибкой: ${value}, вот`,
    comment: (value: string): null | string => (value.trim().length >= 0 ? null : ''),
    order_comment: (value: string): null | string => (value.trim().length >= 0 ? null : ''),
  }

  function validateForm(): boolean {
    let isValid: boolean = true

    for (const key in validationRules) {
      const field = key as keyof typeof validationRules

      if (field in displayFields) {
        const isDisplayed = displayFields[field as keyof typeof displayFields].value
        if (!isDisplayed) {
          continue
        }
      }

      const error:null | string =
        field === 'address' || field === 'comment'
          ? validationRules[field](orderStore.order.delivery[field])
          : validationRules[field](orderStore.order[field])

      formErrors[field].value = error

      if (error) isValid = false
    }

    return isValid
  }

  function clearError(field: keyof typeof formErrors) {
    return formErrors[field] ? (formErrors[field].value = null) : ''
  }
  //#endregion

  return { formErrors, nameMask, addressMask, clearError, validateForm }
})
