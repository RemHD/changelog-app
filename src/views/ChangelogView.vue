<template>
  <NavBar @update:search="updateSearchQuery" />
  <div class="flex px-4">
    <CreateChangelogModal />
  </div>
  <main>
    <div class="grid grid-cols-1 gap-4 place-items-center mt-10 md:mt-28">
      <template v-if="changelogStore.filteredChangelogs?.length">
        <ChangelogCard
          class="mb-2.5"
          v-for="changelog in changelogStore.filteredChangelogs"
          :changelog="changelog"
          :key="changelog.id"
        />
      </template>
      <div v-else class="text-center p-4">
        <p>{{ $t('no-changelogs') }}</p>
      </div>
    </div>
  </main>
  <ScrollToTop />
</template>

<script setup lang="ts">
import ChangelogCard from '../components/ChangelogCard.component.vue'
import { onMounted, ref } from 'vue'
import { useChangelogStore } from '@/stores/changelogsStore'
import { initFlowbite } from 'flowbite'
import CreateChangelogModal from '../components/CreateChangelogModal.component.vue'
import ScrollToTop from '../components/ScrollToTop.component.vue'
import { watchEffect } from 'vue'

const isLoading = ref(false)
const hasMoreChangelogs = ref(true)

const changelogStore = useChangelogStore()

watchEffect(() => {
  if (changelogStore.changelogs.length === 0) {
    changelogStore.fetchChangelogs()
  }
})

const isNearBottom = () => {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
}

const updateSearchQuery = (query: string) => {
  changelogStore.setSearchQuery(query)
}

onMounted(async () => {
  initFlowbite()
  window.addEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  if (isNearBottom() && !isLoading.value && hasMoreChangelogs.value) {
    changelogStore.continueFetchingChangelogs()
  }
}
</script>

<style scoped></style>
