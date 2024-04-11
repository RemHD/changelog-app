<template>
  <div
    class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 min-w-[450px] max-w-full"
  >
    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ title }}
    </h2>
    <h4>{{ type }}</h4>
    <h4>{{ date }}</h4>
    <p class="font-normal text-gray-700 dark:text-gray-400">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: number
  date: string
  type: string
  title: string
  content: string
}>()
</script>

<style scoped></style>
