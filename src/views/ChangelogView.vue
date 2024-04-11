<template>
  <NavBar @update:search="updateSearchQuery" />
  <main>
    <div class="grid grid-cols-1 gap-4 place-items-center">
      <template v-if="filteredChangelogs?.length">
        <ChangelogCard
          class="mb-2.5"
          :id="changelog.id"
          :date="changelog.date"
          :type="changelog.type"
          :title="changelog.title"
          :content="changelog.content"
          v-for="changelog in filteredChangelogs"
          :key="changelog.id"
        />
      </template>
      <div v-else class="text-center p-4">
        <p>No changelogs to display</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ChangelogCard from '../components/ChangelogCard.component.vue'
import { computed, onMounted, ref } from 'vue'
import { useChangelogStore } from '@/stores/changelogsStore'
import { initFlowbite } from 'flowbite'
import type { ChangelogInterface } from '@/utils/interfaces'

const isLoading = ref(false)
const hasMoreChangelogs = ref(true)

let changelogs = ref<ChangelogInterface[]>([])
const changelogStore = useChangelogStore()

// To detect if we're near the end of the page
const isNearBottom = () => {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
}

// initialize components based on data attribute selectors
onMounted(async () => {
  initFlowbite()
  // our local changelogs gets the changelogs from the store
  changelogs.value = await changelogStore.fetchChangelogs()
  window.addEventListener('scroll', handleScroll)
})

// Fetch changelogs after init
const continueFetchingChangelogs = async () => {
  // No concurrent fetching
  if (isLoading.value || !hasMoreChangelogs.value) return
  isLoading.value = true

  const lastId =
    changelogs.value.length > 0 ? changelogs.value[changelogs.value.length - 1].id : undefined
  const fetchedChangelogs = await changelogStore.fetchChangelogs(lastId)

  if (fetchedChangelogs.length === 0) {
    hasMoreChangelogs.value = false
  } else {
    changelogs.value = [...changelogs.value, ...fetchedChangelogs]
  }

  isLoading.value = false
}

const handleScroll = () => {
  if (isNearBottom() && !isLoading.value) {
    continueFetchingChangelogs()
  }
}

const searchQuery = ref('')
const updateSearchQuery = (query: string) => {
  searchQuery.value = query
}

const filteredChangelogs = computed(() => {
  return changelogs?.value.filter((changelog) => {
    // Check if the title includes the search query
    const titleMatch = changelog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    // Convert both the changelog date and the search query to the same format and check if they match
    // This simple example assumes the changelog.date is already in 'YYYY-MM-DD' format.
    const dateMatch = changelog.date.includes(searchQuery.value)
    return titleMatch || dateMatch
  })
})
</script>

<style scoped></style>
