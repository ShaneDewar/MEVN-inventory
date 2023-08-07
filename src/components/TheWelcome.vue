<script setup>
import Item from './Item.vue';
</script>

<template>
  <Item>
    <template #subslot>Subslot text picture!</template>
    <template #heading>Heading</template>

    Interesting first section body text here.
  </Item>

  <Item>
    <template #subslot>2nd Subslot text picture!</template>
    <template #heading>Second Heading</template>
    Also interesting text.

  </Item>
</template>
