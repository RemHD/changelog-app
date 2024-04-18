<template>
  <NavBar />
  <main>
    <div class="grid grid-cols-1 gap-4 place-items-center mt-10 md:mt-28">
    <template v-if="hiddenChangelogs?.length">
        <ChangelogCard
          class="mb-2.5"
          v-for="changelog in hiddenChangelogs"
          :changelog="changelog"
          :key="changelog.id"
        />
    </template>
    <div v-else class="text-center p-4">
        <p>No changelogs to display</p>
      </div>
    </div>
  </main>
  <ScrollToTop />
</template>

<script setup lang="ts">
import ChangelogCard from '../components/ChangelogCard.component.vue'
import { useChangelogStore } from '@/stores/changelogsStore'
import { initFlowbite } from 'flowbite'
import { computed, onMounted } from 'vue'
import ScrollToTop from '../components/ScrollToTop.component.vue'

const changelogStore = useChangelogStore()

const hiddenChangelogs = computed(() => changelogStore.hiddenChangelogs)

onMounted(async () => {
  initFlowbite()
  await changelogStore.fetchHiddenChangelogs()
})
</script>

<style scoped></style>
