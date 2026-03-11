<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import SearchInput from '../ui/SearchInput.vue'
import MenuList from './MenuList.vue'
import MenuNavigation from './MenuNavigation.vue'
import MenuNavigationSide from './MenuNavigationSide.vue'

const activeCategory = ref(1)
const elementRef = ref(null)
const isLessThanTwoThirds = ref(false)
const listCategory = ref([])
let observerNav = null
let observer = null

const scrollToCategory = (id) => {
  const section = listCategory.value.find((el) => +el.id === +id)
  
  if (section) {
    const offset = 60
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

onMounted(() => {
  if (!elementRef.value) return
  
  // Создаем observer
  observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const visibleRatio = entry.intersectionRatio
        
        // Проверяем, видно ли менее 2/3 элемента
        if (visibleRatio < 0.500) {
          isLessThanTwoThirds.value = true
          console.log(`Видно менее 2/3 (${Math.round(visibleRatio * 100)}%)`)
        } else {
          isLessThanTwoThirds.value = false
          console.log(`Видно 2/3 или больше (${Math.round(visibleRatio * 100)}%)`)
        }
      })
    },
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.66, 0.67, 0.7, 0.8, 0.9, 1],
      rootMargin: `-108px 0px 0px 0px`
    }
  )
  
  // Начинаем наблюдение  
  observerNav.observe(elementRef.value)
})

onUnmounted(() => {
  // Очищаем observer при размонтировании
  if (observerNav) {
    observerNav.disconnect()
  }
})

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
        <span ref="elementRef">
          <MenuNavigation class="md:hidden pb-1 mt-4" @scroll="scrollToCategory" :activeCategory="activeCategory" />
        </span>
        <div :class="isLessThanTwoThirds ? '' : 'hidden'" class="px-3 bg-white md:hidden w-full py-2 fixed top-21 z-1 left-0 flex justify-center items-center border-b-[1px] ">
          <MenuNavigation @scroll="scrollToCategory" :activeCategory="activeCategory" />
        </div>
        
        <MenuList v-model:listCategory="listCategory" />
      </div>
    </div>
  </div>
</template>
