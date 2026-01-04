import { createApp } from "vue";
import App from "./App.vue";
import { loadFonts } from "./plugins/fontLoader";
import pinia from "./plugins/pinia";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./style/site.scss";

loadFonts();

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount("#app");
