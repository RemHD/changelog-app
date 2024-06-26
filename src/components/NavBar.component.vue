<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../assets/logo.svg" class="h-8" alt="Pole app logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Changelog</span
        >
      </a>
      <div class="flex md:order-2 md:space-x-4">
        <div class="hidden md:flex items-center space-x-4">
          <RouterLink
            v-for="route in filteredRoutes"
            :key="route.name"
            class="hover:text-gray-400 transition-colors duration-300"
            :to="route.path"
          >
            {{ route.meta.title }}
          </RouterLink>
        </div>
        <button
          v-if="isSearchbarNeeded"
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">{{ $t('search') }}</span>
        </button>
        <div class="relative hidden md:block" v-if="isSearchbarNeeded">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">{{ $t('search-icon') }}</span>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            id="search-navbar"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="$t('search-by-title-or-date')"
          />
        </div>
        <button
          @click="toggleMenu"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded="false"
        >
          <span class="sr-only">{{ $t('open-main-menu') }}</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-search"
      >
        <div class="relative mt-3 md:hidden">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            @input="updateSearch"
            id="search-navbar"
            class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :placeholder="$t('search-by-title-or-date')"
          />
        </div>
      </div>
    </div>
    <!-- Menu mobile -->
    <div :class="{ block: isOpen, hidden: !isOpen }" class="md:hidden">
      <RouterLink
        v-for="route in filteredRoutes"
        :key="route.name"
        class="block px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
        :to="route.path"
      >
        {{ route.meta.title }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '../router/router'

withDefaults(
  defineProps<{
    isSearchbarNeeded?: boolean
  }>(),
  {
    isSearchbarNeeded: true
  }
)

let searchQuery = ref('')

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const emit = defineEmits(['update:search'])

const filteredRoutes = router.getRoutes().filter((route) => route.meta.showInNavBar)

const updateSearch = () => {
  console.log(searchQuery.value)
  emit('update:search', searchQuery.value)
}
</script>

<style scoped></style>
