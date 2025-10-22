import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const openSidebar = ref(false)

  function taggleSidebar() {
    openSidebar.value = !openSidebar.value
  }

  return { openSidebar, taggleSidebar }
})
