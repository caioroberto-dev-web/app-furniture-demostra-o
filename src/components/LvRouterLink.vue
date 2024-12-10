<script setup>
import { defineComponent } from "vue";

defineProps({
  to: {
    required: true,
    to: String,
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

defineComponent({
  name: "LvRouterLink",
});

</script>

<template>
  <router-link :class="`btn ${classBtn}`" :to="to">{{ title }}</router-link>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
