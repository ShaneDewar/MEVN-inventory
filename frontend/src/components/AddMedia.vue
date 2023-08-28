<template>
  <div class="media">
    <h1>{{ media.title }}</h1>
    <h2>
      Properties with * after them can accept multiple values separated by a
      comma. Value1,Value2,Value3,etc
    </h2>
  </div>
  <div class="add_media_form">
    <div v-if="!submitted">
      <br />
      <form @submit.prevent="addMedia">
        <div>
          <div>
            <label for="media_title">Title: </label>
            <input
              type="text"
              id="media_title"
              required
              v-model="media.title"
              name="media_title"
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
              v-model="media.authors"
              name="media_authors"
            />
          </div>
          <div>
            Format:
            <ul>
              <li>
                <input
                  type="radio"
                  id="media_format_hardcover"
                  value="Hardcover"
                  required
                  v-model="media.format"
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
                  v-model="media.format"
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
                  v-model="media.format"
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
                  v-model="media.format"
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
                  value="Digital music"
                  v-model="media.format"
                  name="media_format"
                />
                <label for="media_format_digital_music" style="margin-left: 5px"
                  >Digital music</label
                >
              </li>
              <li>
                <input
                  type="radio"
                  id="media_format_cd"
                  value="CD"
                  v-model="media.format"
                  name="media_format"
                />
                <label for="media_format_cd" style="margin-left: 5px">CD</label>
              </li>
            </ul>
          </div>

          <div>
            <label for="media_publish_date">Publish date: </label>
            <input
              type="date"
              id="media_publish_date"
              required
              v-model="media.publish_date"
              name="media_publish_date"
            />
          </div>

          <div>
            <label for="media_date_added">Date added: </label>
            <input
              type="date"
              id="media_date_added"
              required
              v-model="media.date_added"
              placeholder="media.date_added"
              name="media_date_added"
            />
          </div>

          <div>
            <label for="media_genres">Genres*: </label>
            <input
              type="text"
              id="media_genres"
              v-model="media.genres"
              name="media_genres"
            />
          </div>

          <div>
            <label for="media_have_used"
              >Check if you've read or listened to this media:
            </label>
            <input
              type="checkbox"
              id="media_have_used"
              v-model="media.have_used"
              name="media_have_used"
            />
          </div>

          <div>
            <label for="media_date_last_used">If so, when? </label>
            <input
              type="date"
              id="media_date_last_used"
              v-model="media.date_last_used"
              name="media_date_last_used"
            />
          </div>

          <div>
            <label for="media_keywords">Subjects and Keywords*: </label>
            <input
              type="text"
              id="media_keywords"
              v-model="media.keywords"
              name="media_keywords"
            />
          </div>

          <div>
            <label for="media_languages">Languages*: </label>
            <input
              type="text"
              id="media_languages"
              v-model="media.languages"
              name="media_languages"
            />
          </div>

          <div>
            <label for="media_isbn">ISBN: </label>
            <input
              type="text"
              id="media_isbn"
              v-model="media.isbn"
              name="media_isbn"
            />
          </div>

          <div>
            <label for="media_size">Size (any format): </label>
            <input
              type="text"
              id="media_size"
              v-model="media.size"
              name="media_size"
            />
          </div>

          <div>
            <label for="media_notes">Notes*: </label>
            <input
              type="text"
              id="media_notes"
              v-model="media.notes"
              name="media_notes"
              placeholder="Some interesting notes."
            />
          </div>
        </div>
        <button type="submit" @click="addMedia" class="btn submit_success">
          Add this media to your library.
        </button>
      </form>
    </div>

    <div v-else>
      <h3>
        Added the entry {{ this.media.title }} to your library. It's ID is:
        {{ this.media.id }}
      </h3>
      <button class="btn" @click="createAnother">Add More Media</button>
    </div>
  </div>
</template>

<script>
import LibraryService from "@/frontend-services/LibraryService.js";

export default {
  name: "create-media",
  data() {
    return {
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
      },
      submitted: false,
    };
  },
  methods: {
    getTodayDate() {
      let today = new Date();
      console.log(today);
      return `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate()}`;
    },
    validateTitle() {
      this.errors.title =
        this.media.title.length >= 1 ? "" : "Title is required.";
    },
    addMedia() {
      this.validateTitle();
      let data = {
        title: this.media.title,
        authors: this.media.authors,
        date_added: this.media.date_added,
        format: this.media.format,
      };
      console.log(data);

      if (!this.errors.title) {
        LibraryService.create(data)
          .then((response) => {
            this.media.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((x) => {
            console.log(x);
          });
      } else {
        console.log("Need a title");
      }
    },
    createAnother() {
      this.submitted = false;
      this.media = {};
    },
  },
  beforeMount() {
    this.media.date_added = this.getTodayDate();
    console.log(this.media.date_added);
  },
};
</script>

<style>
.error_message {
  color: red;
}
</style>
