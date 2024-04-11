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
        <p>
          No changelogs to display
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ChangelogCard from '../components/ChangelogCard.component.vue'
import { computed, onMounted, ref } from 'vue'
import { useChangelogStore } from '@/stores/changelogsStore'
import { initFlowbite } from 'flowbite'
import type { ChangelogInterface } from '@/utils/interfaces';

let changelogs = ref<ChangelogInterface[]>([])

// initialize components based on data attribute selectors
onMounted(async () => {
  const changelogStore = useChangelogStore()
  changelogs.value = await changelogStore.fetchChangelogs()
  initFlowbite()
})

const searchQuery = ref('')
const updateSearchQuery = (query: string) => {
  searchQuery.value = query
}

const filteredChangelogs = computed(() => {
  return changelogs?.value.filter((changelog) =>
    changelog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped></style>
