<script>
export default {
  data() {
    return {};
  },
  methods: {
    updateForm() {
      return `
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
              placeholder="Author 1, Author 2, ..."
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
            />
          </div>

          <div>
            <label for="media_isbn">ISBN: </label>
            <input
              type="text"
              id="media_isbn"
              v-model="media.isbn"
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
              placeholder="Some interesting notes., Another Interesting note."
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
`;
    },
  },
};
</script>
