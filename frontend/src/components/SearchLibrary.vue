<script>
import LibraryService from "@/frontend-services/LibraryService";

export default {
  data() {
    return {
      search_value: "",
      media: {
        id: null,
        media: "",
        title: "",
        authors: [],
        format: "",
        publish_date: "",
        date_added: "",
        genres: [],
        have_used: "",
        date_last_used: "",
        keywords: [],
        languages: [],
        isbn: "",
        size: "",
        notes: [],
      },
      errors: {
        title: "",
        authors: "",
        format: "",
      },
      library: [],
      currentMedia: "",
      currentIndex: -1,
      format: "",
      editing_mode: false,
      update_success: false,
    };
  },
  methods: {
    SearchLibrary() {
      LibraryService.search(this.search_value)
        .then((response) => {
          this.library = response.data;
          this.setFocusMedia(this.library[0], 0);
        })
        .catch((x) => {
          console.log(x);
        });
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
    updateMedia() {
      this.validateRequired();
      if (!this.errors.title && !this.errors.authors && !this.errors.format) {
        let data = {
          title: this.currentMedia.title,
          authors: this.splitAndTrimWS(this.currentMedia.authors),
          date_added: this.currentMedia.date_added,
          format: this.currentMedia.format,
          publish_date: this.currentMedia.publish_date,
          genres: this.splitAndTrimWS(this.currentMedia.genres),
          have_used:
            this.currentMedia.have_used == "Yes, I have!" ? true : false,
          date_last_used: this.currentMedia.date_last_used,
          keywords:
            this.currentMedia.keywords != []
              ? this.splitAndTrimWS(this.currentMedia.keywords)
              : [],
          languages:
            this.currentMedia.languages != []
              ? this.splitAndTrimWS(this.currentMedia.languages)
              : [],
          isbn: this.currentMedia.isbn,
          size: this.currentMedia.size,
          notes:
            this.currentMedia.notes != []
              ? this.splitAndTrimWS(this.currentMedia.notes)
              : [],
        };

        LibraryService.update(this.currentMedia.id, data)
          .then((response) => {
            this.currentMedia.id = response.data.id;
            this.update_success = true;
            this.editing_mode = false;
          })
          .catch((x) => {
            console.log(x);
          });
      } else {
        console.log(this.errors);
      }
    },
    // Confirms a minimal amount of required data was added for the entry before submission to the server.
    validateRequired() {
      this.errors.title =
        this.currentMedia.title.length >= 1 ? "" : "Title is required.";
      this.errors.authors =
        this.currentMedia.authors.length >= 1
          ? ""
          : "At least one author is required.";
      this.errors.format =
        this.currentMedia.format.length >= 1 ? "" : "A format is required.";
    },
    // Convert strings to arrays and remove whitespace
    splitAndTrimWS(x) {
      if (Array.isArray(x)) {
        return x;
      } else {
        let items = x.split(",");

        let trimmedItems = [];
        if (items.length > 0) {
          for (const i of items) {
            trimmedItems.push(i.trim());
          }
        }
        return trimmedItems;
      }
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
    switchToEditingMode() {
      this.editing_mode = this.editing_mode ? false : true;
      this.update_success = false;
    },
  },
  beforeMount() {
    if (this.$route.params.id) {
      LibraryService.get(this.$route.params.id)
        .then((response) => {
          this.library[0] = response.data;
          this.currentMedia = this.library[0];
          this.setFocusMedia(this.library[0], 0);
          this.editing_mode = true;
          this.update_success = false;
        })
        .catch((x) => {
          console.log(x);
        });
      this.$route.params.id = "";
    }
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
          maxlength="120"
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

    <div class="media-update">
      <div v-if="editing_mode">
        <div>
          <br />
          <form @submit.prevent="updateMedia">
            <div>
              <div>
                <label for="media_title">Title: </label>
                <input
                  type="text"
                  id="media_title"
                  required
                  v-model="currentMedia.title"
                  name="media_title"
                  maxlength="120"
                />
                <p class="error_message" v-if="errors.title">
                  {{ errors.title }}
                </p>
              </div>

              <div>
                <label for="media_authors">Authors*: </label>
                <input
                  type="text"
                  id="media_authors"
                  required
                  v-model="currentMedia.authors"
                  name="media_authors"
                  placeholder="Author 1, Author 2, ..."
                  maxlength="200"
                />
                <p class="error_message" v-if="errors.authors">
                  {{ errors.authors }}
                </p>
              </div>
              <div>
                Format:
                <p class="error_message" v-if="errors.format">
                  {{ errors.format }}
                </p>
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="media_format_hardcover"
                      value="Hardcover"
                      required
                      v-model="currentMedia.format"
                      name="media_format"
                    />
                    <label for="media_format_hardcover" style="margin-left: 5px"
                      >Hardcover</label
                    >
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="media_format_softcover"
                      value="Softcover"
                      v-model="currentMedia.format"
                      name="media_format"
                    />
                    <label for="media_format_softcover" style="margin-left: 5px"
                      >Softcover</label
                    >
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="media_format_ebook"
                      value="eBook"
                      v-model="currentMedia.format"
                      name="media_format"
                    />
                    <label for="media_format_ebook" style="margin-left: 5px"
                      >eBook</label
                    >
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="media_format_audiobook"
                      value="Audiobook"
                      v-model="currentMedia.format"
                      name="media_format"
                    />
                    <label for="media_format_audiobook" style="margin-left: 5px"
                      >Audiobook</label
                    >
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="media_format_digital_music"
                      value="Audio file"
                      v-model="currentMedia.format"
                      name="media_format"
                    />
                    <label
                      for="media_format_digital_music"
                      style="margin-left: 5px"
                      >Digital music or audio file</label
                    >
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="media_format_cd"
                      value="CD"
                      v-model="currentMedia.format"
                      name="media_format"
                    />
                    <label for="media_format_cd" style="margin-left: 5px"
                      >CD</label
                    >
                  </li>
                </ul>
              </div>

              <div>
                <label for="media_publish_date">Publish date: </label>
                <input
                  type="date"
                  id="media_publish_date"
                  v-model="currentMedia.publish_date"
                  name="media_publish_date"
                />
              </div>

              <div>
                <label for="media_genres">Genres*: </label>
                <input
                  type="text"
                  id="media_genres"
                  v-model="currentMedia.genres"
                  name="media_genres"
                  placeholder="Genre 1, Genre 2, ..."
                  maxlength="120"
                />
              </div>

              <div>
                <span id="check_label">
                  Check if you've read or listened to this media:
                </span>

                <input
                  type="checkbox"
                  id="media_have_used"
                  v-model="currentMedia.have_used"
                  true-value="Yes, I have!"
                  false-value="Not yet"
                  name="media_have_used"
                />
                <label for="media_have_used" id="checkbox">{{
                  currentMedia.have_used
                }}</label>
              </div>

              <div>
                <label for="media_date_last_used">If so, when? </label>
                <input
                  type="date"
                  id="media_date_last_used"
                  v-model="currentMedia.date_last_used"
                  name="media_date_last_used"
                />
              </div>

              <div>
                <label for="media_keywords">Subjects and Keywords*: </label>
                <input
                  type="text"
                  id="media_keywords"
                  v-model="currentMedia.keywords"
                  name="media_keywords"
                  placeholder="Skiing, Equipment, Switzerland ..."
                  maxlength="200"
                />
              </div>

              <div>
                <label for="media_languages">Languages*: </label>
                <input
                  type="text"
                  id="media_languages"
                  v-model="currentMedia.languages"
                  name="media_languages"
                  placeholder="PHP, French, Morse..."
                  maxlength="200"
                />
              </div>

              <div>
                <label for="media_isbn">ISBN: </label>
                <input
                  type="text"
                  id="media_isbn"
                  v-model="currentMedia.isbn"
                  name="media_isbn"
                  maxlength="120"
                />
              </div>

              <div>
                <label for="media_size">Size (any format): </label>
                <input
                  type="text"
                  id="media_size"
                  v-model="currentMedia.size"
                  name="media_size"
                  maxlength="120"
                />
              </div>

              <div>
                <label for="media_notes">Notes*: </label>
                <input
                  type="text"
                  id="media_notes"
                  v-model="currentMedia.notes"
                  name="media_notes"
                  maxlength="1200"
                />
              </div>
            </div>
          </form>
        </div>
        <div>
          <button type="submit" @click="updateMedia" class="btn submit_success">
            Save updates for [{{ currentMedia.title }}] in your library.
          </button>
        </div>
      </div>
    </div>

    <div class="summary">
      <div v-if="currentMedia">
        <div v-if="this.update_success">
          <h2>{{ currentMedia.title }} updated successfully.</h2>
        </div>
        <h2>Details for: {{ currentMedia.title }}</h2>
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
          <button class="edit list-btn" @click="switchToEditingMode">
            Edit Toggle Mode (Doesn't save changes)
          </button>
        </p>
        <button class="delete list-btn" @click="deleteMedia">
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

.media-update {
  grid-column: 2;
  margin-right: 0.5rem;
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
