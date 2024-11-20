import { defineStore } from "pinia";

//Services
import { furnitureServices } from "../services/furnitureServices";

export const useFurnitureStore = defineStore("furniture", {
  state: () => ({
    cart: {
      furnitureNumber: 0,
      bag: [],
    },
  }),

  getters: {},

  actions: {
    async productsInCart() {
      const res = await furnitureServices.prePurchaseFurniture();
      this.cart.furnitureNumber = res.data.movel.length;
      this.cart.bag = res.data.movel;
    },
  },
});
