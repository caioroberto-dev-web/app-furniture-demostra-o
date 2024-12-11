<script setup>
import { defineComponent, ref } from "vue";

defineProps({
  srcImg: {
    required: true,
    srcImg: Array,
    default: () => [],
  },
  altImg: {
    required: true,
    altImg: String,
    default: "",
  },
});

defineComponent({
  name: "LvCarouselFurnitureImg",
});

const activeIndex = ref(0);
</script>

<template>
  <div
    id="carouselExampleIndicators"
    class="container-carousel carousel slide col-lg-6 col-12 m-auto my-3"
  >
    <h2 class="text-center my-3">Imagens</h2>
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="3"
        aria-label="Slide 4"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="4"
        aria-label="Slide 4"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(item, index) of srcImg"
        :key="item.id"
        :class="{ active: index === activeIndex }"
        class="carousel-item"
      >
        <img
          :src="item.url"
          class="img-carousel img-fluid"
          :alt="item.filename"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.img-carousel {
  height: 70vh;
  margin: auto;
}

.carousel-indicators {
  background-color: #733816;
  border-radius: 15px;
}

.carousel-control-prev,
.carousel-control-next {
  height: 75px;
  margin: auto 15px;
  background-color: #733816;
}

@media (max-width: 992px) {
  .img-carousel {
    max-height: 50vh;
    margin: auto;
  }
}
</style>
