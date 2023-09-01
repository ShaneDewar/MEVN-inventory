import AddMedia from "@/components/AddMedia.vue";
import MediaList from "@/components/MediaList.vue";
import ListComponent from "@/components/ListComponent.vue";
import SearchLibrary from "@/components/SearchLibrary.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // { path: "/", name: "Landing Page", component: MediaList },
  {
    path: "/library/:format",
    name: "Media List",
    component: ListComponent,
  },
  { path: "/create", name: "create", component: AddMedia },
  { path: "/search", name: "search", component: SearchLibrary },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
