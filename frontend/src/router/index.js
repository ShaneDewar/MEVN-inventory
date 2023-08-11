import Object from '@/components/Object.vue'
import ObjectList from '@/components/ObjectList.vue'
import Server from '@/components/Server.vue'
import About from '@/views/About.vue'
// import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: ObjectList },
    { path: '/about', name: 'About', component: About },
    { path: '/objects/:id', name: 'Object', component: Object },
    { path: '/objects', name: 'ObjectList', component: ObjectList },
    { path: '/server', name: 'Server', component: Server }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router