import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { Views } from "../views";
import { authenticatedRoutes } from "./authenticated.routes";
import { unauthentitcatedRoutes } from "./unauthenticated.routes";
import { guardsTo } from "./guards/auth.guards";

const routes: Array<RouteRecordRaw> = [
  ...authenticatedRoutes,
  ...unauthentitcatedRoutes,
  {
    path: "/:pathMatch(.*)*", name: "NotFound", component: Views.NotFound, meta: {
      hideNavigation: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  guardsTo(to, from, next);
});

export default router;