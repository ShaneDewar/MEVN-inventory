import AddMedia from "@/components/AddMedia.vue";
import MediaList from "@/components/MediaList.vue";
import ListComponent from "@/components/ListComponent.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // { path: "/", name: "Landing Page", component: MediaList },
  {
    path: "/library/:format",
    name: "Audio Books List",
    component: ListComponent,
  },
  { path: "/create", name: "create", component: AddMedia },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
