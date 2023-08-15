import AddMedia from '@/components/AddMedia.vue'
import Media from '@/components/Media.vue'
import MediaList from '@/components/MediaList.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', alias: "/media", name: 'Media List', component: MediaList },
    { path: '/media/:id', name: 'Media', component: Media },
    { path: '/create', name: 'create', component: AddMedia }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router