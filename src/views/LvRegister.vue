<script setup>
import { defineComponent } from "vue";
import { useToast } from "vue-toast-notification";
import { reset } from "@formkit/core";
import { useRouter } from "vue-router";

//Services
import { userServices } from "../services/userServices";

//Components
import LvButton from "../components/LvButton.vue";

defineComponent({
  name: "LvRegister",
});

const $toast = useToast();

const router = useRouter();

const handleSubmit = async (field) => {
  field.senha = field.password;
  field.confirmaSenha = field.password_confirm;
  field.image = field.img[0].file;

  delete field.password;
  delete field.password_confirm;
  delete field.img;

  const formData = new FormData();

  formData.append("image", field.image);

  for (const [key, value] of Object.entries(field)) {
    if (key !== "image") {
      formData.append(key, value);
    }
  }

  await userServices
    .userRegister(field)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      reset("myForm");
      router.push("/login");
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};
</script>

<template>
  <FormKit @submit="handleSubmit" id="myForm" type="form" :actions="false">
    <h1 class="text-center text-white my-5">Registro</h1>
    <div class="row gy-3 m-auto container-form">
      <div class="col-lg-6">
        <FormKit type="text" name="nome" label="Nome" validation="required" />
      </div>
      <div class="col-lg-6">
        <FormKit
          type="text"
          name="email"
          label="E-mail"
          validation="required|email"
        />
      </div>
      <div class="col-lg-6">
        <FormKit
          type="password"
          name="password"
          label="Senha"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Por favor inserir pelo menos um caracter especial.',
          }"
        />
      </div>
      <div class="col-lg-6">
        <FormKit
          type="password"
          name="password_confirm"
          label="Confirma senha"
          validation="required|confirm"
        />
      </div>
      <div class="col-lg-6">
        <FormKit
          type="tel"
          name="telefone"
          label="Telefone"
          validation="required|matches:/^[0-9]{2}[0-9]{4}[0-9]{4}$/"
          :validation-messages="{
            matches: 'O número de telefone deve estar no formato 9988889999',
          }"
        />
      </div>
      <div class="col-lg-6">
        <FormKit
          type="file"
          name="img"
          label="Imagem de perfil"
          accept=".png,.jpg,.jpeg"
          multiple="false"
          validation="required"
        />
      </div>
      <div class="col-lg-12">
        <LvButton :classBtn="'btn-primary'" title="Cadastrar"></LvButton>
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
  .btn-primary {
    width: 100%;
  }
}
</style>
