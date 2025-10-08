<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import SearchInput from '../ui/SearchInput.vue'
import MenuList from './MenuList.vue'
import MenuNavigation from './MenuNavigation.vue'
import MenuNavigationSide from './MenuNavigationSide.vue'

const activeCategory = ref(1)

const listCategory = ref([])
let observer = null

const scrollToCategory = (id) => {
  const section = listCategory.value.find((el) => +el.id === id)
  if (section) {
    const offset = 200 // 👈 нужный отступ сверху, в пикселях

    const top = section.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

watch(listCategory.value, () => {
  if (listCategory.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry) => {
            activeCategory.value = +entry.target.id
          })
      },
      {
        threshold: 1, // Можно изменить под нужную чувствительность
      },
    )

    listCategory.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="w-full pt-25 pb-25">
    <div class="max-w-[1900px] max-sm:px-0 mx-auto px-5 flex">
      <MenuNavigationSide
        @scroll="scrollToCategory"
        :activeCategory="activeCategory"
        class="max-md:hidden sticky"
      />
      <div
        class="bg-white rounded-r-4xl max-sm:px-3 max-md:rounded-4xl py-8 px-8 max-md:px-6 max-md:py-6 w-full"
      >
        <h1 class="mb-4 text-3xl font-bold">Меню</h1>
        <SearchInput />
        <MenuNavigation />
        <MenuList v-model:listCategory="listCategory" />
      </div>
    </div>
  </div>
</template>
