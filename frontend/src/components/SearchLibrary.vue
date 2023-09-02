<script>
import LibraryService from "@/frontend-services/LibraryService";
import UpdateMedia from "./UpdateMedia.vue";

export default {
  data() {
    return {
      search_value: "",
      library: [],
      currentMedia: null,
      currentIndex: -1,
      format: "",
    };
  },
  methods: {
    SearchLibrary() {
      LibraryService.search(this.search_value)
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
    },
    refresh() {
      this.currentMedia = null;
      this.currentIndex = -1;
      this.retrieveMedia();
    },
  },
};
</script>

<template>
  <div class="list-grid">
    <div>
      <form class="search-form" @submit.prevent="SearchLibrary">
        <label class="small-space">Search title, authors and keywords:</label
        ><br />
        <input
          type="text"
          id="search_value"
          required
          v-model="search_value"
          name="search_value"
        />
      </form>
      <br />
      <button class="small-space" @click="SearchLibrary">
        Search your Library
      </button>
      <br />
      Click title for more details.
      <ul class="list-items">
        <li
          id="list-item"
          :class="{ active: index == currentIndex }"
          v-for="(media, index) in library"
          :key="index"
          @click="setFocusMedia(media, index)"
        >
          {{ media.title }}
        </li>
      </ul>
    </div>
    <div><button @click="UpdateMedia.updateForm()">Update</button></div>
    <div class="summary">
      <div v-if="currentMedia">
        <div>
          <label class="green summary-label">Title:</label>
          {{ currentMedia.title }}<br />
          <label class="green summary-label">Authors:</label>
          {{ currentMedia.authors }}<br />
          <label class="green summary-label">Format:</label>
          {{ currentMedia.format }}<br />
          <label class="green summary-label">Added to Library on:</label>
          {{ currentMedia.date_added }}<br />
          <label class="green summary-label">Genres:</label>
          {{ currentMedia.genres }}<br />
          <label class="green summary-label">Have read/used:</label>
          {{ currentMedia.have_used }}<br />
          <label class="green summary-label">Last used date:</label>
          {{ currentMedia.date_last_used }}<br />
          <label class="green summary-label">Published on:</label>
          {{ currentMedia.publish_date }}<br />
          <label class="green summary-label">Keywords:</label>
          {{ currentMedia.keywords }}<br />
          <label class="green summary-label">Languages:</label>
          {{ currentMedia.languages }}<br />
          <label class="green summary-label">ISBN:</label>
          {{ currentMedia.isbn }}<br />
          <label class="green summary-label">Size of media:</label>
          {{ currentMedia.size }}<br />
          <label class="green summary-label">Notes:</label>
          {{ currentMedia.notes }}<br />
          <label class="green summary-label">ID:</label>
          {{ currentMedia.id }}<br />
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

#list-item:hover {
  color: rgb(19, 22, 180);
}
.summary {
  grid-column: 3;
}

.delete {
  margin-top: 2rem;
}

.small-space {
  margin-bottom: 0.5rem;
}

#search_value {
  margin-top: 0.5rem;
}
.search-form {
  margin-bottom: 1rem;
}
</style>
