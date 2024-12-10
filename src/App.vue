<script setup>
import { defineComponent, ref } from "vue";

//Components
import LvNavBar from "./components/LvNavBar.vue";
import LvOffCanvas from "./components/LvOffCanvas.vue";
import LvFooter from "./components/LvFooter.vue";

defineComponent({
  name: "App"
})

const isOffCanvasVisible = ref(false);

const toggleOffCanvas = () => {
  isOffCanvasVisible.value = !isOffCanvasVisible.value;
};
</script>

<template>
  <div>
    <lv-nav-bar @emitCartClicked="toggleOffCanvas"></lv-nav-bar>
    <lv-off-canvas
      :isOffCanvasVisible="isOffCanvasVisible"
      @emitClosed="toggleOffCanvas"
    ></lv-off-canvas>
    <div class="container">
      <router-view></router-view>
    </div>
    <lv-footer></lv-footer>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
