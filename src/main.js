import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import { plugin, defaultConfig } from "@formkit/vue";
import { pt } from "@formkit/i18n";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import App from "./App.vue";
import router from "./routes";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);

app.use(ToastPlugin);

app.use(router);

app.use(
  plugin,
  defaultConfig({
    locales: { pt },
    locale: "pt",
    config: {
      classes: {
        input: "form-control form-control-sm shadow-none border",
      },
    },
  })
);

app.mount("#app");
