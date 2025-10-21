<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import IconMenu from '../icons/IconMenu.vue'
import IconOrderHistoryMini from '../icons/IconOrderHistoryMini.vue'
import IconUsers from '../icons/IconUsers.vue'
import { useRoute } from 'vue-router'
import IconArrow from '../icons/IconArrow.vue'
import { useAdminStore } from '@/stores/adminStore'
import IconLogout from '../icons/IconLogout.vue'

const storeAdmin = useAdminStore()
const route = useRoute()
const openSublistId = ref(null)
const activeSublist = ref(null)

const tab = [
  {
    id: 1,
    name: 'Заказы',
    link: '/admin-orders',
    icon: IconOrderHistoryMini,
  },
  {
    id: 2,
    name: 'Пользователи',
    link: '/admin-users',
    icon: IconUsers,
  },
  {
    id: 3,
    name: 'Меню',
    link: '/admin-menu',
    icon: IconMenu,
    sublist: [
      {
        id: 1,
        name: 'Блюда',
        link: '/admin-menu/dishes',
      },
      {
        id: 2,
        name: 'Категории блюд',
        link: '/admin-menu/category-dishes',
      },
    ],
  },
]

watch(route, () => {
  const active = tab
    .flatMap((item) =>
      (item.sublist || []).map((subitem) => ({
        parentId: item.id,
        subitem,
      })),
    )
    .find(({ subitem }) => route.path.includes(subitem.link))

  activeSublist.value = active?.parentId
  openSublistId.value = active?.parentId
})

</script>

<template>
  <div @click="storeAdmin.taggleSidebar" :class="storeAdmin.openSidebar ? 'left-70 ' : 'left-0 '"
    class="fixed flex duration-0 items-center justify-center cursor-pointer w-14 h-14 rounded-r-xl bg-[#111827]">
    <div :class="storeAdmin.openSidebar ? ' rotate-0' : ' rotate-180'">
      <IconArrow />
    </div>
  </div>
  <div :class="storeAdmin.openSidebar ? 'left-0' : '-left-full'"
    class="fixed duration-0 flex flex-col text-white top-0 h-screen overflow-y-scroll scroll-hidden min-w-70 max-2xl:min-w-50 bg-[#111827]">
    <div class="text-2xl font-medium px-7 py-3">ЛОГОТИП</div>
    <div class="px-4 pb-4 flex flex-col justify-between flex-1">
      <div class="">
        <div class="font-medium text-[#9ca3af] pl-3 pb-4">МЕНЕДЖМЕНТ</div>
        <div v-for="item in tab" :key="item.id">
          <router-link @click="((openSublistId = null), (activeSublist = null))" v-slot="{ isActive, isExactActive }"
            v-if="!item.sublist" :to="item.link">
            <div class="duration-200 hover:bg-[#1b233a] p-3 mb-1 rounded-xl flex gap-2 items-center"
              :class="isActive ? 'bg-[#1b233a]' : ''">
              <span>
                <component :is="item.icon" />
              </span>
              <span>{{ item.name }}</span>
            </div>
          </router-link>
          <div v-if="item.sublist">
            <div class="duration-200 hover:bg-[#1b233a] cursor-pointer p-3 mb-1 rounded-xl flex gap-2 items-center"
              :class="activeSublist === item.id ? 'bg-[#1b233a]' : ''" @click="openSublistId = item.id">
              <span>
                <component :is="item.icon" />
              </span>
              <span>{{ item.name }}</span>
            </div>
            <div v-for="subitem in item.sublist" :key="subitem.id" v-show="openSublistId === item.id" @click.stop
              @click="activeSublist = item.id">
              <router-link :to="subitem.link" v-slot="{ isActive, isExactActive }">
                <div :class="isActive ? 'bg-[#1b233a]' : ''"
                  class="duration-200 hover:bg-[#1b233a] cursor-pointer p-3 mb-1 rounded-xl flex gap-2 items-center">
                  <span class="w-1 h-1 bg-white rounded-full mr-2 ml-1"></span>
                  <span>{{ subitem.name }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>

      </div>
      <div class="text-2xl ml-3 mb-10 flex gap-x-3 items-center duration-200 hover:bg-[#1f2b45] bg-[#1b233a] cursor-pointer p-3 rounded-xl "><span><IconLogout/></span><span>Выход</span></div>
    </div>
  </div>
</template>

<style scoped>
.scroll-hidden {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.scroll-hidden::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Edge */
}
</style>
