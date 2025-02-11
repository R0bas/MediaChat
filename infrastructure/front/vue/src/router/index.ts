import { createRouter, createWebHistory } from 'vue-router'
import MediaChatViewer from '@/views/MediaChatViewer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:key',
      name: 'viewer',
      component: MediaChatViewer,
    },
  ],
})

export default router
