<script setup>
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
</script>

<template>
  <img :src="src" :alt="alt" />
</template>

<style scoped>

</style>
