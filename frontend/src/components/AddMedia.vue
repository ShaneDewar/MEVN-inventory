<template>
  <div class="add_media_form">
    <div v-if="!submitted">
      <div>
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
        media: "",
        summary: "",
      },
      submitted: false,
    };
  },
  methods: {
    addMedia() {
      let data = {
        media: this.media.media,
        summary: this.media.summary,
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
