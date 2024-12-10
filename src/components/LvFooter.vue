<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "LvFooter",
});
</script>

<template>
  <footer class="footer py-5 mt-5 text-center">
    <p>Furniture - 2024 &copy; Todos direitos reservados</p>
    <small
      >Desenvolvido em vue.js - por
      <a href="https://www.linkedin.com/in/caioroberto-dev-web" target="_blank"
        >Caio Roberto</a
      ></small
    >
  </footer>
</template>

<style scoped>
.footer {
  min-height: 50px;
  background-color: #f2f2f2;
}
</style>
