<template>
  <NavBar :isSearchbarNeeded="false" />
  <div class="container">
    <UserInfos class="user-infos"/>
  </div>
</template>

<script setup lang="ts">
import UserInfos from '../components/UserInfos.component.vue'
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: px;
  grid-row-gap: 30px;
}

.user-infos {
    max-width: 600px;
    
}
</style>
