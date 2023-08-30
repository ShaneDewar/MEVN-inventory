<script setup>
defineProps({ title: String, authors: Array, id: String });
</script>

<template>
  <h4>Title: {{ title }}</h4>
  <h4>Authors: {{ authors }}</h4>
  <h4>ID: {{ id }}</h4>
</template>
