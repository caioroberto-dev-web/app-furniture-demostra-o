<script setup>
import { defineComponent } from "vue";

//Components
import LvList from "../components/LvList.vue";

defineComponent({
  name: "LvHome",
});
</script>

<template>
  <div>
    <div class="container-search">
      <FormKit type="search" label="Buscar" validation="required" />
      <button class="btn btn-sm btn-primary d-block mt-3 ms-auto" type="button">
        Busca
      </button>
    </div>
    <h1 class="text-center my-5 text-white">Ofertas</h1>
    <LvList></LvList>
  </div>
</template>

<style scoped></style>
