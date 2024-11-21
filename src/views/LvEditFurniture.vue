<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

//Components
import LvButton from "../components/LvButton.vue";
import LvModalConfirm from "../components/LvModalConfirm.vue";

//Services
import { furnitureServices } from "../services/furnitureServices";

//Store
import { useUserStore } from "../store/useUserStore";

const route = useRoute();

const router = useRouter();

const editFurniture = ref();

const $toast = useToast();

const userStore = useUserStore();

onMounted(async () => {
  getFurnitureDetails(route.params.id);
});

const getFurnitureDetails = async (id) => {
  await furnitureServices
    .getFurnitureDetailsById(id)
    .then((res) => {
      editFurniture.value = res.data.movel;
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

const handleSubmit = async () => {
  const formData = new FormData();

  if (editFurniture.value.image.length > 0) {
    formData.append("image", editFurniture.value.image[0].file);
  }

  for (const [key, value] of Object.entries(editFurniture.value)) {
    if (key !== "image") {
      formData.append(key, value);
    }
  }

  await furnitureServices
    .editFurniture(route.params.id, formData)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
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
    <div v-if="!editFurniture" class="spinner-border text-white" role="status">
      <p class="visually-hidden">Carregando...</p>
    </div>
    <FormKit
      v-else
      @submit.prevent=""
      type="form"
      :actions="false"
      #default="{ value }"
    >
      <h1 class="text-center text-white my-5">Editar móvel</h1>
      <div class="container-form row gy-3">
        <div class="col-lg-6 col-12">
          <FormKit
            type="text"
            name="nomeProduto"
            v-model="editFurniture.nomeProduto"
            label="Nome do produto"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="select"
            label="Condição"
            name="condicao"
            v-model="editFurniture.condicao"
            :options="[
              { label: '', attrs: { disabled: true } },
              'novo',
              'usado',
            ]"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="text"
            name="cor"
            v-model="editFurniture.cor"
            label="Cor"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="number"
            number
            label="Preço R$"
            name="preco"
            v-model="editFurniture.preco"
            validation="required"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="file"
            name="image"
            v-model="editFurniture.image"
            label="Imagem do produto"
            accept=".png,.jpg,.jpeg"
            multiple="false"
          />
        </div>
        <div class="col-lg-6 col-12">
          <FormKit
            type="textarea"
            name="descricao"
            v-model="editFurniture.descricao"
            label="Descrição"
            :help="`${
              value.descricao ? value.descricao.length : 0
            } / 2000 máximo`"
            validation="required|length:0,2000"
            :validation-messages="{
              length: 'Descrição não pode exceder os 2000 characters.',
            }"
          />
        </div>
        <div>
          <router-link
            class="btn btn-danger me-3"
            :to="'/user-panel/' + userStore.user.idUsuario"
            >Cancelar</router-link
          >
          <lv-button
            :classBtn="'btn-primary'"
            :title="'Salvar'"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          ></lv-button>
        </div>
      </div>
      <lv-modal-confirm
        :title="'Editar móvel'"
        :bodyContent="'Deseja confirmar as alterações?'"
        :event="handleSubmit"
      ></lv-modal-confirm>
    </FormKit>
  </div>
</template>

<style scope>
.container-form {
  width: 75%;
  margin: 0 auto;
  background-color: #733816;
  padding: 50px;
  color: #fefefe;
  border-radius: 15px;
}

@media (max-width: 576px) {
  .container-form {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
