<script>
import { ref } from "vue";
import LibraryService from "@/frontend-services/LibraryService";
export default {
  data() {
    return {
      search_value: "",
    };
  },
  methods: {
    SearchLibrary() {
      LibraryService.search(this.search_value)
        .then((response) => {
          this.res = response.data;
          console.log(response.data);
        })
        .catch((x) => {
          console.log(x);
        });
    },
  },
};
</script>

<template>
  <form class="search_form" @submit.prevent="SearchLibrary">
    <label>Search title, authors and keywords:</label><br />
    <input
      type="text"
      id="search_value"
      required
      v-model="search_value"
      name="search_value"
    />
  </form>
  <br />
  <button @click="SearchLibrary">Search your Library</button>
</template>
