import { createRouter, createWebHistory } from 'vue-router'
import ChangelogView from '../views/ChangelogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChangelogView
    },
  ]
})

export default router
