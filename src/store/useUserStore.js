import { defineStore } from "pinia";

//Services
import { userServices } from "../services/userServices";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      idUsuario: 0,
      loggedIn: false,
      token: "",
    },
  }),
  getters: {},

  actions: {
    async userLogin(data) {
      const res = await userServices.userLogin(data);
      this.user = res.data;
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async logout() {
      this.user = {
        idUsuario: 0,
        loggedIn: false,
        token: "",
      };
      localStorage.removeItem("user");
    },

    async checaUsuario() {
      const res = await userServices.getUserByToken();
      console.log(res);
      this.user = res.data;
    },
  },
});
