import { onMounted, onBeforeUnmount } from 'vue'

export function useClickOutside(refElement, callback) {
  const handleClickOutside = (event: Event) => {
    // Проверяем, находится ли клик вне элемента, на который ссылается refElement
    if (refElement.value && !refElement.value.contains(event.target)) {
      console.log(!refElement.value.contains(event.target))
      console.log(refElement.value)
      console.log(event.target)

      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}
