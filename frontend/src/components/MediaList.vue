<template>
  <div>
    <ul>
      <li
        :class="{ active: index == currentIndex }"
        v-for="(media, index) in library"
        :key="index"
      >
        {{ currentMedia.summary }}
      </li>
    </ul>
  </div>
  <!-- <div> <button @click="clickAllObjects()">Get Objects</button></div> -->
</template>

<script>
// import { getObjects } from '@/frontend-services';
import LibraryService from "../frontend-services/LibraryService.js";

export default {
  name: "object-list",
  data() {
    return {
      library: [],
      currentObject: null,
      currentIndex: -1,
      message: "",
    };
  },
  methods: {
    retrieveObjects() {
      LibraryService.getAll()
        .then((response) => {
          this.objects = response.data;
          console.log(response.data);
        })
        .catch((x) => {
          console.log(x);
        });
    },
    setFocusObject(object, index) {
      this.currentObject = object;
      this.currentIndex = object ? index : -1;
      // },
      // clickAllObjects() {
      //     getObjects().then(response => {
      //         this.objects = response.data;
      //         this.currentObject = response.name;
      //         console.log(this.objects);
      //     })
    },
  },
  mounted() {
    this.retrieveObjects();
    this.setFocusObject(this.library, 0);
    // this.clickAllObjects();
  },
};
</script>

<style></style>
