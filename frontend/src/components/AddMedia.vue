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
  </div>
</template>

<script>
export default {
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
  // beforeMount() {
  //     fetchmedia(parseInt(this.$route.params.id))
  //         .then((response) => {
  //             this.media = response
  //         })
  // }
  methods: {
    addMedia() {
      let data = {
        media: this.media.media,
        summary: this.media.summary,
      };
      console.log(data);
    },
  },
};
</script>

<style></style>
