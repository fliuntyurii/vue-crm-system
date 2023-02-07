import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: "auth"
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "auth"
    },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: "main"
    },
    component: () => import('@/views/Categories.vue'),
  },
  {
    path: "/history",
    name: "history",
    meta: {
      layout: "main"
    },
    component: () => import('@/views/History.vue'),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      layout: "main"
    },
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: "/record",
    name: "record",
    meta: {
      layout: "main"
    },
    component: () => import('@/views/Record.vue'),
  },
  {
    path: "/detail-record",
    name: "detailRecord",
    meta: {
      layout: "main"
    },
    component: () => import('@/views/DetailRecord.vue'),
  },
  {
    path: "/planning",
    name: "planning",
    meta: {
      layout: "main"
    },
    component: () => import('@/views/Planning.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
