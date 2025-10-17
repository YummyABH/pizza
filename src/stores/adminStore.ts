import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const openSidebar = ref(true)

  function taggleSidebar() {
    openSidebar.value = !openSidebar.value
  }

  return { openSidebar, taggleSidebar }
})
