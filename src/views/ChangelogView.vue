<script setup lang="ts">
import ChangelogCard from '../components/ChangelogCard.component.vue'

const changelogs = [
  {
    id: '1',
    title: 'Title 1',
    dateChangelog: '01/01/01',
    content: 'Content 1'
  },
  {
    id: '2',
    title: 'Title 2',
    dateChangelog: '01/01/01',
    content: 'Content 2'
  },
  {
    id: '3',
    title: 'Title 3',
    dateChangelog: '01/01/01',
    content: 'Content 3'
  },
  {
    id: '4',
    title: 'Title 4',
    dateChangelog: '01/01/01',
    content: 'Content 4'
  },
  {
    id: '5',
    title: 'Title 5',
    dateChangelog: '01/01/01',
    content: 'Content 5'
  },
  {
    id: '6',
    title: 'Title 6',
    dateChangelog: '01/01/01',
    content: 'Content 6'
  }
]
</script>

<template>
  <NavBar />
  <main>
    <div class="grid grid-cols-1 gap-4 place-items-center">
      <ChangelogCard
      class="mb-2.5"
        :id="changelog.id"
        :date-changelog="changelog.dateChangelog"
        :title="changelog.title"
        :content="changelog.content"
        v-for="changelog in changelogs"
        :key="changelog.id"
      />
    </div>
  </main>
</template>

<style scoped>
.changelogs-container {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}
</style>
