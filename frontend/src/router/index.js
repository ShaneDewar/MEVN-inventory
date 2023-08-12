import AddObject from '@/components/AddObject.vue'
import Object from '@/components/Object.vue'
import ObjectList from '@/components/ObjectList.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', alias: "/objects", name: 'Object List', component: ObjectList },
    { path: '/objects/:id', name: 'Object', component: Object },
    { path: '/create', name: 'create', component: AddObject }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router