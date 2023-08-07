import Object from '@/components/Object.vue'
import About from '@/views/About.vue'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/objects/:id', name: 'Object', component: Object }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router