import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const openSidebar = ref<boolean>(false)

  function taggleSidebar(): void{
    openSidebar.value = !openSidebar.value
  }

  return { openSidebar, taggleSidebar }
})
