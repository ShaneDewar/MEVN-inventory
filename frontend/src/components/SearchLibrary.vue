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
      LibraryService.search(search_value)
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
  <form class="search_form">
    <label>What to search for?</label>
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
