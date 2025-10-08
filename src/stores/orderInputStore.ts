import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useOrderStore } from '@/stores/orderStore.ts'

export const useOrderInputStore = defineStore('orderInput', () => {
  const orderStore = useOrderStore()

  //#region fields
  // Ошибки для полей
  const formErrors = {
    name: ref(null),
  }

  const displayFields = {
    period: computed(() => {
      return !shortPeriod.value
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
  //#endregion

  //#region validation
  const validationRules = {
    name: (value) => (value.trim().length > 1 ? null : 'Заполните поле'),
  }

  function validateForm() {
    let isValid = true

    for (const field in validationRules) {
      if (field in displayFields && !displayFields[field]) continue
      console.log(orderStore.order[field])

      const error = validationRules[field](orderStore.order[field])
      formErrors[field].value = error
      if (error) isValid = false
    }

    return isValid
  }

  function clearError(field) {
    formErrors[field] ? (formErrors[field].value = null) : ''
  }
  //#endregion

  return { formErrors, nameMask, clearError, validateForm }
})
