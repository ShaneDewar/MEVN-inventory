<script>
import { provide } from "vue";
import LibraryService from "../frontend-services/LibraryService.js";

export default {
  setup() {
    provide("requested_format", "");
  },
  name: "MediaList",
  data() {
    return {
      library: [],
      currentMedia: null,
      currentIndex: -1,
      format: "",
    };
  },
  methods: {
    retrieveMedia() {
      if (this.format == "All") {
        LibraryService.getAll()
          .then((response) => {
            this.library = response.data;
            this.setFocusMedia(this.library[0], 0);
          })
          .catch((x) => {
            console.log(x);
          });
      } else {
        LibraryService.getAllOfFormat(this.format)
          .then((response) => {
            this.library = response.data;
            this.setFocusMedia(this.library[0], 0);
          })
          .catch((x) => {
            console.log(x);
          });
      }
    },
    redirectUpdate() {
      if (this.currentMedia) {
        this.$router.push({
          name: "searchID",
          params: { id: this.currentMedia.id },
        });
      } else {
        console.log("Must select a media to update first.");
      }
    },
    deleteMedia() {
      LibraryService.delete(this.currentMedia.id)
        .then((response) => {
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
  beforeMount() {
    this.requested_format = this.$route.params.format;
    this.format = this.requested_format ? this.requested_format : "";
  },
  created() {
    this.$watch(
      () => this.$route.params.format,
      (toParams, prvParams) => {
        this.format = this.$route.params.format;
        this.retrieveMedia();
      },
    );
  },
  mounted() {
    this.retrieveMedia();
  },
};
</script>

<template>
  <div class="list-grid">
    <div class="list">
      <h2>
        {{ format == "All" ? "All Media" : format + "s" }} in your Library:
      </h2>
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
    <div class="summary">
      <div v-if="currentMedia">
        <h3>Details for: {{ currentMedia.title }}</h3>
        --- --- --- --- --- --- --- ---
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
          --- --- --- --- --- --- --- ---
        </div>

        <p>
          <button class="update btn" @click="redirectUpdate">
            Update this Media
          </button>
        </p>
        <button class="delete btn" @click="deleteMedia">
          Delete this media
        </button>
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

.btn {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
