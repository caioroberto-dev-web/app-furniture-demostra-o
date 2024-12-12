<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

//Components
import LvButton from "../components/LvButton.vue";
import LvModalConfirm from "../components/LvModalConfirm.vue";

//Services
import { userServices } from "../services/userServices";

//Store
import { useUserStore } from "../store/useUserStore";

defineComponent({
  name: "LvUserEdit",
});

const route = useRoute();

const router = useRouter();

const userEdit = ref();

const $toast = useToast();

const userStore = useUserStore();

onMounted(async () => {
  await userServices
    .getUserById(route.params.id)
    .then((res) => {
      userEdit.value = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
});

const handleSubmit = async () => {
  const formData = new FormData();

  if (userEdit.value.image.length > 0) {
    formData.append("image", userEdit.value.image[0].file);
  }

  for (const [key, value] of Object.entries(userEdit.value)) {
    if (key !== "image") {
      formData.append(key, value);
    }
  }

  await userServices
    .updatedUser(userStore.user.idUsuario, formData)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      userStore.checaUsuario();
      router.push("/user-panel/" + route.params.id);
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};
</script>

<template>
  <div>
    <div v-if="!userEdit">
      <div class="spinner-border text-white" role="status">
        <p class="visually-hidden">Carregando...</p>
      </div>
    </div>
    <div v-else>
      <FormKit @submit="" id="myForm" type="form" :actions="false">
        <h1 class="text-center text-white my-5">Edição</h1>
        <div class="row gy-3 m-auto container-form">
          <div class="col-lg-6">
            <FormKit
              type="text"
              name="nome"
              v-model="userEdit.nome"
              label="Nome"
              validation="required"
            />
          </div>
          <div class="col-lg-6">
            <FormKit
              type="text"
              name="email"
              v-model="userEdit.email"
              label="E-mail"
              validation="required|email"
            />
          </div>
          <div class="col-lg-6">
            <FormKit
              type="password"
              name="password"
              v-model="userEdit.senha"
              label="Senha"
              validation="length:6|matches:/[^a-zA-Z]/"
              :validation-messages="{
                matches: 'Por favor inserir pelo menos um caracter especial.',
              }"
            />
          </div>
          <div class="col-lg-6">
            <FormKit
              type="password"
              name="password_confirm"
              v-model="userEdit.confirmaSenha"
              label="Confirma senha"
              validation="confirm"
            />
          </div>
          <div class="col-lg-6">
            <FormKit
              type="tel"
              name="telefone"
              v-model="userEdit.telefone"
              label="Telefone"
              validation="required|matches:/^[0-9]{2}[0-9]{4}[0-9]{4}$/"
              :validation-messages="{
                matches:
                  'O número de telefone deve estar no formato xxx-xxx-xxxx',
              }"
            />
          </div>
          <div class="col-lg-6">
            <FormKit
              type="file"
              name="image"
              v-model="userEdit.image"
              label="Imagem de perfil"
              accept=".png,.jpg,.jpeg"
              multiple="false"
            />
          </div>
          <div class="col-lg-12">
            <router-link
              class="btn btn-danger me-3"
              :to="'/user-panel/' + userStore.user.idUsuario"
              >Cancelar</router-link
            >
            <LvButton
              :classBtn="'btn-primary'"
              title="Salvar"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            ></LvButton>
          </div>
        </div>
        <LvModalConfirm
          :title="'Editar perfil'"
          :bodyContent="'Deseja confirmar as alterações?'"
          :event="handleSubmit"
        ></LvModalConfirm>
      </FormKit>
    </div>
  </div>
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
    width: 100%;
  }
}

@media (max-width: 576px) {
  .btn-danger,
  .btn-primary {
    width: 100%;
    margin: 7px 0;
  }
}
</style>
