<script setup>
import { defineComponent } from "vue";

//Components
import LvButton from "./LvButton.vue";
import LvImage from "./LvImage.vue";
import LvRouterLink from "./LvRouterLink.vue";

//Store
import { useUserStore } from "../store/useUserStore";
import { useFurnitureStore } from "../store/useFurnitureStore";

//Services
import { furnitureServices } from "../services/furnitureServices";

defineComponent({
  name: "LvNavBar",
});

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
            <LvRouterLink
              :classBtn="'nav-link'"
              :to="'/'"
              :title="'Inicial'"
            ></LvRouterLink>
          </li>
          <template v-if="userStore.user.loggedIn !== false">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :to="/user-panel/ + userStore.user.idUsuario"
              >
                <LvImage
                  class="img-profile rounded"
                  :src="userStore.user.image"
                  :alt="userStore.user.nome"
                />
                {{ userStore.user.nome }}
              </router-link>
            </li>
            <li class="nav-item">
              <LvButton
                :classBtn="'btn-danger btn-sm mt-1'"
                @click="userStore.logout"
                :title="'Logout'"
              ></LvButton>
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
              <LvRouterLink
                :classBtn="'nav-link'"
                :to="'/register'"
                :title="'Registro'"
              >
              </LvRouterLink>
            </li>
            <li class="nav-item">
              <LvRouterLink
                :classBtn="'nav-link'"
                :to="'/login'"
                :title="'Login'"
              >
              </LvRouterLink>
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

.bi-cart2 {
  cursor: pointer;
}
</style>
