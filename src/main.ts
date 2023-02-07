import Vue, { createApp } from "vue";
import 'materialize-css/dist/js/materialize.min.js';

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

interface ComponentInternalInstance {
  dateFilter: object | any
}

const app = createApp(App).use(store).use(router);
app.mount("#app");

app.config.globalProperties.$filters = {
  dateFilter(value: any, format: any = 'date'): any {
    console.log(value)
    return value;
  }
} as ComponentInternalInstance;
