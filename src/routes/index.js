import { createWebHistory, createRouter } from "vue-router";

//Helpes
import authguard from "../helpers/authguard";

//Components
import LvHome from "../views/LvHome.vue";

const routes = [
  { path: "/", name: "lv-home", component: LvHome },
  {
    path: "/register",
    name: "lv-register",
    component: () => import("../views/LvRegister.vue"),
  },
  {
    path: "/login",
    name: "lv-login",
    component: () => import("../views/LvLogin.vue"),
  },
  {
    path: "/furniture-details/:id",
    name: "lv-furniture-details",
    component: () => import("../views/LvFurnitureDetails.vue"),
  },
  {
    path: "/user-panel/:id",
    name: "lv-user-panel",
    component: () => import("../views/LvUserPanel.vue"),
    beforeEnter: authguard,
  },
  {
    path: "/user-edit/:id",
    name: "lv-user-edit",
    component: () => import("../views/LvUserEdit.vue"),
    beforeEnter: authguard,
  },
  {
    path: "/register-furniture",
    name: "lv-register-furniture",
    component: () => import("../views/LvRegisterFurniture.vue"),
    beforeEnter: authguard,
  },
  {
    path: "/edit-furniture/:id",
    name: "lv-edit-furniture",
    component: () => import("../views/LvEditFurniture.vue"),
    beforeEnter: authguard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
