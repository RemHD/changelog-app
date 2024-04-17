import { createRouter, createWebHistory } from 'vue-router'
import ChangelogView from '../views/ChangelogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ChangelogView,
      meta: { title: 'Home', showInNavBar: true }
    },
    {
      path: '/hidden-changelogs',
      name: 'hidden',
      component: () => import('../views/HiddenChangelogView.vue'),
      meta: { title: 'Hidden', showInNavBar: true }
    },
  ]
})

export default router
