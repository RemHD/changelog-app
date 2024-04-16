<template>
  <NavBar @update:search="updateSearchQuery" />
  <div class="flex px-4">
    <CreateChangelogModal/>
  </div>
  <main>
    <div class="grid grid-cols-1 gap-4 place-items-center mt-10 md:mt-28">
      <template v-if="changelogStore.filteredChangelogs?.length">
        <ChangelogCard
          class="mb-2.5"
          v-for="changelog in changelogStore.filteredChangelogs"
          :id="changelog.id"
          :date="changelog.date"
          :type="changelog.type"
          :title="changelog.title"
          :app_name="changelog.app_name"
          :content="changelog.content"
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
import CreateChangelogModal from '../components/CreateChangelogModal.component.vue'

const isLoading = ref(false)
const hasMoreChangelogs = ref(true)
const searchQuery = ref('')

const changelogStore = useChangelogStore()

// To detect if we're near the end of the page
const isNearBottom = () => {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
}

const updateSearchQuery = (query: string) => {
  changelogStore.setSearchQuery(query)
}

// initialize components based on data attribute selectors
onMounted(async () => {
  initFlowbite()
  // our local changelogs gets the changelogs from the store
  if (changelogStore.changelogs.length === 0) {
    await changelogStore.fetchChangelogs()
  }
  window.addEventListener('scroll', handleScroll)
})

// Fetch changelogs after init
const continueFetchingChangelogs = async () => {
  // No concurrent fetching
  if (isLoading.value || !hasMoreChangelogs.value) return
  isLoading.value = true

  const lastId =
    changelogStore.changelogs.length > 0
      ? changelogStore.changelogs[changelogStore.changelogs.length - 1].id
      : undefined
  const fetchedChangelogs = await changelogStore.fetchChangelogs(lastId)

  if (fetchedChangelogs.length === 0) {
    hasMoreChangelogs.value = false
  } else {
    changelogStore.changelogs = [...changelogStore.changelogs, ...fetchedChangelogs]
  }

  isLoading.value = false
}

const handleScroll = () => {
  if (isNearBottom() && !isLoading.value && hasMoreChangelogs.value) {
    continueFetchingChangelogs()
  }
}


</script>

<style scoped></style>
