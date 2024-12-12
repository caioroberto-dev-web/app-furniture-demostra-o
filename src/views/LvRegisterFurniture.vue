<script setup>
import { defineComponent } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

//Components
import LvButton from "../components/LvButton.vue";

//Services
import { furnitureServices } from "../services/furnitureServices";

//Store
import { useUserStore } from "../store/useUserStore";

defineComponent({
  name: "LvRegisterFurniture",
});

const router = useRouter();

const $toast = useToast();

const userStore = useUserStore();

const handleSubmit = async (field) => {
  const formData = new FormData();

  field.image.forEach((image) => {
    formData.append("image", image.file);
  });

  for (const [key, value] of Object.entries(field)) {
    if (key !== "image") {
      formData.append(key, value);
    }
  }

  await furnitureServices
    .registerFurniture(formData)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      router.push("/user-panel/" + userStore.user.idUsuario);
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};
</script>

<template>
  <FormKit
    @submit="handleSubmit"
    type="form"
    :actions="false"
    #default="{ value }"
  >
    <h2 class="text-center text-white my-5">Registrar móvel</h2>
    <div class="row m-auto gy-3 container-form">
      <div class="col-lg-6 col-12">
        <FormKit
          type="text"
          name="nomeProduto"
          label="Nome do produto"
          validation="required"
        />
      </div>
      <div class="col-lg-6 col-12">
        <FormKit
          type="select"
          label="Selecione as condições"
          name="condicao"
          :options="[{ label: '', attrs: { disabled: true } }, 'novo', 'usado']"
          validation="required"
        />
      </div>
      <div class="col-lg-6 col-12">
        <FormKit type="text" name="cor" label="Cor" validation="required" />
      </div>
      <div class="col-lg-6 col-12">
        <FormKit
          type="number"
          number
          label="Preço R$"
          name="preco"
          validation="required"
        />
      </div>
      <div class="col-lg-6 col-12">
        <FormKit
          type="file"
          name="image"
          label="Imagem do produto"
          accept=".png,.jpg,.jpeg"
          multiple="true"
          validation="required"
        />
      </div>
      <div class="col-lg-6 col-12">
        <FormKit
          type="textarea"
          name="descricao"
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
        <LvButton :classBtn="'btn-primary'" :title="'Registrar'"></LvButton>
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
