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
  name: "media-list",
  data() {
    return {
      library: [],
      currentMedia: null,
      currentIndex: -1,
      message: "",
    };
  },
  methods: {
    retrieveMedia() {
      LibraryService.getAll()
        .then((response) => {
          this.library = response.data;
          console.log(response.data);
        })
        .catch((x) => {
          console.log(x);
        });
    },
    setFocusMedia(media, index) {
      this.currentMedia = media;
      this.currentIndex = media ? index : -1;
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
    this.retrieveMedia();
    this.setFocusMedia(this.library, 0);
    // this.clickAllObjects();
  },
};
</script>

<style></style>
