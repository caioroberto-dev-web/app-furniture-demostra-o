<script setup>
//Components
import LvButton from "./LvButton.vue";
import LvImage from "./LvImage.vue";
import LvRouterLink from "./LvRouterLink.vue";

//Store
import { useUserStore } from "../store/useUserStore";
import { useFurnitureStore } from "../store/useFurnitureStore";

//Services
import { furnitureServices } from "../services/furnitureServices";

const userStore = useUserStore();

const furnitureStore = useFurnitureStore();

const emit = defineEmits(["emitCartClicked"]);

const emitCartClick = () => {
  emit("emitCartClicked");
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a href="/" class="navbar-brand">
        <img class="w-25" src="/furniture.svg" alt="furniture" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target=".collapse"
        aria-controls="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <lv-router-link
              :classBtn="'nav-link'"
              :to="'/'"
              :title="'Inicial'"
            ></lv-router-link>
          </li>
          <template v-if="userStore.user.loggedIn !== false">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="/user-panel/ + userStore.user.idUsuario"
              >
                <lv-image
                  class="img-profile rounded"
                  :src="userStore.user.image"
                  :alt="userStore.user.nome"
                />
                {{ userStore.user.nome }}
              </router-link>
            </li>
            <li class="nav-item">
              <lv-button
                :classBtn="'btn-danger btn-sm mt-1'"
                @click="userStore.logout"
                :title="'Logout'"
              ></lv-button>
            </li>
            <li class="nav-item mt-lg-0 mt-2">
              <p class="position-absolute productsInCart px-1">
                {{ furnitureStore.cart.furnitureNumber }}
              </p>
              <i class="bi bi-cart2 fs-4 ms-1" @click="emitCartClick"></i>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <lv-router-link
                :classBtn="'nav-link'"
                :to="'/register'"
                :title="'Registro'"
              >
              </lv-router-link>
            </li>
            <li class="nav-item">
              <lv-router-link
                :classBtn="'nav-link'"
                :to="'/login'"
                :title="'Login'"
              >
              </lv-router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.img-profile {
  height: 25px;
  margin-right: 5px;
}

.productsInCart {
  font-size: 12px;
  background-color: red;
  color: #fefefe;
  margin-left: 10px;
  border-radius: 100%;
}
</style>
