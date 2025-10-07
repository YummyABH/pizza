<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import SearchInput from '../ui/SearchInput.vue'
import MenuList from './MenuList.vue'
import MenuNavigation from './MenuNavigation.vue'
import MenuNavigationSide from './MenuNavigationSide.vue'

const activeCategory = ref(1)

const listCategory = ref(null)
let observer = null

// const sidebarReady = ref(false)
// const contentReady = ref(false)

// const onSidebarMounted = () => {
//   sidebarReady.value = true
//   tryInitObserver()
// }

// const onCategoryListMounted = () => {
//   contentReady.value = true
//   tryInitObserver()
// }

// function tryInitObserver() {
//   if (sidebarReady.value && contentReady.value) {
//     initObserver()
//   }
// }

function initObserver() {  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeCategory.value = +entry.target.id
        }
      })
    },
    {
      threshold: 0.3 // Можно изменить под нужную чувствительность
    }
  )
  
  const sections = toRaw(listCategory.value)
  console.log('sections: ', sections);
  
  sections?.forEach((section) =>{console.log('section: ', listCategory.value)
   observer.observe(section)})
}
watch(listCategory, () => {
  initObserver()
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

</script>

<template>
  <div class="w-full pt-25 pb-25 ">
    <div class="max-w-[1900px] max-sm:px-0 mx-auto px-5 flex">
      <MenuNavigationSide  :activeCategory="activeCategory" class="max-md:hidden sticky" />
      <div
        class="bg-white rounded-r-4xl max-sm:px-3 max-md:rounded-4xl py-8 px-8 max-md:px-6 max-md:py-6 w-full"
      >
        <h1 class="mb-4 text-3xl font-bold">Меню</h1>
        <SearchInput />
        <MenuNavigation />
        <MenuList @mount="initObserver" v-model:listCategory="listCategory"/>
      </div>
    </div>
  </div>
</template>
