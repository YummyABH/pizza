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
  const section = listCategory.value.find((el) => +el.id === +id)
  if (section) {
    const offset = 100
    const top = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

const watchObserver = (is_ready) => {
  if (!is_ready) return
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
      threshold: 1,
    },
  )

  listCategory.value.forEach((el) => {
    if (el) observer.observe(el)
  })
}

watch(listCategory.value, () => {
  watchObserver(listCategory.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div @scroll="watchObserver(listCategory)" class="w-full pt-25 pb-25">
    <div class="max-w-[1900px] max-sm:px-0 mx-auto px-5 flex">
      <MenuNavigationSide
        @scroll="scrollToCategory"
        :activeCategory="activeCategory"
        class="max-md:hidden sticky"
      />
      <div
        class="bg-white rounded-r-4xl max-sm:px-3 max-md:rounded-4xl py-8 px-8 max-md:px-6 max-md:py-6 w-full"
      >
        <h1 class="text-3xl font-bold">Меню</h1>
        <!-- <SearchInput /> -->
        <MenuNavigation @scroll="scrollToCategory" :activeCategory="activeCategory" />
        <MenuList v-model:listCategory="listCategory" />
      </div>
    </div>
  </div>
</template>
