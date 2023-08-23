<template>
  <div>
    <h2>{{ media.title }}</h2>
    >
  </div>
  <div>
    <button @click="increment">!{{ counter }}!</button>
  </div>
</template>

<script>
import LibraryService from "@/frontend-services/LibraryService.js";

export default {
  data() {
    return {
      media: {},
      title: "Default",
      counter: 0,
    };
  },
  mounted() {
    LibraryService.get(1)
      .then((response) => {
        console.log(response.data);
      })
      .catch((x) => {
        console.log(x);
      });
  },
  methods: {
    increment() {
      this.counter++;
    },
  },
  updated() {
    console.log("clicking!");
  },
};
</script>

<style></style>
