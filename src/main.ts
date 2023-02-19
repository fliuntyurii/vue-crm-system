import 'materialize-css/dist/js/materialize.min.js';
import 'firebase/compat/auth';
import 'firebase/compat/database';

import { createApp } from "vue";
import Vuelidate from "vuelidate";
import Paginate from 'vuejs-paginate';
import firebase from 'firebase/compat/app';

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Loader from './components/Loader.vue';
import tooltipDirective from './../directives/tooltip.directive';

firebase.initializeApp({
  apiKey: "AIzaSyAfLbcPJBOJCfIrFGnA57KgbDXO6PmqiZ0",
  authDomain: "vue-crm-system-a06c3.firebaseapp.com",
  projectId: "vue-crm-system-a06c3",
  storageBucket: "vue-crm-system-a06c3.appspot.com",
  messagingSenderId: "64767776680",
  appId: "1:64767776680:web:f190d3672e0384441faf9d",
  measurementId: "G-GCBFEP46MR",
  databaseURL: 'https://vue-crm-system-a06c3-default-rtdb.europe-west1.firebasedatabase.app/'
});

let app: any;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(Vuelidate as any)
      .use(app as any)
      .directive('tooltip', tooltipDirective)
      .component('Loader', Loader)
      .component('paginate', Paginate)
      .mount("#app");
  }
});