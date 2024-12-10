<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";

//Components
import LvImage from "../components/LvImage.vue";
import LvModalConfirm from "../components/LvModalConfirm.vue";
import LvCarouselFurnitureImg from "../components/LvCarouselFurnitureImg.vue";

//Services
import { furnitureServices } from "../services/furnitureServices";

//Store
import { useUserStore } from "../store/useUserStore";
import { useFurnitureStore } from "../store/useFurnitureStore";

defineComponent({
  name: "LvFurnitureDetails",
});

const route = useRoute();

const furnitureDetails = ref();

const userStore = useUserStore();

const furnitureStore = useFurnitureStore();

const $toast = useToast();

onMounted(async () => {
  getFurnitureDetails(route.params.id);
});

const getFurnitureDetails = async (id) => {
  await furnitureServices
    .getFurnitureDetailsById(id)
    .then((res) => {
      furnitureDetails.value = res.data.movel;
      console.log(furnitureDetails.value);
    })
    .catch((err) => {
      console.log(err);
    });
};

const iWantBuyFurniture = async () => {
  await furnitureServices
    .iWantToBuyFurtinure(route.params.id, userStore.user.token)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      getFurnitureDetails(route.params.id);
      furnitureStore.productsInCart();
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};

const isButtonDisabled = () => {
  $toast.warning("Móvel em negociação!", {
    position: "top",
  });
};
</script>

<template>
  <div>
    <div
      v-if="!furnitureDetails"
      class="spinner-border text-white"
      role="status"
    >
      <p class="visually-hidden">Carregando...</p>
    </div>
    <div v-else class="row container-furniture mt-5">
      <div class="col-lg-6 container-img-furniture">
        <LvImage
          class="img-furtinure"
          :src="furnitureDetails.image[0].url"
          :alt="furnitureDetails.nomeProduto"
        ></LvImage>
      </div>
      <div class="row col-lg-6">
        <h2 class="mt-lg-0 mt-3">{{ furnitureDetails.nomeProduto }}</h2>
        <p class="fs-1 price">R$ {{ furnitureDetails.preco }}</p>
        <p class="fs-6">Condição - {{ furnitureDetails.condicao }}</p>
        <p class="fs-6">Vendedor - {{ furnitureDetails.nomeVendedor }}</p>
        <template
          v-if="
            furnitureDetails.situacao === true &&
            furnitureDetails.nomeComprador === null &&
            userStore.user.loggedIn === true
          "
        >
          <button
            class="btn btn-success mx-3"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Desejo comprar
          </button>
          <LvModalConfirm
            :title="'Comprar este móvel'"
            :bodyContent="'Deseja confirmar o interesse?'"
            class="text-dark"
            :event="iWantBuyFurniture"
          ></LvModalConfirm>
        </template>
        <template
          v-else-if="
            furnitureDetails.situacao !== false &&
            furnitureDetails.nomeComprador !== null
          "
        >
          <button
            class="btn btn-warning text-white"
            type="button"
            @click="isButtonDisabled"
          >
            Em negociação
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="bg-warning text-center text-white py-3 rounded nav-link"
            type="button"
          >
            <i class="bi bi-lock-fill"></i> É necessário fazer o login para
            comprar
          </router-link>
        </template>
      </div>
      <hr class="mt-5" />
      <LvCarouselFurnitureImg
        :srcImg="furnitureDetails.image"
        :altImg="furnitureDetails.nomeProduto"
      ></LvCarouselFurnitureImg>
      <hr class="mt-5" />
      <h3 class="text-center mt-5">Descricão</h3>
      <p class="my-3">{{ furnitureDetails.descricao }}</p>
      <hr class="mt-5" />
    </div>
  </div>
</template>

<style scoped>
.img-furtinure {
  width: 300px;
  border-radius: 15px;
}

.container-furniture {
  background-color: #733816;
  padding: 50px;
  color: #fefefe;
  border-radius: 15px;
}

@media (max-width: 992px) {
  .container-img-furniture {
    width: 300px;
    margin: auto;
  }
}
</style>
