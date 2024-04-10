<template>
  <NavBar @update:search="updateSearchQuery"/>
  <main>
    <div class="grid grid-cols-1 gap-4 place-items-center">
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
    </div>
  </main>
</template>

<script setup lang="ts">
import ChangelogCard from '../components/ChangelogCard.component.vue'
import { computed, onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})

const searchQuery = ref('');
const updateSearchQuery = (query: string) => {
  searchQuery.value = query;
};

const filteredChangelogs = computed(() => {
  return changelogs.filter((changelog) =>
    changelog.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const changelogs = [
  {
    id: 1,
    title: 'Title 1',
    type: 'BUG',
    date: '01/01/01',
    content: 'Content 1'
  },
  {
    id: 2,
    title: 'Title 2',
    type: 'BUG',
    date: '01/01/01',
    content: 'Content 2'
  },
  {
    id: 3,
    title: 'Title 3',
    type: 'BUG',
    date: '01/01/01',
    content: 'Content 3'
  },
  {
    id: 4,
    title: 'Title 4',
    type: 'BUG',
    date: '01/01/01',
    content: 'Content 4'
  },
  {
    id: 5,
    title: 'Title 5',
    type: 'BUG',
    date: '01/01/01',
    content: 'Content 5'
  },
  {
    id: 6,
    title: 'Title 6',
    type: 'FEAT',
    date: '01/01/01',
    content: 'Content 6'
  }
]
</script>

<style scoped></style>
