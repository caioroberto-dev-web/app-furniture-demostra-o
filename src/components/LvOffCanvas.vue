<script setup>
import { ref, watch, computed } from "vue";

//Store
import { useFurnitureStore } from "../store/useFurnitureStore";
import { useUserStore } from "../store/useUserStore";

defineProps({
  isOffCanvasVisible: Boolean,
});

const emit = defineEmits(["emitClosed"]);

const close = () => {
  emit("emitClosed");
};

const bagCart = ref([]);

const furnitureStore = useFurnitureStore();

const userStore = useUserStore();

const total = ref(0);

const cartItems = computed(() => {
  total.value = 0
  furnitureStore.cart.bag.forEach((item) => {
    console.log(total.value += parseFloat(item.preco))
  })
  return furnitureStore.cart.bag;
});

watch(cartItems, (newValue) => {
  bagCart.value = newValue;
});
</script>

<template>
  <div>
    <div
      class="offcanvas offcanvas-end"
      :class="{ show: isOffCanvasVisible }"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">
          Produtos no carrinho <i class="bi bi-cart2"></i>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          @click="close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div v-if="bagCart.length <= 0">
          <p class="text-center">Nenhum produto adicionado ao carrinho</p>
        </div>
        <ul v-else>
          <li class="nav-item" v-for="item of bagCart" :key="item.id">
            <router-link
              class="nav-link"
              :to="'/user-panel/' + userStore.user.idUsuario"
            >
              {{ item.nomeProduto }} - R$ {{ item.preco }}
            </router-link>
          </li>
          <div class="text-end">
            <p class="fs-5">Total R$ {{ total }}</p>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul li {
  list-style: none;
  margin: 15px 0;
}

.offcanvas-header {
  background-color: #260801;
  color: #fefefe;
}

.btn-close {
  background-color: #fefefe;
}

.offcanvas-body {
  background-color: #f29d52;
  color: #fefefe;
}
</style>
