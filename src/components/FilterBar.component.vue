<template>
  <div class="flex items-center px-4">
    Filter
    <div class="px-1">
      <input
        id="feat-checkbox"
        type="checkbox"
        value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="feat-checkbox"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Feat</label
      >
      <input
        id="bug-checkbox"
        type="checkbox"
        value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="bug-checkbox"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Bug</label
      >
    </div>
  </div>
</template>
