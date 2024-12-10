<script setup>
import { defineComponent } from "vue";

defineProps({
  src: {
    required: true,
    src: String,
  },
  alt: {
    required: true,
    alt: String,
  },
});

defineComponent({
  name: "LvImage",
});
</script>

<template>
  <img :src="src" :alt="alt" />
</template>

<style scoped></style>
