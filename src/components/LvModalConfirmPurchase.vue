<script setup>
import { defineComponent } from "vue";

defineProps({
  title: {
    required: true,
    title: String,
  },
  bodyContent: {
    required: true,
    bodyContent: String,
  },
  event: {
    required: true,
    event: Function,
  },
});

defineComponent({
  name: "LvModalConfirmPurchase",
});
</script>

<template>
  <div
    class="modal fade"
    id="staticBackdrop4"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            {{ title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ bodyContent }}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cancelar
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="event"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
