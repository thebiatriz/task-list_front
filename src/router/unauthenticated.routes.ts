import { Views } from "../views/index";
import type { RouteRecordRaw } from "vue-router";
export const unauthentitcatedRoutes: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        component: Views.Login,
        meta: {
            hideNavigation: true
        }
    },
];
