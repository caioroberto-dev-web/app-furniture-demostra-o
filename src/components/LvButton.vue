<script setup>
defineProps({
  event: {
    event: Function,
  },
  title: {
    required: true,
    title: String,
  },
  classBtn: {
    required: true,
    classBtn: String,
  },
});
</script>

<template>
  <button :class="`btn ${classBtn}`" type="submit" @click="event">
    {{ title }}
  </button>
</template>

<style scoped></style>
