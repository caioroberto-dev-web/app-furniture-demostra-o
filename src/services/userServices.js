import http from "../config";

//Store
import { useUserStore } from "../store/useUserStore";

export const userServices = {
  async userRegister(data) {
    return http.post("/usuario/cadastro", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async userLogin(data) {
    return http.post("/usuario/login", data);
  },

  async getUserByToken() {
    const userStore = useUserStore();
    return http.get("/usuario/checausuariotoken", {
      headers: {
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },

  async getUserById(id) {
    return http.get("/usuario/" + id);
  },

  async updatedUser(id, data) {
    const userStore = useUserStore();
    return http.patch("/usuario/edita/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + userStore.user.token,
      },
    });
  },
};
