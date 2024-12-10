<script setup>
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";

//Components
import LvImage from "../components/LvImage.vue";
import LvButton from "../components/LvButton.vue";
import LvRouterLink from "../components/LvRouterLink.vue";
import LvModalDeleteConfirm from "../components/LvModalDeleteConfirm.vue";
import LvModalCancelConfirm from "../components/LvModalCancelConfirm.vue";
import LvModalConfirmPurchase from "../components/LvModalConfirmPurchase.vue";

//Services
import { userServices } from "../services/userServices";
import { furnitureServices } from "../services/furnitureServices";

//Store
import { useUserStore } from "../store/useUserStore";

defineComponent({
  name: "LvUserPanel",
});

const route = useRoute();

const user = ref();

const myFurniture = ref();

const idMovel = ref();

const purchaseFurniture = ref();

const userStore = useUserStore();

const $toast = useToast();

onMounted(async () => {
  getMyFurtinureById(userStore.user.idUsuario);
  getMyUserByToken();
  getPrePurchaseFurtinure();
});

const getMyFurtinureById = async (id) => {
  await furnitureServices
    .getMyFurniture(id)
    .then((res) => {
      myFurniture.value = res.data.movel;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getMyUserByToken = async () => {
  await userServices
    .getUserByToken()
    .then((res) => {
      user.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPrePurchaseFurtinure = async () => {
  await furnitureServices
    .prePurchaseFurniture()
    .then((res) => {
      purchaseFurniture.value = res.data.movel;
    })
    .catch((err) => {
      console.log(err.response.message);
    });
};

const completeSale = async () => {
  await furnitureServices
    .completeSaleTheFurniture(idMovel.value)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      getMyFurtinureById(userStore.user.idUsuario);
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};

const deleteFurtinure = async () => {
  await furnitureServices
    .deleteFurniture(idMovel.value)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      getMyFurtinureById(userStore.user.idUsuario);
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};

const cancelSale = async () => {
  await furnitureServices
    .cancelSaleTheFurniture(idMovel.value)
    .then((res) => {
      $toast.success(res.data.message, {
        position: "top",
      });
      getMyFurtinureById(userStore.user.idUsuario);
    })
    .catch((err) => {
      $toast.error(err.response.data.message, {
        position: "top",
      });
    });
};
</script>

<template>
  <div class="row container-user-panel">
    <div v-if="!user" class="spinner-border text-white" role="status">
      <span class="visually-hidden">Carregando...</span>
    </div>
    <template v-else>
      <div class="col-lg-4 col-12">
        <h2>{{ user.nome }}</h2>
        <LvImage class="img-profile" :src="user.image" :alt="user.nome">
        </LvImage>
        <p>E-mail: {{ user.email }}</p>
        <p>Contato: {{ user.telefone }}</p>

        <LvRouterLink
          :to="/user-edit/ + route.params.id"
          :title="'Editar perfil'"
          :classBtn="'btn-sm btn-primary me-1'"
        ></LvRouterLink>
        <LvRouterLink
          to="/register-furniture"
          :title="'Registrar móvel'"
          :classBtn="'btn-sm btn-primary'"
        >
        </LvRouterLink>
      </div>
      <div class="col-lg-8 col-12 mt-lg-0 mt-3">
        <h2 class="text-center">Móveis registrados</h2>
        <p v-if="myFurniture <= 0" class="text-center my-3">
          Não possui nenhum móvel registrado a venda.
        </p>
        <ul v-else>
          <li
            v-for="item in myFurniture"
            :key="item.id"
            class="container-furniture-registered"
          >
            <span class="d-block">
              {{ item.nomeProduto }}
            </span>
            <LvImage
              class="myFurniture d-inline"
              :src="item.image[0].url"
              :alt="item.nomeProduto"
            />
            situação -
            <span
              class="text-success fs-5"
              v-if="item.situacao === true && item.nomeComprador === null"
              >A venda</span
            >
            <span
              class="text-warning"
              v-else-if="item.situacao === true && item.nomeComprador !== null"
              >Em negociação
            </span>
            <span class="text-danger" v-else>Vendido</span>
            <p v-if="item.nomeComprador !== null">
              {{ item.nomeComprador }} -
              <a
                class="nav-link d-inline-block"
                :href="
                  'https://wa.me/55' +
                  item.telefoneComprador +
                  '?' +
                  `text=Olá%20${item.nomeComprador}, %20você%20tem%20interesse%20no%20meu%20${item.nomeProduto}?`
                "
                target="_blank"
                >{{ item.telefoneComprador }}
                <i class="bi bi-whatsapp ms-1 text-success"></i
              ></a>
            </p>
            <p>
              <LvRouterLink
                :classBtn="'btn-sm btn-primary me-1'"
                :to="/edit-furniture/ + item.idMovel"
                :title="'Editar'"
              >
              </LvRouterLink>
              <LvButton
                :classBtn="'btn-sm btn-danger me-1'"
                :title="'Deletar'"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop2"
                @click="idMovel = item.idMovel"
              >
              </LvButton>
              <span
                v-show="item.situacao === true && item.nomeComprador !== null"
              >
                <LvButton
                  :classBtn="'btn-sm btn-success me-1'"
                  :title="'Concluir venda'"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop4"
                  @click="idMovel = item.idMovel"
                >
                </LvButton>
                <LvButton
                  :classBtn="'btn-sm btn-danger me-1'"
                  :title="'Cancelar'"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop3"
                  @click="idMovel = item.idMovel"
                >
                </LvButton>
              </span>
              <LvModalDeleteConfirm
                class="text-dark"
                :title="'Deletar este móvel?'"
                :bodyContent="'Deseja confirmar a exclusão?'"
                :event="deleteFurtinure"
              />
              <LvModalCancelConfirm
                class="text-dark"
                :title="'Cancelar a venda deste móvel?'"
                :bodyContent="'Deseja confirmar o cancelamento?'"
                :event="cancelSale"
              />
              <LvModalConfirmPurchase
                class="text-dark"
                :title="'Confirmar a venda deste móvel?'"
                :bodyContent="'Deseja confirmar a venda?'"
                :event="completeSale"
              />
            </p>
          </li>
        </ul>
      </div>
      <div class="offset-lg-4 col-lg-8 col-12 my-lg-0 my-3">
        <h2 class="text-center">Móveis desejados</h2>
        <div v-if="purchaseFurniture <= 0">
          <p class="text-center my-3">Não possui nenhum móvel com interesse</p>
        </div>
        <ul v-else>
          <li
            v-for="item of purchaseFurniture"
            :key="item.id"
            class="container-purchase-furniture"
          >
            <LvImage
              class="purchase-img"
              :src="item.image[0].url"
              :alt="item.nomeProduto"
            />
            <p>
              situação -
              <span
                class="text-warning"
                v-if="item.nomeComprador !== null && item.situacao != false"
                >Em negociação
              </span>
              <span class="text-danger" v-else>Vendido</span>
            </p>
            <p>Vendedor : {{ item.nomeVendedor }}</p>
            <p v-if="item.nomeComprador !== null">
              Contato -
              <a
                class="nav-link d-inline-block"
                :href="
                  'https://wa.me/55' +
                  item.telefoneVendedor +
                  '?' +
                  `text=Olá%20${item.nomeVendedor}, %20eu%20tenho%20interesse%20no%20seu%20${item.nomeProduto}.`
                "
                target="_blank"
                >{{ item.telefoneVendedor }}
                <i class="bi bi-whatsapp ms-1 text-success"></i
              ></a>
            </p>
            <LvRouterLink
              :classBtn="'btn-sm btn-primary mb-3'"
              :to="/furniture-details/ + item.idMovel"
              :title="'Detalhes'"
            >
            </LvRouterLink>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style scoped>
.container-user-panel {
  background-color: #733816;
  padding: 50px;
  color: #fefefe;
  border-radius: 15px;
  margin-top: 50px;
}

.img-profile {
  width: 150px;
  margin: 15px 0;
  border-radius: 15px;
}

.purchase-img,
.myFurniture {
  width: 100px;
  border-radius: 15px;
  display: block;
  margin: 15px 0;
}

li {
  list-style: none;
}

.container-purchase-furniture,
.container-furniture-registered {
  background-color: #260801;
  padding: 15px;
  margin: 15px 0;
  border-radius: 15px;
}
</style>
