import Vue, { createApp } from "vue";
import Vuelidate from "vuelidate";
import 'materialize-css/dist/js/materialize.min.js';

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).use(Vuelidate as any).mount("#app");