<script setup>
defineProps({
  srcImg: {
    required: true,
    srcImg: String,
  },
  altImg: {
    required: true,
    altImg: String,
  },
});
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
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="srcImg" class="img-carousel img-fluid" :alt="altImg" />
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
.carousel-indicators {
  background-color: #733816;
  border-radius: 15px;
}

@media (max-width: 992px) {
  .container-img-furniture {
    width: 300px;
    margin: auto;
  }

  .img-carousel {
    width: 576px;
    margin: auto;
  }
}
</style>
