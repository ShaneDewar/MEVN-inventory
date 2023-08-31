<script setup>
import { inject } from "vue";
import EbookList from "./EbookList.vue";
const requested_format = inject("Audiobook");
</script>

<template><EbookList /></template>
