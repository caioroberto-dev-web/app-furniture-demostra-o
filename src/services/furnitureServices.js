import http from "../config";

//Store
import { useUserStore } from "../store/useUserStore";

export const furnitureServices = {
  async getAllFurniture() {
    return http.get("/moveis/pegatodosmoveis");
  },

  async getFurnitureDetailsById(id) {
    return http.get("/moveis/" + id);
  },

  async registerFurniture(data) {
    const userStore = useUserStore();
    return http.post("/moveis/cadastro", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async getMyFurniture() {
    const userStore = useUserStore();
    return http.get("/moveis/pegameusmoveis", {
      headers: {
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async iWantToBuyFurtinure(id, data) {
    const userStore = useUserStore();
    return http.put("/moveis/desejocomprar/" + id, data, {
      headers: {
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async completeSaleTheFurniture(id, data) {
    const userStore = useUserStore();
    return http.put("/moveis/vendaconcluida/" + id, data, {
      headers: {
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async cancelSaleTheFurniture(id, data) {
    const userStore = useUserStore();
    return http.put("/moveis/cancelavenda/" + id, data, {
      headers: {
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async deleteFurniture(id) {
    const userStore = useUserStore();
    return http.delete("/moveis/removemovel/" + id, {
      headers: {
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async editFurniture(id, data) {
    const userStore = useUserStore();
    return http.patch("/moveis/atualizamovel/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async prePurchaseFurniture() {
    const userStore = useUserStore();
    return http.get("/moveis/moveisquerocomprar", {
      headers: {
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },
};
