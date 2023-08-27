<template>
  <div class="list-grid">
    <div class="list">
      <h3>Media in your Library:</h3>
      <ul>
        <li
          :class="{ active: index == currentIndex }"
          v-for="(media, index) in library"
          :key="index"
          @click="setFocusMedia(media, index)"
        >
          {{ media.title }}
        </li>
      </ul>
    </div>

    <div class="summary">
      <div v-if="currentMedia">
        <h4>This Media:</h4>
        <div>
          <label>Title:</label> {{ currentMedia.title }}<br />
          <label>Authors:</label> {{ currentMedia.authors }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LibraryService from "../frontend-services/LibraryService.js";

export default {
  name: "media-list",
  data() {
    return {
      library: [],
      currentMedia: null,
      currentIndex: -1,
    };
  },
  methods: {
    retrieveMedia() {
      LibraryService.getAll()
        .then((response) => {
          this.library = response.data;
          console.log(response.data);
          this.setFocusMedia(this.library[0], 0);
        })
        .catch((x) => {
          console.log(x);
        });
    },
    setFocusMedia(media, index) {
      this.currentMedia = media;
      this.currentIndex = media ? index : -1;
      console.log(this.library, "lib");
    },
  },
  mounted() {
    this.retrieveMedia();
  },
};
</script>

<style>
.list-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.list {
  grid-column: 1;
  color: red;
}

.summary {
  grid-column: 3;
}
</style>
