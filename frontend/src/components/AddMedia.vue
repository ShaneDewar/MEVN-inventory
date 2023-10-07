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
        authors: "",
        format: "",
      },
      submitted: false,
    };
  },
  methods: {
    // Used to autopopulated the added date field by generating today's date in YYYY-MM-DD format
    getTodayDate() {
      let today = new Date();
      return `${today.getFullYear()}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${today.getDate()}`;
    },
    // Confirms a minimal amount of required data was added for the entry before submission to the server.
    validateRequired() {
      this.errors.title =
        this.media.title.length >= 1 ? "" : "Title is required.";
      this.errors.authors =
        this.media.authors.length >= 1
          ? ""
          : "At least one author is required.";
      this.errors.format =
        this.media.format.length >= 1 ? "" : "A format is required.";
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
    addMedia() {
      this.validateRequired();

      if (!this.errors.title && !this.errors.authors && !this.errors.format) {
        let authorsArray = this.splitAndTrimWS(this.media.authors);
        let data = {
          title: this.media.title,
          authors: authorsArray,
          date_added: this.media.date_added,
          format: this.media.format,
          publish_date: this.media.publish_date,
          genres:
            this.media.genres != []
              ? this.splitAndTrimWS(this.media.genres)
              : [],
          have_used: this.media.have_used == "Yes, I have!" ? true : false,
          date_last_used: this.media.date_last_used,
          keywords:
            this.media.keywords != []
              ? this.splitAndTrimWS(this.media.keywords)
              : [],
          languages:
            this.media.languages != []
              ? this.splitAndTrimWS(this.media.languages)
              : [],
          isbn: this.media.isbn,
          size: this.media.size,
          notes:
            this.media.notes != [] ? this.splitAndTrimWS(this.media.notes) : [],
        };

        // test fetch instead of axios. Future change
        // const d = { title: "test1", authors: ["yukk"], date_added: "2023-10-5", format: "Softcover", publish_date: "", };
        // const options = { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(d), };
        // fetch("/api/create", options);
        // console.log("did some fetch");


        LibraryService.create(data)
          .then((response) => {
            this.media.id = response.data.id;
            this.submitted = true;
          })
          .catch((x) => {
            console.log(x);
          });
      } else {
        console.log(this.errors);
      }
    },
    createAnother() {
      this.submitted = false;
      this.media = {
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
      };
      this.errors = {
        title: "",
        authors: "",
        format: "",
      };
      this.submitted = false;
      this.media.date_added = this.getTodayDate();
    },
  },
  beforeMount() {
    this.media.date_added = this.getTodayDate();
  },
};
</script>

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
              v-model="media.authors"
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
                  value="Audio file"
                  v-model="media.format"
                  name="media_format"
                />
                <label for="media_format_digital_music" style="margin-left: 5px"
                  >Digital music or audio file</label
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
              v-model="media.publish_date"
              name="media_publish_date"
            />
          </div>

          <div>
            <label for="media_genres">Genres*: </label>
            <input
              type="text"
              id="media_genres"
              v-model="media.genres"
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
              v-model="media.have_used"
              true-value="Yes, I have!"
              false-value="Not yet"
              name="media_have_used"
            />
            <label for="media_have_used" id="checkbox">{{
              media.have_used
            }}</label>
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
              placeholder="Skiing, Equipment, Switzerland ..."
              maxlength="200"
            />
          </div>

          <div>
            <label for="media_languages">Languages*: </label>
            <input
              type="text"
              id="media_languages"
              v-model="media.languages"
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
              v-model="media.isbn"
              name="media_isbn"
              maxlength="120"
            />
          </div>

          <div>
            <label for="media_size">Size (any format): </label>
            <input
              type="text"
              id="media_size"
              v-model="media.size"
              name="media_size"
              maxlength="120"
            />
          </div>

          <div>
            <label for="media_notes">Notes*: </label>
            <input
              type="text"
              id="media_notes"
              v-model="media.notes"
              name="media_notes"
              placeholder="Some interesting notes., Another Interesting note."
              maxlength="1200"
            />
          </div>
        </div>
      </form>
      <div>
        <button type="submit" @click="addMedia" class="btn submit_success">
          Add this media to your library.
        </button>
      </div>
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

<style>
.error_message {
  color: red;
}

.btn {
  margin-top: 2rem;
}

#check_label {
  margin-right: 0.5rem;
}

#checkbox {
  margin-left: 0.5rem;
}
</style>
