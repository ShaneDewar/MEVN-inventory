<script>
import LibraryService from "../frontend-services/LibraryService.js";
export default {
  name: "MediaList",
  props() {
    return {
      library: [],
      currentMedia: null,
      currentIndex: -1,
      format: "",
    };
  },
  methods: {
    retrieveMedia() {
      LibraryService.getAllOfFormat(this.format)
        .then((response) => {
          this.library = response.data;
          console.log(response.data);
          this.setFocusMedia(this.library[0], 0);
        })
        .catch((x) => {
          console.log(x);
        });
    },
    deleteMedia() {
      LibraryService.delete(this.currentMedia.id)
        .then((response) => {
          console.log(response.data);
          this.refresh();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setFocusMedia(media, index) {
      this.currentMedia = media ? media : null;
      this.currentIndex = media ? index : -1;
      console.log(this.library, "lib");
    },
    refresh() {
      this.currentMedia = null;
      this.currentIndex = -1;
      this.retrieveMedia();
    },
  },
  mounted() {
    this.retrieveMedia();
  },
};
</script>

<template>
  <div class="list-grid">
    <div class="list">
      <h2>{{ format + "s" }} in Library:</h2>
      Click title to select.
      <ul class="list-items">
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
        <div>
          <label class="green summary-label">Title:</label>
          {{ currentMedia.title }}<br />
          <label class="green summary-label">Authors:</label>
          {{ currentMedia.authors }}<br />
          <label class="green summary-label">Format:</label>
          {{ currentMedia.format }}<br />
        </div>
        <button class="delete" @click="deleteMedia">Delete this media</button>
      </div>
    </div>
  </div>
</template>

<style>
.list-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.list {
  grid-column: 1;
}

.list-items {
  color: rgb(70, 72, 185);
}

.summary {
  grid-column: 3;
}
</style>
