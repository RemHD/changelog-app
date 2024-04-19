<template>
  <div
    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-[450px] max-w-full justify-between"
  >
    <div class="flex justify-between items-center">
      <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ changelog.title }}
      </h2>
      <div class="dropdown flex items-center justify-between" @click="toggleDropdown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="grey" width="24" height="24">
          <path
            d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"
          ></path>
        </svg>
        <div v-show="isOpenDropdown" class="pt-2">
          <div>{{ $t('edit') }}</div>
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <span
        v-if="changelog.type === ChangelogType.FEAT"
        class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
      >
        {{ changelog.type }}</span
      >
      <span
        v-else-if="changelog.type === ChangelogType.BUG"
        class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
      >
        {{ changelog.type }}
      </span>
      <h4 v-if="changelog.app_name">{{ $t('application') }}: {{ changelog.app_name }}</h4>
    </div>
    <h4>{{ changelog.date }}</h4>
    <p class="font-normal text-gray-700 dark:text-gray-400">{{ changelog.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { ChangelogType, type ChangelogInterface } from '@/utils/interfaces'
import { ref } from 'vue'

defineProps<{
  changelog: ChangelogInterface
}>()

const isOpenDropdown = ref(false)

const toggleDropdown = () => {
  isOpenDropdown.value = !isOpenDropdown.value
}
</script>

<style scoped>
.dropdown {
  cursor: pointer;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
}
</style>
