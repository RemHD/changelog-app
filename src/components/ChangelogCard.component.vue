<template>
  <div
    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-[450px] max-w-full"
  >
    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ title }}
    </h2>
    <div class="flex items-center">
      <span
        v-if="type === ChangelogType.FEAT"
        class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
      >
        {{ type }}</span
      >
      <span
        v-else-if="type === ChangelogType.BUG"
        class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
      >
        {{ type }}
      </span>
      <h4 v-if="app_name">Application: {{ app_name }}</h4>
    </div>
    <h4>{{ date }}</h4>
    <p class="font-normal text-gray-700 dark:text-gray-400">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import { ChangelogType } from '@/utils/interfaces'

defineProps<{
  id?: number
  app_name?: string
  date: string
  type: string
  title: string
  content: string
}>()

</script>

<style scoped></style>
