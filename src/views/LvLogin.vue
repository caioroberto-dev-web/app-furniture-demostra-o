<script setup>
import { defineComponent } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

//Components
import LvButton from "../components/LvButton.vue";

//Services
import { userServices } from "../services/userServices";

//Store
import { useUserStore } from "../store/useUserStore";
import { useFurnitureStore } from "../store/useFurnitureStore";

defineComponent({
  name: "LvLogin",
});

const router = useRouter();

const $toast = useToast();

const userStore = useUserStore();

const furnitureStore = useFurnitureStore();

const handleSubmit = async (field) => {
  await userServices
    .userLogin(field)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      userStore.userLogin(field);
      router.push("/");
      setTimeout(() => {
        furnitureStore.productsInCart();
      }, 1000);
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};
</script>

<template>
  <FormKit @submit="handleSubmit" type="form" :actions="false">
    <h1 class="text-center text-white my-5">Logar</h1>
    <div class="col-lg-6 m-auto container-form">
      <div class="row col-lg-6 gy-3 m-auto">
        <FormKit
          type="email"
          name="email"
          label="E-mail"
          validation="required|email"
        />
        <FormKit
          type="password"
          name="senha"
          label="Senha"
          validation="required"
        />
        <div class="col-lg-6">
          <LvButton :classBtn="'btn-primary'" title="Logar"></LvButton>
        </div>
      </div>
    </div>
  </FormKit>
</template>

<style scoped>
.container-form {
  width: 847px;
  background-color: #733816;
  padding: 50px;
  color: #fefefe;
  border-radius: 15px;
}

@media (max-width: 992px) {
  .container-form {
    width: 447px;
  }
}

@media (max-width: 576px) {
  .container-form {
    width: 100%;
  }
}

</style>
