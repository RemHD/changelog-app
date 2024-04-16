<template>
  <NavBar />
  <main>
    <div class="grid grid-cols-1 gap-4 place-items-center mt-10 md:mt-28">
      <ChangelogCard
        class="mb-2.5"
        v-for="changelog in hiddenChangelogs"
        :id="changelog.id"
        :date="changelog.date"
        :type="changelog.type"
        :title="changelog.title"
        :app_name="changelog.app_name"
        :content="changelog.content"
        :key="changelog.id"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import ChangelogCard from '../components/ChangelogCard.component.vue'
import { useChangelogStore } from '@/stores/changelogsStore'
import { initFlowbite } from 'flowbite'
import { computed, onMounted } from 'vue'

const changelogStore = useChangelogStore()

const hiddenChangelogs = computed(() => changelogStore.hiddenChangelogs)

onMounted(async () => {
  initFlowbite()
  await changelogStore.fetchHiddenChangelogs()
})
</script>

<style scoped></style>
