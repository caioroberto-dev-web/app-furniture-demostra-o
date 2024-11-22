<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toast-notification";
import Pagination from "v-pagination-3";

//Services
import { furnitureServices } from "../services/furnitureServices";

//Components
import LvImage from "./LvImage.vue";
import LvRouterLink from "./LvRouterLink.vue";

const furniture = ref();

const $toast = useToast();

const page = ref(1);

const totalPages = ref(0);

onMounted(async () => {
  await furnitureServices
    .getAllFurniture()
    .then((res) => {
      furniture.value = res.data.moveis;
      totalPages.value = furniture.value.length;
      console.log(furniture.value.length);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
});

const isSold = () => {
  $toast.warning("O produto foi vendido!", {
    position: "top",
  });
};

const isNegotiating = () => {
  $toast.warning("O produto está em negociação!", {
    position: "top",
  });
};

const getPagedItems = (currentPage) => {
  const startIndex = (currentPage - 1) * 10;

  const endIndex = Math.min(startIndex + 10, furniture.value.length);

  return furniture.value.slice(startIndex, endIndex);
};
</script>

<template>
  <div class="row g-lg-3 g-3">
    <div v-if="!furniture" class="text-white spinner-border" role="status">
      <p class="visually-hidden">Carregando...</p>
    </div>
    <div
      v-else
      v-for="item of getPagedItems(page)"
      :key="item.id"
      class="card col-lg-3 col-md-6 col-12 py-3"
    >
      <div class="card-header text-center bg-transparent border-0">
        <h2 class="fs-6">{{ item.nomeProduto }}</h2>
      </div>
      <lv-image class="img-fluid" :src="item.image" :alt="item.nomeProduto" />
      <div class="card-body">
        <p class="card-text text-center fs-6">R$ {{ item.preco }},00</p>
      </div>
      <lv-router-link
        v-if="item.nomeComprador !== null && item.situacao !== false"
        @click="isNegotiating"
        :title="'Em negociação'"
        :classBtn="'btn-warning text-white'"
        :to="'/'"
      ></lv-router-link>
      <lv-router-link
        v-else-if="item.nomeComprador === null && item.situacao !== false"
        :title="'Compre agora'"
        :classBtn="'btn-success text-white'"
        :to="'/furniture-details/' + item.idMovel"
      ></lv-router-link>
      <lv-router-link
        v-else
        @click="isSold"
        :title="'Vendido!'"
        :classBtn="'btn-danger text-white'"
        :to="'/'"
      ></lv-router-link>
    </div>
    <pagination v-model="page" :records="totalPages" :per-page="10" />
  </div>
</template>

<style scoped>
img {
  display: block;
  width: 90%;
  margin: auto;
  border-radius: 15px;
}

.card-text {
  color: #fefefe;
  background-color: #260801;
  padding: 15px;
  border-radius: 15px;
}

.card {
  border: 5px solid #260801;
  border-radius: 15px;
}

.v-toast__text {
  color: #260801;
}
</style>
