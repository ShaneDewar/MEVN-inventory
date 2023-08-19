<template>
  <div class="add_media_form">
    <div v-if="!submitted">
      <!-- <div>
        <label for="media_name">Media Title: </label>
        <input
          type="text"
          id="media_name"
          required
          v-model="media.media"
          name="media_name"
        />
      </div>

      <div>
        <label for="media_summary">Summary: </label>
        <input
          type="text"
          id="media_summary"
          required
          v-model="media.summary"
          name="media_summary"
        />
      </div> -->
      <div class="media">
        <h1>{{ media.title }}</h1>
        <h2>
          Properties with * after them can accept multiple values separated by a
          comma. Value1,Value2,Value3,etc
        </h2>
        <br />

        <div>
          <label for="media_title">Title: </label>
          <input
            type="text"
            id="media_title"
            required
            v-model="media.title"
            name="media_title"
          />
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
        <!-- <div>
          <label for="media_format">Format: </label>
          <input
            type="text"
            id="media_format"
            required
            v-model="media.format"
            name="media_format"
          />
        </div> -->

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
          />
        </div>
      </div>

      <button @click="addMedia" class="btn submit_success">
        Add this media to your library.
      </button>
    </div>
    <div v-else>
      <h3>Submitted Media Creation</h3>
      <button class="btn btn-success" @click="newMedia">Add Media</button>
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
        media: "*blank*",
        title: "Placeholder Title",
        authors: ["Enter", "multiple"],
        format: "",
        publish_date: Date,
        date_added: { type: Date, default: Date.now },
        genres: ["genre1", "genre2"],
        have_used: Boolean,
        date_last_used: Date,
        keywords: [""],
        languages: [""],
        isbn: "",
        size: "",
        notes: ["Color can be useful."],
      },
      submitted: false,
    };
  },
  methods: {
    addMedia() {
      let data = {
        title: this.media.title,
        authors: this.media.authors,
      };

      LibraryService.create(data)
        .then((response) => {
          this.media.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((x) => {
          console.log(x);
        });
    },

    newMedia() {
      this.submitted = false;
      this.media = {};
    },
  },
};
</script>

<style></style>
