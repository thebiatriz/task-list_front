import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { Views } from "../views";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Home", component: Views.Home },
  { path: "/computer/register", name: "ComputerRegister", component: Views.ComputerForm },
  { path: "/computer/edit/:id", name: "ComputerEdit", component: Views.ComputerForm },
  { path: "/computer", name: "Computer", component: Views.Computer },
  { path: "/computer-output", name: "ComputerOutput", component: Views.ComputerOutput },
  { path: "/donation", name: "Donation", component: Views.Donation },
  { path: "/sale", name: "Sale", component: Views.Sale },
  { path: "/team", name: "Team", component: Views.Team },
  {
    path: "/:pathMatch(.*)*", name: "NotFound", component: Views.NotFound, meta: {
      hideNavigation: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;